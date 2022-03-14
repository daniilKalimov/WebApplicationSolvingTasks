package com.example.spring.services.Comment;


import com.example.spring.model.Comments;

import java.util.List;

public interface CommentsServices {

    public Comments addComment(Comments comment);

    public Comments getCommentById(Integer id);

    public List<Comments> getAllComments();

    public void deleteCommentById(Integer id);

    public void deleteAllComments();
}
