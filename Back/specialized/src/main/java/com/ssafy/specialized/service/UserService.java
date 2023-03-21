package com.ssafy.specialized.service;


import com.ssafy.specialized.domain.dto.user.*;
import com.ssafy.specialized.domain.entity.Bookmark;

import java.util.List;

public interface UserService {
    void signUp(SignUpRequestDto signUpRequestDto);

    LoginResponseDto login(UserLoginDTO login) throws Exception;

    void logout(UserLogoutDTO logout) throws Exception;
    int checkIdDuplication(String userId);

    void update(UserUpdateDTO userUpdateDto) throws Exception;

    boolean checkPassword(UpdatePasswordDTO updatePasswordDTO) throws Exception;

    void updatePassword(UpdatePasswordDTO updatePasswordDto) throws Exception;

    UserInfoDTO getInfo(String userId) throws Exception;

    UserInfoDTO getMyInfo() throws Exception;

    List<Bookmark> getMyBookmarkList();

    void delete(UserLogoutDTO logout) throws Exception;
    void updateUserHobby(UpdateUserHobbyRequestDto updateUserHobbyRequestDto);



    List<?> findMyUserId(String name);

    void findMyPassword(FindMyPasswordRequestDTO findPasswordDTO) throws Exception;

    TokenDTO reissue(TokenDTO tokenDTO) throws Exception;
}
