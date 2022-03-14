package com.example.spring.services.User;

import com.example.spring.model.Tasks;
import com.example.spring.model.User;

import java.util.List;
import java.util.Set;

public interface UserServices {

    public Set<Tasks> addDoneTask(Long id, Tasks task);

    public  User findUserById(Long id);

    public  Set<Tasks> findDoneTask(Long id);


}
