package com.ssafy.specialized.service;

import com.ssafy.specialized.common.enums.Authority;
import com.ssafy.specialized.common.exception.CustomException;
import com.ssafy.specialized.common.exception.ErrorCode;
import com.ssafy.specialized.common.jwt.JwtTokenProvider;
import com.ssafy.specialized.common.security.SecurityUtil;
import com.ssafy.specialized.domain.entity.User;
import com.ssafy.specialized.domain.userDTO.*;
import com.ssafy.specialized.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    @Autowired
    private final JwtTokenProvider jwtTokenProvider;
    @Autowired
    private final RedisTemplate redisTemplate;

    // 회원가입 서비스
    @Override
    public void join(UserDTO userDto) {
        // 회원 중복 확인
        if (userRepository.existsByUserId(userDto.getUserId())) {
            throw new CustomException(ErrorCode.DUPLICATED_VALUE);
        }
        // DB에 저장
        User user = User.builder()
                .userId(userDto.getUserId())
                .userPassword(passwordEncoder.encode(userDto.getUserPassword()))
                .userPhoneNumber(userDto.getUserPhone())
                .userName(userDto.getUserName())
                .userAddress(userDto.getUserAddress())
                .roles(Collections.singletonList(Authority.USER.name()))
                .build();
        userRepository.save(user);
    }

    // 로그인 서비스
    @Override
    public LoginResponseDto login(UserLoginDTO login) {
        User user = userRepository.findByUserId(login.getUserId()).orElse(null);
        // 회원 정보 조회
        if (user == null) {
            throw new CustomException(ErrorCode.USER_LOGIN_INFO_INVALID);
        }
        // 로그인시 토큰 생성
        UsernamePasswordAuthenticationToken authenticationToken = login.toAuthentication();
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        TokenDTO tokenDto = jwtTokenProvider.generateToken(authentication);
        // 토큰 정보 설정
//        redisTemplate.opsForValue()
//                .set("RT:" + authentication.getName(), tokenDto.getRefreshToken(),
//                        tokenDto.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);
        ResponseCookie cookie = ResponseCookie.from("refresh", tokenDto.getRefreshToken())
                .path("/")
                .sameSite("None")
                .httpOnly(true)
                .secure(true)
                .build();
        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setAccessToken(tokenDto.getAccessToken());
        loginResponseDto.setUserDistance(null);
        loginResponseDto.setUserNickname(user.getUserNickname());
        loginResponseDto.setUserName(user.getUserName());
        loginResponseDto.setUserAddress(user.getUserAddress());
        loginResponseDto.setRefreshToken(tokenDto.getRefreshToken());
        return loginResponseDto;
    }

    // 로그아웃 서비스
    @Override
    public void logout(UserLogoutDTO logout) {
        // 토큰 유효성 검사
        if (!jwtTokenProvider.validateToken(logout.getAccessToken())) {
            throw new CustomException(ErrorCode.USER_LOGIN_INFO_INVALID);
        }
        // 토큰이 유효하다면 Access 토큰을 받아옴
        Authentication authentication = jwtTokenProvider.getAuthentication(logout.getAccessToken());
        if (redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
            redisTemplate.delete("RT:" + authentication.getName());
        }
        // 토큰을 즉시 만료시키고 블랙리스트에 등록
        Long expiration = jwtTokenProvider.getExpiration(logout.getAccessToken());
        redisTemplate.opsForValue()
                .set(logout.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);
    }

    // 회원정보 수정 서비스
    @Override
    public void update(UserUpdateDTO userUpdateDto) {
        User user = userRepository.findByUserId(SecurityUtil.getLoginUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        if (userUpdateDto.getUserPhone() != null) user.setUserPhoneNumber(userUpdateDto.getUserPhone());
        if (userUpdateDto.getUserName() != null) user.setUserName(userUpdateDto.getUserName());
        if (userUpdateDto.getUserAddress() != null) user.setUserAddress(userUpdateDto.getUserAddress());
        userRepository.save(user);
    }

    // 비밀번호 확인
    @Override
    public boolean checkPassword(UpdatePasswordDTO updatePasswordDTO) {
        User user = userRepository.findByUserId(SecurityUtil.getLoginUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        return user.matchPassword(passwordEncoder, updatePasswordDTO.getCheckPassword());
    }

    // 비밀번호 변경 서비스
    @Override
    public void updatePassword(UpdatePasswordDTO updatePasswordDto) {
        User user = userRepository.findByUserId(SecurityUtil.getLoginUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        user.updatePassword(passwordEncoder, updatePasswordDto.getToBePassword());
        userRepository.save(user);
    }

    // 유저 정보 검색
    @Override
    @Transactional
    public UserInfoDTO getInfo(String userId) {
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        return new UserInfoDTO(user);
    }

    // 내 정보 검색
    @Override
    @Transactional
    public UserInfoDTO getMyInfo() {
        User user = userRepository.findByUserId(SecurityUtil.getLoginUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        return new UserInfoDTO(user);
    }

    // 회원 탈퇴
    @Override
    public void delete(UserLogoutDTO logout) throws Exception {
        if (!jwtTokenProvider.validateToken(logout.getAccessToken())) {
            throw new CustomException(ErrorCode.NOT_FOUND_USER);
        }
        Authentication authentication = jwtTokenProvider.getAuthentication(logout.getAccessToken());
        String userId = authentication.getName();
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        if (!user.matchPassword(passwordEncoder, logout.getCheckPassword())) {
            throw new CustomException(ErrorCode.NOT_MY_CONTENTS);
        }
        userRepository.delete(user);
        logout(logout);
    }

    // 아이디 찾기
    @Override
    public List<?> findMyUserId(String name) {
        List<User> userList = userRepository.findAllByUserName(name);
        List<String> userIdList = new ArrayList<>();
        for (User user : userList) {
            userIdList.add(user.getUserId());
        }
        return userIdList;
    }

    // 비밀번호 재설정 (암호화로 인해 복호화가 불가능) -> true 를 반환받으면 updatePassword 메소드 실행
    @Override
    public void findMyPassword(FindPasswordDTO findPasswordDTO) {
        User user = userRepository.findByUserId(findPasswordDTO.getUserId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        if (!user.getUserName().equals(findPasswordDTO.getUserName())) {
            throw new CustomException(ErrorCode.NOT_MY_CONTENTS);
        }
        if (!user.getUserPhoneNumber().equals(findPasswordDTO.getUserPhone())) {
            throw new CustomException(ErrorCode.NOT_MY_CONTENTS);
        }
        user.updatePassword(passwordEncoder, findPasswordDTO.getToBePassword());
        userRepository.save(user);
    }

    // 토큰 만료시 토큰 재발급
    @Override
    public TokenDTO reissue(TokenDTO tokenDTO) {
        if (!jwtTokenProvider.validateToken(tokenDTO.getRefreshToken())) {
            throw new CustomException(ErrorCode.NOT_FOUND_USER);
        }
        Authentication authentication = jwtTokenProvider.getAuthentication(tokenDTO.getAccessToken());
        String refreshToken = (String) redisTemplate.opsForValue().get("RT:" + authentication.getName());
        if (!refreshToken.equals(tokenDTO.getRefreshToken())) {
            throw new CustomException(ErrorCode.NO_CONTENT);
        }
        TokenDTO token = jwtTokenProvider.generateToken(authentication);
        redisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), token.getRefreshToken(),
                        token.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);
        return token;
    }
}
