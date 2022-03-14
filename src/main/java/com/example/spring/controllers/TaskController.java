package com.example.spring.controllers;



import com.example.spring.dto.TagDto;
import com.example.spring.dto.TasksDto;
import com.example.spring.model.Tasks;
import com.example.spring.model.User;
import com.example.spring.search.TasksSearch;
import com.example.spring.services.Tasks.TasksServices;
import com.example.spring.services.TasksDto.TasksDtoServiesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TaskController {


    @Autowired
    private TasksServices tasksServices;

    @Autowired
    public TasksDtoServiesImpl tasksDtoServies;

    @Autowired
    public TasksSearch tasksSearch;

    @PostMapping("/tasks")
    private void addTask(@RequestBody Tasks tasks){
        try {

            tasksServices.addTask(tasks);
        }  catch (ParseException e) {
            e.printStackTrace();
        }


    }

    @DeleteMapping("/tasks/delete/{id}")
    private List<TasksDto> deleteTask(@PathVariable Integer id){
        tasksServices.deleteTaskById(id);
        return tasksDtoServies.getAllTasks();
    }

    @GetMapping("/tasks")
    private List<Tasks> getTask(){
       return tasksServices.getAllTasks();

    }

    @GetMapping("/tasks/{id}")
    private Tasks getTaskById(@PathVariable Integer id){
        return tasksServices.getTaskById(id);

    }

    @GetMapping("/tasks/gettag/{id}")// возвращаем тэг для отображения в update
    private String getTextTagById(@PathVariable Integer id){
        return tasksServices.getTextTagById(id);

    }

    @GetMapping("/tasksdto")
    public List<TasksDto> getAllTasksDto(){
        return tasksDtoServies.getAllTasks();
    }

    @DeleteMapping("/tasksdto/delete/{id}")
    private List<TasksDto> deleteTaskDto(@PathVariable Integer id){
        tasksDtoServies.deleteTaskDtoById(id);
        return tasksDtoServies.getAllTasks();
    }

    @GetMapping("/tasksdto/{id}")
    private TasksDto getTaskDtoById(@PathVariable Integer id){
        return tasksDtoServies.getTaskDtoById(id);

    }

    @GetMapping("/tasks/search/{text}")
    private List<Tasks> searchTasks(@PathVariable  String text) throws InterruptedException {

        return tasksSearch.search(text);
    }

    @PutMapping("/tasks/update")
        public Tasks updateTask(@RequestBody Tasks task){
           return tasksServices.updateTask(task);

        }
    @PutMapping("/tasks/raiting/{id}")
    public Tasks updateTask(@RequestBody Tasks task,@PathVariable Integer id){
        return tasksServices.addRaiting(task,id);

    }
    }






