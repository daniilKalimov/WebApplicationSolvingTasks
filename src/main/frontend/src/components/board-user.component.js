import React, { Component } from "react";
import axios from 'axios';
import UserService from "../services/user.service";
import { Col, Container,  Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import AuthService from '../services/auth.service';
import Moment from 'moment';




export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: AuthService.getCurrentUser(),
      count:0,
      tasks:[],
      URL :'',
      tasksDone:[]
    
      
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );

    this.getTasks();
   this.getUsersDoneTasks()
   

}
getUsersDoneTasks(){
  axios.get(`http://localhost:8080/api/donetask/${this.state.currentUser.id}`).then((res)=>{
    console.log(res.data)
        this.setState({
            tasksDone:res.data
        }) 
        
        
        
    })

}

getTasks(){
    axios.get(`http://localhost:8080/api/tasksdto/`).then((res)=>{
        this.setState({
            tasks:res.data
        }) 
        
        
    })

}

onSubmitDelete(id){
    axios.delete(`http://localhost:8080/api/tasks/delete/${id}`).then((res)=>{
        this.setState({
            tasks:res.data,
            count: this.getCount()
        })
    })      
}

  render() {
      
    console.log(this.state.tasks.length)
    return (
        <div>
  

<div className = "User" >

<h1>Личный кабинет</h1>
<br/>
<Container style={{padding:"20px 0px 50px 0px"}}>
   <Row>
    <Col sm={8}><div><h5>Количество решенных задач: {this.state.tasksDone.length}</h5></div>
    <br/>
    <div><h5>Количество созданных задач: {this.state.tasks.length}  </h5></div></Col>
   </Row>
 </Container>
 <div>

         <Button variant="primary" size="sm" href="user/addtask" style={{margin:"0px 0px 30px 0px"}}>
                       Добавить задачу
         </Button>
       
         </div>


 <h3>Список ваших созданных задач задач</h3>
 <br/>
 <Table  striped bordered hover style={{marginBottom:'50px'}}>
     <thead>
       <tr>
         <th>№ задачи</th>
         <th>Название задачи</th>
         <th>Дата создания</th>
         <th>Действия</th>
         
       </tr>
     </thead>
     {this.state.tasks.map((task,i)=>(
     <tbody key = {task.id}>
         
         {this.state.currentUser.id === task.author &&
             
       <tr>
         <td>{i += 1}</td>
         <td>{task.name}</td>
         <td>{Moment(task.createDate).format("YYYY-MM-DD HH:mm")}</td>
         <td>
             <Button variant="primary" size="sm" href={`user/updatetask/${task.id}`}  style={{margin:"0px 5px 0px 0px"}}>
               Изменить
             </Button>
             <Button variant="primary" size="sm" href="#" onClick={()=>this.onSubmitDelete(task.id)}>
               Удалить
             </Button>
         </td>
         
       </tr>
         }
     </tbody>
        
      ))}
   </Table>

   <h3>Список выполненных задач</h3>
 <br/>
 <Table  striped bordered hover style={{marginBottom:'100px'}}>
     <thead>
       <tr>
         <th>№ задачи</th>
         <th>Название задачи</th>
         <th>Дата создания</th>
         <th>Раздел</th>
       </tr>
     </thead>
     {this.state.tasksDone.map((task,i)=>(
     <tbody key = {task.id}>
         
         {this.state.currentUser.id === task.author &&
             
       <tr>
         <td>{i += 1}</td>
         <td>{task.name}</td>
         <td>{Moment(task.createDate).format("YYYY-MM-DD HH:mm")}</td>
         <td>{task.topic}</td>
       </tr>
         }
     </tbody>
        
      ))}
   </Table>
            
</div>     
</div> 


    );
  }
}