package com.springsecurity.bootsecurity.controllers;

import com.springsecurity.bootsecurity.model.Role;
import com.springsecurity.bootsecurity.model.User;
import com.springsecurity.bootsecurity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<List<User>> userList(){
        return new ResponseEntity<>(userService.listUsers(),HttpStatus.OK);
    }

    @GetMapping ("/roles")
    public ResponseEntity<List<Role>> roleListList(){
        return new ResponseEntity<>(userService.allRoles(), HttpStatus.OK);
    }
    @PatchMapping("/users")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.update(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping ("/users/{id}")
    public User userOnly(@PathVariable int id) {
        return userService.getUser(id);
    }

    @GetMapping ("/user")
    public ResponseEntity<User>  userCurrent(Authentication authentication) {
        return new ResponseEntity<>(userService.findByUsername(authentication.getName()), HttpStatus.OK) ;
    }

    @PostMapping("/users")
    public User update (@RequestBody @Valid User user){
        userService.add(user);
        return user;
    }
    @DeleteMapping("/users/{id}")
    public String delete (@PathVariable int id){
        userService.delete(id);
        return "User with id = " + id + " was deleted";
    }






}
