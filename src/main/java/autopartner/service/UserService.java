package autopartner.service;

import autopartner.domain.entity.User;

public interface UserService {

    Iterable<User> listAllUsers();

    User getUserById(Long id);

    User saveUser(User user);

    void deleteUser(Long id);

    boolean isUsernameUnique(User user);

    User getUserByUsername(String username);
}
