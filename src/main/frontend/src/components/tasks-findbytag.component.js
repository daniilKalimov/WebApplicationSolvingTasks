import axios from "axios";
import { Component } from "react";
import { Table } from "react-bootstrap";
import Moment from "moment";
import { Link } from "react-router-dom";






export default class TasksFindByTag extends Component{
    constructor(props){
        super(props);
        this.state={
            tasks:[]


        }
    }

     componentDidMount(){

        axios.get(`http://localhost:8080/api/tasks/`).then(res=>{
            console.log(res.data)
             this.setState(
                 {
                    tasks:res.data
                 }
             )
                }
             
        ) }


render(){
    return(
        <div>
           {this.state.tasks.map(task=>(
               task.tagsTask.map((tagTask,i)=>(
                   
                       tagTask.id === Number(this.props.match.params.id) &&
                       <div>  
                            <h5 style={{marginBottom:'10px'}}> Список задач по тегу: {tagTask.text}</h5> 
                            <div>
                            <Table responsive="sm">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Название задачи</th>
                                        <th>Дата создания</th>
                                        <th>Разел</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{i+1}</td>
                                        <td><Link to={`/readTask/${task.id}`}>{task.name}</Link></td>
                                        <td>{Moment(task.createDate).format("YYYY-MM-DD HH:mm")}</td>
                                        <td>{task.topic}</td>
                                    </tr>
                                   
                                        </tbody>
                                        </Table>
                            </div>
                            
                       </div>
     
                
               ))
           ))}
            
        </div>
    )
}




}