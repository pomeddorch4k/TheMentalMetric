package com.thementalmetric.app.core.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@MappedSuperclass
@Getter
@Setter
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    public BaseEntity(Instant createdAt){
        this.createdAt = createdAt;
        this.updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate(){
        setUpdatedAt(Instant.now());
    }
}
