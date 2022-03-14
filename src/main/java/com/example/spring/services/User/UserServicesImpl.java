package com.example.spring.services.User;

import com.example.spring.model.Tasks;
import com.example.spring.model.User;
import com.example.spring.repository.TasksRepo;
import com.example.spring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class UserServicesImpl implements UserServices {

    @Autowired
    public  UserRepository userRepository;

    @Autowired
    public TasksRepo tasksRepo;


    @Override
    public Set<Tasks> findDoneTask(Long id) {
       User user = userRepository.findById(id).get();
        return user.getTasksDone();
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public Set<Tasks> addDoneTask(Long id, Tasks task) {
            User user = userRepository.findById(id).get();
            Set<Tasks> tasks = user.getTasksDone();
            tasks.add(tasksRepo.findById(task.getId()).get());
            user.setTasksDone(tasks);
            userRepository.save(user);
            return user.getTasksDone();

    }
}
