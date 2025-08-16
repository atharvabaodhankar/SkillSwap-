package com.skillswap.backend.dto;

public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String location;

    public UserResponse(Long id, String name, String email, String location) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.location = location;
    }

    // getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getLocation() {
        return location;
    }
}
