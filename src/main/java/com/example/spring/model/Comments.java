package com.example.spring.model;


import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name="comment")
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "content")
    private String content;

    @ManyToOne
    @JoinColumn (name="task_id")
    private Tasks task;

    @ManyToOne
    @JoinColumn (name="user_id")
    private User user;




}
