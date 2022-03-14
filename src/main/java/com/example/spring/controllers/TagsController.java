package com.example.spring.controllers;


import com.example.spring.dto.TagDto;
import com.example.spring.model.Tags;
import com.example.spring.services.TagDto.TagDtoServicesImpl;
import com.example.spring.services.Tags.TagsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class TagsController {

    @Autowired
    private TagsServices tagsServices;

    @Autowired
    public TagDtoServicesImpl tagDtoServices;

    @GetMapping("/tags")
    public List<Tags> getAllTags(){
        return tagsServices.getAllTags();
    }

    @PostMapping("/tags")
    public Tags addTags(@RequestBody Tags tags){
         return tagsServices.addTag(tags);
    }

    @GetMapping("/tagsdto")
    public List<TagDto> getAllTagsDto(){
        return tagDtoServices.getAllTags();
    }

    @PutMapping("/tags/update")
    public Tags updateTag(@RequestBody Tags tags){
        return tagsServices.addTag(tags);
    }
}
