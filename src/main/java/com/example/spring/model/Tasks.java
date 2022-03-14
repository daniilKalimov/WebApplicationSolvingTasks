package com.example.spring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.IndexedEmbedded;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Comparator;
import java.util.Date;
import java.util.List;


@Entity
@Data
@Table(name="tasks")
@Indexed
public class Tasks implements Comparable<Tasks>{

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
    @FullTextField
    private String name;

    @Column(name = "content")
    @FullTextField
    private String content;

    @Column(name = "images_url")
    private String images;

    @Column(name = "answer_one")
    private String answerOne;

    @Column(name = "answer_two")
    private String answerTwo;

    @Column(name = "answer_three")
    private String answerThree;

//    @Column(name="raitings_task")
//    @OneToMany(mappedBy = "taskId", fetch = FetchType.LAZY)
//    private List<Raiting> raitingsTask;

    @Column(name = "raiting")
    private Double raiting;

    @Column(name = "topic")
    @FullTextField
    private String topic;

    @OneToMany(mappedBy="task", fetch=FetchType.LAZY)
    private List<Comments> CommentsTask;

    @JsonIgnore
    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable (name="done_tasks",
         joinColumns=@JoinColumn (name="task_id"),
         inverseJoinColumns=@JoinColumn(name="user_id"))
     private List<User> usersDoneTask;


 @ManyToMany(fetch=FetchType.LAZY)
 @JoinTable (name="tasks_tag",
         joinColumns=@JoinColumn (name="task_id"),
         inverseJoinColumns=@JoinColumn(name="tag_id"))
 private List<Tags> tagsTask;




 @Override
 public int compareTo( Tasks o1) {
  if(getCreateDate().compareTo(o1.getCreateDate())>0)
   return -1;
  else if (getCreateDate().compareTo(o1.getCreateDate())<0)
   return 1;
  else return 0;
 }
}


