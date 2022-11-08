package com.springsecurity.bootsecurity.util;

import com.springsecurity.bootsecurity.model.User;
import com.springsecurity.bootsecurity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
@Component
public class UserValidator implements Validator {

    private final UserService userService;

    @Autowired
    public UserValidator(UserService userService) {
        this.userService = userService;
    }
    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }
    @Override
    public void validate(Object o, Errors errors) {
    User user = (User) o;
    try {
        userService.loadUserByUsername(user.getUsername());
    } catch (UsernameNotFoundException ignored) {
        return;
    }
    errors.rejectValue("username","" ,"Username уже существует");
    }
}
