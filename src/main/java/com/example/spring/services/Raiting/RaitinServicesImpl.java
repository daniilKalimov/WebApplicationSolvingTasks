package com.example.spring.services.Raiting;

import com.example.spring.model.Raiting;
import com.example.spring.model.Tasks;
import com.example.spring.repository.RaitingRepo;
import com.example.spring.repository.TasksRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RaitinServicesImpl implements RaitingServices{

    @Autowired
    private RaitingRepo raitingRepo;

    @Autowired
    private TasksRepo tasksRepo;

    @Override
    public Raiting addRaiting(Raiting raiting) {
       Raiting raiting1 = raitingRepo.save(raiting);
       List<Raiting> raitings = raitingRepo.findAll();
       Double sum = 0.0;
       int size = 0;
        for (Raiting r: raitings) {
            if(r.getTaskId() == raiting.getTaskId()) {
                sum += r.getRaiting();
                size += 1;
            }
        }
        Tasks task = tasksRepo.findById(raiting.getTaskId()).get();
        task.setRaiting(sum/size);
        tasksRepo.save(task);
        return raiting1;
    }
}
