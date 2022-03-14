package com.example.spring.controllers;


import com.example.spring.model.Tasks;
import com.example.spring.model.User;
import com.example.spring.services.User.UserServicesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    public UserServicesImpl userServices;

    @PutMapping("/adddonetask/{id}")
    public Set<Tasks> addDoneTask(@RequestBody Tasks task, @PathVariable Long id){
        return userServices.addDoneTask(id,task);
    }

    @GetMapping("/donetask/{id}")
    public Set<Tasks> getUserDoneTask(@PathVariable Long id){
        return userServices.findDoneTask(id);
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id){
        return userServices.findUserById(id);
    }
}
