import axios from "axios";
import { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";




export default class AnswerSearch extends Component{
    constructor(props){
        super(props);
        this.state={
            tasks:[]
           

        }
    }

    componentDidMount() {
       
        axios.get(`http://localhost:8080/api/tasks/search/${this.props.match.params.text}`).then(res=>{
            console.log(res.data)
                this.setState({
                tasks:res.data
                })  
            })
    
        }

    render(){
        
        return(
            <div>
              <h5>Ответ по поиску на запрос: {this.props.match.params.text}</h5>
              <Table responsive="sm">
              <thead>
                     <tr>
                       <th>#</th>
                       <th>Название</th>
                       <th>Раздел</th>
                       <th>Рейтинг</th>
                     </tr>
                   </thead>
              {this.state.tasks.map((task,i)=>(
                  
                   <tbody>
                     <tr>
                       <td>{i+1}</td>
                       <td><Link to={`/readTask/${task.id}`}>{task.name}</Link></td>
                       <td>{task.topic}</td>
                       <td>{task.raiting}</td>
                     </tr>
                     </tbody>
               
              ))}
              </Table>
          
            </div>
        )
    }





}