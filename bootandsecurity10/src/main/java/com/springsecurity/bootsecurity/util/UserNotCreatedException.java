package com.springsecurity.bootsecurity.util;

public class UserNotCreatedException extends RuntimeException{

    public UserNotCreatedException(String msg){
        super(msg);
    }
}
