package com.example.spring.repository;

import com.example.spring.dto.TagDto;
import com.example.spring.model.Tags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagDtoRepo extends JpaRepository<TagDto, Integer> {
}
