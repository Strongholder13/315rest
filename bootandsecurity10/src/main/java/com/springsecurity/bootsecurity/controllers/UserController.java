package com.springsecurity.bootsecurity.controllers;

import com.springsecurity.bootsecurity.service.UserService;
import com.springsecurity.bootsecurity.util.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/")
public class UserController {


    @GetMapping("/admin")
    public String index() {
        return "/admin";
    }

    @GetMapping("/user")
    public String indexUser() {
        return "/user";
    }

}
