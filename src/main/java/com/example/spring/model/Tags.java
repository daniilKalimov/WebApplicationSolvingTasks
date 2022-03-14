package com.example.spring.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name="tags")
public class Tags {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Integer id;

    @Column(name = "text")
    private String text;

    @JsonIgnore
    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable (name="tasks_tag",
            joinColumns=@JoinColumn (name="tag_id"),
            inverseJoinColumns=@JoinColumn(name="task_id"))
    private List<Tasks> tasksTag;

}
