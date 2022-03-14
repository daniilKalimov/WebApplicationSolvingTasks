package com.example.spring.services.Tags;


import com.example.spring.model.Tags;

import java.util.List;

public interface TagsServices {

    public Tags addTag(Tags tag);

    public List<Tags> getAllTags();

    public void deleteTagById(Integer id);

    public void deleteAllTags();
}
