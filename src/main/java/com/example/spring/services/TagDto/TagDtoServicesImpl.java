package com.example.spring.services.TagDto;

import com.example.spring.dto.TagDto;
import com.example.spring.model.Tags;
import com.example.spring.repository.TagDtoRepo;
import com.example.spring.repository.TagsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagDtoServicesImpl implements TagDtoServices{

    @Autowired
    public TagsRepo tagsRepo;

    @Autowired
    public TagDtoRepo tagDtoRepo;

    @Override
    public List<TagDto> getAllTags() {
        return tagDtoRepo.findAll();
    }


}
