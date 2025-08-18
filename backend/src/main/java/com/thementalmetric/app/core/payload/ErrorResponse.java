package com.thementalmetric.app.core.payload;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ErrorResponse {
    private String message;
    private String clientMessage;
    private boolean isClientFriendly;
    private String callingMethod;
    private Instant timestamp;

    public ErrorResponse(String message, String clientMessage,
                         String callingMethod, boolean isClientFriendly){
        this.message = message;
        this.isClientFriendly = isClientFriendly;
        this.clientMessage = clientMessage;
        this.callingMethod = callingMethod;
        this.timestamp = Instant.now();
    }
}
