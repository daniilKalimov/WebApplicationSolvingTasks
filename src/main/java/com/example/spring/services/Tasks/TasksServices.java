package com.example.spring.services.Tasks;


import com.example.spring.model.Tasks;
import com.example.spring.model.User;

import java.text.ParseException;
import java.util.List;

public interface TasksServices {

    public Tasks addTask(Tasks task) throws ParseException;

    public void deleteTaskById(Integer id);

    public List<Tasks> getAllTasks();

    public Tasks getTaskById(Integer id);

    public  String getTextTagById(Integer id);

    public Tasks updateTask(Tasks task);

    public Tasks addRaiting(Tasks task, Integer id);














}
