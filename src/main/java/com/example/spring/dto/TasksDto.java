package com.example.spring.dto;


import com.example.spring.model.Tasks;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name="tasks")
public class TasksDto implements Comparable<TasksDto>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Integer id;




    @Column(name = "user_id")
    private Integer author;

    @Column(name = "create_date")
    @NotNull
    private Date createDate;

    @Column(name = "name")
    private String name;

    @Column(name = "content")
    private String content;

    @Column(name = "images_url")
    private String images;

    @Column(name = "answer_one")
    private String answerOne;

    @Column(name = "answer_two")
    private String answerTwo;

    @Column(name = "answer_three")
    private String answerThree;

    @Column(name = "raiting")
    private Double raiting;

    @Column(name = "topic")
    private String topic;

    @Override
    public int compareTo( TasksDto o1) {
        if(getCreateDate().compareTo(o1.getCreateDate())>0)
            return -1;
        else if (getCreateDate().compareTo(o1.getCreateDate())<0)
            return 1;
        else return 0;
    }
}


