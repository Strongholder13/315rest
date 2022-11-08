package com.springsecurity.bootsecurity.controllers;

import com.springsecurity.bootsecurity.model.User;
import com.springsecurity.bootsecurity.service.UserService;
import com.springsecurity.bootsecurity.util.UserErrorResponse;
import com.springsecurity.bootsecurity.util.UserNotCreatedException;
import com.springsecurity.bootsecurity.util.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api")
public class ControllerREST {

    private final UserService userService;

    @Autowired
    public ControllerREST(UserService userService) {
        this.userService = userService;
    }

    @GetMapping ("/users")
    public List<User> userList(){
        return userService.listUsers();
    }

    @GetMapping ("/users/{id}")
    public User userOnly(@PathVariable int id) {
        return userService.getUser(id);
    }

    @PostMapping("/users")
    public ResponseEntity<HttpStatus> create (@RequestBody @Valid User user, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            StringBuilder errorMes = new StringBuilder();
            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError error : errors){
                errorMes.append(error.getField())
                        .append(" - ").append(error.getDefaultMessage())
                        .append(";");
            }
            throw new UserNotCreatedException(errorMes.toString());
        }
        userService.add(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @PutMapping("/users")
    public User update (@RequestBody @Valid User user){
        userService.update(user);
        return user;
    }
    @DeleteMapping("/users/{id}")
    public String delete (@PathVariable int id){
        userService.delete(id);
        return "User with id = " + id + " was deleted";
    }


    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handleException(UserNotFoundException e){
        UserErrorResponse response = new UserErrorResponse(
                "User not found",
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handleException(UserNotCreatedException e) {
        UserErrorResponse response = new UserErrorResponse(
                e.getMessage(),
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }


}
