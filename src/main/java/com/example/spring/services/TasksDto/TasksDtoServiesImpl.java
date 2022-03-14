package com.example.spring.services.TasksDto;

import com.example.spring.dto.TagDto;
import com.example.spring.dto.TasksDto;
import com.example.spring.model.Tasks;
import com.example.spring.repository.TasksDtoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class TasksDtoServiesImpl implements TasksDtoServices{

    @Autowired
    public TasksDtoRepo tasksDtoRepo;

    @Override
    public List<TasksDto> getAllTasks() {
        List<TasksDto> tasks = tasksDtoRepo.findAll();
        Collections.sort(tasks);
        return tasks;
    }

    @Override
    public void deleteTaskDtoById(Integer id) {
        tasksDtoRepo.deleteById(id);
    }

    @Override
    public TasksDto getTaskDtoById(Integer id) {
        return tasksDtoRepo.findById(id).get();
    }

}
