package com.example.spring.model.Key;

import javax.persistence.EmbeddedId;
import java.io.Serializable;




public class KeyPK  implements Serializable {
    protected Integer userId;
    protected Integer taskId;

    public KeyPK(){}

    public KeyPK(Integer userId, Integer taskId) {
        this.taskId = taskId;
        this.userId = userId;
    }
}
