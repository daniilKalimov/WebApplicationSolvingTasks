package com.example.spring.model;


import com.example.spring.model.Key.KeyPK;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="raiting")
@IdClass(KeyPK.class)
public class Raiting {


    @Column(name="raiting")
     private Double raiting;

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Id
    @Column(name = "task_id")
    private Integer taskId;




}
