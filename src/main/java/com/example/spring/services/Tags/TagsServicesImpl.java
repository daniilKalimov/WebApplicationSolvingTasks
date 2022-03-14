package com.example.spring.services.Tags;



import com.example.spring.model.Tags;
import com.example.spring.repository.TagsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagsServicesImpl implements TagsServices {


    @Autowired
    private TagsRepo tagsRepo;

    @Override
    public Tags addTag(Tags tag) {
        if(tag.getText() != null) {
            List<Tags> tags = tagsRepo.findAll();
            for (Tags s : tags) {
                if (s.getText().equals(tag.getText()))
                    return s;
            }
            return tagsRepo.save(tag);
        }else return null;
    }



    @Override
    public List<Tags> getAllTags() {
        return tagsRepo.findAll();
    }

    @Override
    public void deleteTagById(Integer id) {
        tagsRepo.deleteById(id);

    }

    @Override
    public void deleteAllTags() {
       tagsRepo.deleteAll();
    }
}
