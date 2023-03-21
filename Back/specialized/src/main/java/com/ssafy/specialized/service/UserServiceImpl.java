package com.ssafy.specialized.service;

import com.ssafy.specialized.common.enums.Authority;
import com.ssafy.specialized.common.exception.CustomException;
import com.ssafy.specialized.common.exception.ErrorCode;
import com.ssafy.specialized.common.jwt.JwtTokenProvider;
import com.ssafy.specialized.common.security.SecurityUtil;
import com.ssafy.specialized.domain.dto.user.*;
import com.ssafy.specialized.domain.entity.*;
import com.ssafy.specialized.repository.*;
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
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final UserHobbyRepository userHobbyRepository;
    @Autowired
    private final HobbyMainRepository hobbyMainRepository;
    @Autowired
    private final ReviewRepository reviewRepository;
    @Autowired
    private final HobbySubcategoryRepository hobbySubcategoryRepository;
    @Autowired
    private final BookmarkRepository bookmarkRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    @Autowired
    private final JwtTokenProvider jwtTokenProvider;
    @Autowired
    private final RedisTemplate redisTemplate;

    @Override
    public void updateUserHobby(UpdateUserHobbyRequestDto updateUserHobbyRequestDto) {
        log.info(SecurityUtil.getLoginUsername());
        User user = userRepository.findByName(SecurityUtil.getLoginUsername());
//                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        List<UserHobby> list = userHobbyRepository.findAllByUser(user);
        for (int i = 0; i < list.size(); i++) {
            userHobbyRepository.delete(list.get(i));
        }
        for (int i = 0; i < updateUserHobbyRequestDto.getHobbies().length; i++) {
            Optional<HobbySubcategory> optionalHobbySubcategory = hobbySubcategoryRepository.findBySubcategory(updateUserHobbyRequestDto.getHobbies()[i]);
            HobbySubcategory hobbySubcategory = null;
            if (optionalHobbySubcategory.isPresent()) {
                hobbySubcategory = optionalHobbySubcategory.get();
            } else {
                //TODO: exception 던지기
            }
            UserHobby userHobby = UserHobby.builder()
                    .mainCategory(hobbySubcategory.getMainCategory())
                    .user(user)
                    .subcategory(hobbySubcategory)
                    .build();
            userHobbyRepository.save(userHobby);
        }
    }

    @Override
    public void signUp(SignUpRequestDto signUpRequestDto) {
        // 회원 중복 확인
        if (userRepository.existsById(signUpRequestDto.getUserId())) {
            throw new CustomException(ErrorCode.DUPLICATED_VALUE);
        }
        // DB에 저장
        User user = User.builder()
                .id(signUpRequestDto.getUserId())
                .name(signUpRequestDto.getUserName())
                .password(passwordEncoder.encode(signUpRequestDto.getUserPassword()))
                .phoneNumber(signUpRequestDto.getUserPhoneNumber())
                .nickname(signUpRequestDto.getUserNickname())
                .email(signUpRequestDto.getUserEmail())
                .roles(Collections.singletonList(Authority.USER.name()))
                .build();
        userRepository.save(user);

    }

    @Override
    public int checkIdDuplication(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user == null ? 200 : 403;
    }

    @Override
    public List<Bookmark> getMyBookmarkList() {
        User user = userRepository.findByName(SecurityUtil.getLoginUsername());
        List<Bookmark> list = bookmarkRepository.findAllByUser(user);
        return list;
    }

    @Override
    public List<Review> getMyReviewList() {
        User user = userRepository.findByName(SecurityUtil.getLoginUsername());
        List<Review> list = reviewRepository.findAllByWriter(user);
        return list;
    }

    // 로그인 서비스
    @Override
    public LoginResponseDto login(UserLoginDTO login) {
        User user = userRepository.findById(login.getUserId()).orElse(null);
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
        loginResponseDto.setUserNickname(user.getNickname());
        loginResponseDto.setUserName(user.getName());
        loginResponseDto.setUserAddress(user.getAddress());
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
        User user = userRepository.findById(SecurityUtil.getLoginUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        if (userUpdateDto.getUserPhoneNumber() != null) user.setPhoneNumber(userUpdateDto.getUserPhoneNumber());
        if (userUpdateDto.getUserNickname() != null) user.setName(userUpdateDto.getUserNickname());
        if (userUpdateDto.getUserAddress() != null) user.setAddress(userUpdateDto.getUserAddress());
        userRepository.save(user);
    }

    // 비밀번호 확인
    @Override
    public boolean checkPassword(UpdatePasswordDTO updatePasswordDTO) {
        User user = userRepository.findById(SecurityUtil.getLoginUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        return user.matchPassword(passwordEncoder, updatePasswordDTO.getCheckPassword());
    }

    // 비밀번호 변경 서비스
    @Override
    public void updatePassword(UpdatePasswordDTO updatePasswordDto) {
        User user = userRepository.findById(SecurityUtil.getLoginUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        user.updatePassword(passwordEncoder, updatePasswordDto.getToBePassword());
        userRepository.save(user);
    }

    // 유저 정보 검색
    @Override
    @Transactional
    public UserInfoDTO getInfo(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        return new UserInfoDTO(user);
    }

    // 내 정보 검색
    @Override
    @Transactional
    public UserInfoDTO getMyInfo() {
        User user = userRepository.findById(SecurityUtil.getLoginUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
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
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        if (!user.matchPassword(passwordEncoder, logout.getCheckPassword())) {
            throw new CustomException(ErrorCode.NOT_MY_CONTENTS);
        }
        userRepository.delete(user);
        logout(logout);
    }

    // 아이디 찾기
    @Override
    public List<?> findMyUserId(String name) {
        List<User> userList = userRepository.findAllByName(name);
        List<String> userIdList = new ArrayList<>();
        for (User user : userList) {
            userIdList.add(user.getId());
        }
        return userIdList;
    }

    // 비밀번호 재설정 (암호화로 인해 복호화가 불가능) -> true 를 반환받으면 updatePassword 메소드 실행
    @Override
    public void findMyPassword(FindMyPasswordRequestDTO findMyPasswordRequestDTO) {
        User user = userRepository.findById(findMyPasswordRequestDTO.getUserId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        user.updatePassword(passwordEncoder, findMyPasswordRequestDTO.getToBePassword());
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
