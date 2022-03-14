package com.example.spring.repository;

import com.example.spring.model.Raiting;
import com.example.spring.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RaitingRepo extends JpaRepository<Raiting, Integer> {

}
