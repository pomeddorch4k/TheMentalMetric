package com.thementalmetric.app.core.exceptions.base;

import com.thementalmetric.app.core.exceptions.BaseException;
import org.springframework.http.HttpStatus;

public class NotFoundException extends BaseException {
    public NotFoundException(String message, String clientFriendlyMessage, String callingMethod){
        super(HttpStatus.NOT_FOUND, message, clientFriendlyMessage, callingMethod);
    }

    public NotFoundException(String message, String callingMethod){
        super(HttpStatus.NOT_FOUND, message, callingMethod);
    }
}
