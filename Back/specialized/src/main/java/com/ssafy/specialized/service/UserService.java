package com.ssafy.specialized.service;


import com.ssafy.specialized.domain.userDTO.*;

import java.util.List;

public interface UserService {
    void join(UserDTO userDto) throws Exception;

    LoginResponseDto login(UserLoginDTO login) throws Exception;

    void logout(UserLogoutDTO logout) throws Exception;

    void update(UserUpdateDTO userUpdateDto) throws Exception;

    boolean checkPassword(UpdatePasswordDTO updatePasswordDTO) throws Exception;

    void updatePassword(UpdatePasswordDTO updatePasswordDto) throws Exception;

    UserInfoDTO getInfo(String userId) throws Exception;

    UserInfoDTO getMyInfo() throws Exception;

    void delete(UserLogoutDTO logout) throws Exception;

    List<?> findMyUserId(String name);

    void findMyPassword(FindPasswordDTO findPasswordDTO) throws Exception;

    TokenDTO reissue(TokenDTO tokenDTO) throws Exception;
}
