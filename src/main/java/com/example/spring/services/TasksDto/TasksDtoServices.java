package com.example.spring.services.TasksDto;

import com.example.spring.dto.TagDto;
import com.example.spring.dto.TasksDto;
import com.example.spring.model.Tasks;

import java.util.List;

public interface TasksDtoServices {
    public List<TasksDto> getAllTasks();

    public void deleteTaskDtoById(Integer id);

    public TasksDto getTaskDtoById(Integer id);



}
