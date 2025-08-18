package com.thementalmetric.app.core.exceptions.base;

import com.thementalmetric.app.core.exceptions.BaseException;
import org.springframework.http.HttpStatus;

public class BadRequestException extends BaseException {
    public BadRequestException(String message, String clientFriendlyMessage, String callingMethod){
        super(HttpStatus.BAD_REQUEST, message, clientFriendlyMessage, callingMethod);
    }

    public BadRequestException(String message, String callingMethod){
        super(HttpStatus.BAD_REQUEST, message, callingMethod);
    }
}
