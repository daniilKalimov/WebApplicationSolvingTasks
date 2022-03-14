package com.example.spring.repository;

import com.example.spring.dto.TasksDto;
import com.example.spring.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasksDtoRepo extends JpaRepository<TasksDto, Integer> {
}
