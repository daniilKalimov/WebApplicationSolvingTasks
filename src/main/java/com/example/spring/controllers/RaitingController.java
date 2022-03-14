package com.example.spring.controllers;


import com.example.spring.model.Raiting;
import com.example.spring.services.Raiting.RaitingServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class RaitingController {

    @Autowired
    private RaitingServices raitingServices;

    @PutMapping("/raiting")
    public Raiting addRaiting(@RequestBody Raiting raiting){
        return raitingServices.addRaiting(raiting);
    }
}
