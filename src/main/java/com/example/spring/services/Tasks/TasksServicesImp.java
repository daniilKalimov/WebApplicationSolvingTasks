package com.example.spring.services.Tasks;


import com.example.spring.model.Tags;
import com.example.spring.model.Tasks;
import com.example.spring.model.User;
import com.example.spring.repository.TasksRepo;
import com.example.spring.search.TasksSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class TasksServicesImp implements TasksServices {

    @Autowired
    private TasksRepo tasksRepo;



    @Override
    public Tasks addTask(Tasks task) throws ParseException {

        String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
        Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(timeStamp);
        task.setCreateDate(date);
        return tasksRepo.save(task);
    }

    @Override
    public void deleteTaskById(Integer id) {
        tasksRepo.deleteById(id);

    }


    @Override
    public List<Tasks> getAllTasks() {
        List<Tasks> tasks = tasksRepo.findAll();
        Collections.sort(tasks);
        return tasks;
    }

    @Override
    public Tasks getTaskById(Integer id) {
        return tasksRepo.findById(id).get();
    }


    @Override
    public String getTextTagById(Integer id) {
        Tasks tasks = tasksRepo.findById(id).get();
        List<Tags> tagsTask = tasks.getTagsTask();
        String text = "";
        if (tagsTask.size() > 0)
            text = tagsTask.get(tagsTask.size() - 1).getText();
        return text;
    }

    @Override
    public Tasks updateTask(Tasks task) {
        return tasksRepo.save(task);
    }

    @Override
    public Tasks addRaiting(Tasks task, Integer id) {
        Tasks tasks = tasksRepo.findById(id).get();
        tasks.setRaiting(Math.round((task.getRaiting() + tasks.getRaiting()) / 2 * 100.0) / 100.0);
        return tasksRepo.save(tasks);
    }

}
