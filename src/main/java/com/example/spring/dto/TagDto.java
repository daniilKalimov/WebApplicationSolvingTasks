package com.example.spring.dto;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="tags")
public class TagDto  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Integer id;

    @Column(name = "text")
    private String text;
}