package com.example.spring.services.Comment;


import com.example.spring.model.Comments;
import com.example.spring.repository.CommentsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentsServicesImpl implements CommentsServices {

    @Autowired
    private CommentsRepo commentsRepo;

    @Override
    public Comments addComment(Comments comment) {
        return commentsRepo.save(comment);
    }

    @Override
    public Comments getCommentById(Integer id) {
        return commentsRepo.getById(id);
    }

    @Override
    public List<Comments> getAllComments() {
        return commentsRepo.findAll();
    }

    @Override
    public void deleteCommentById(Integer id) {
        commentsRepo.deleteById(id);

    }

    @Override
    public void deleteAllComments() {
        commentsRepo.deleteAll();

    }
}
