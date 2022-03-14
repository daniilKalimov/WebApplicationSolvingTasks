import React  from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AuthService from '../services/auth.service';








class UpdateTask extends React.Component {
    constructor(props){
        super(props);
        

          
        this.state = {
            tasks:[],
            id:0,
            name: '',
            content:'',
            answerOne:'',
            answerTwo:'',
            answerThree:'',
            topic:'',
            tagsTask:[],
            text:'',
            tags:[],
            
            
            currentUser : AuthService.getCurrentUser(),  
        
        }
    }

    componentDidMount(){
        
        axios.get(`http://localhost:8080/api/tasksdto/${this.props.match.params.id}`).then((res)=>{
            this.setState({
                tasks:res.data,
                id:res.data.id,
                name: res.data.name,
                content:res.data.content,
                answerOne:res.data.answerOne,
                answerTwo:res.data.answerTwo,
                answerThree:res.data.answerThree,
                topic:res.data.topic, 
                createDate:res.data.createDate, 
                

            })
            
        })
        axios.get(`http://localhost:8080/api/tagsdto/`).then((res)=>{
            this.setState({
                tags:res.data,     
            })
            
        })  
        
       
        
        axios.get(`http://localhost:8080/api/tasks/gettag/${this.props.match.params.id}`).then((res)=>{
            this.setState({
                text:res.data,     
            })
            
        })   
      
    }
    submit(event){
        event.preventDefault();
        
        axios.put('http://localhost:8080/api/tags/update',{
                text:this.state.text,       
                
        }).then(res=>{
            console.log(res)
            console.log(this.state.createDate)
            axios.put(`http://localhost:8080/api/tasks/update`,{
                id:this.props.match.params.id,
                name:this.state.name,
                content:this.state.content,
                answers:this.state.answers,
                topic:this.state.topic,
                answerOne:this.state.answerOne,
                answerTwo:this.state.answerTwo,
                answerThree:this.state.answerThree,
                author:this.state.currentUser.id,
                createDate:this.state.createDate,
                tagsTask:[res.data]
                
            }).then(res=>{
                this.componentDidMount()
            })
            
            
        })     
    }

     onSuggestHandler(textt){
         this.setState({text:textt})
         this.suggest = []

     }


     onChangeHandler(textt) {
        this.setState({text:textt})
        let matches = []
        if(textt.length>0){
           
            matches = this.state.tags.filter(tag =>{
                const regex = new RegExp(textt,"gi");
                return tag.text.match(regex)
            })

        }
       
        
        this.suggest = matches
        
        
       
    }
    
      
   
render(){

    
 
return(
    <div className = "Task">
                <Form className = "FormTask" onSubmit={(e)=>this.submit(e)}>
            <Row className="mb-3">
                <Form.Group  as={Col} controlId="formGridEmail">
                <Form.Label>Название задачи</Form.Label>
                <Form.Control  placeholder="Название задачи" onChange = {(e)=>this.setState({name:e.target.value})}
                value={this.state.name} />
                </Form.Group>
            

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Тэги</Form.Label>
                <Form.Control placeholder="Введите тэги" onChange = {(e)=>this.onChangeHandler(e.target.value)}
                value={this.state.text} onBlur = {()=>setTimeout(()=>{this.suggest = []},100)} />
                {this.suggest && this.suggest.map((suggest,i) =>
                <div className ="suggestion" key = {i} onClick = {()=>this.onSuggestHandler(suggest.text)}>{suggest.text}</div>
                 
                )}
                


                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Категория</Form.Label>
                <Form.Select defaultValue="Choose..." onChange = {(e)=>this.setState({topic:e.target.value})}
                value={this.state.topic}>
                    <option>Алгебра</option>
                    <option>Геометрия</option>
                    <option>Физика</option>
                    <option>Тригонометрия</option>
                    <option>Информатика</option>
                    <option>Комбинаторика</option>
                </Form.Select>
                </Form.Group>
            </Row>
            
            <Form.Group  className="mb-3" controlId="formGridAddress1" >
                <Form.Label>Текст задачи</Form.Label>
                <Form.Control   as="textarea" rows={5} placeholder="Введите текст задачи" 
                onChange = {(e)=>this.setState({content:e.target.value})} value={this.state.content} />
            </Form.Group>

             
            <Row className="mb-3">
           
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                Ответ на задачу
                </Form.Label>
                <Col sm="5">
                <Form.Control type="textarea" placeholder="Ответ №1" onChange = {(e)=>this.setState({answerOne:e.target.value})}
                value={this.state.answerOne}/>
                </Col>
            </Form.Group>

            </Row>

            <Row className="mb-3">
           
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                Ответ на задачу
                </Form.Label>
                <Col sm="5">
                <Form.Control type="textarea" placeholder="Ответ №2" onChange = {(e)=>this.setState({answerTwo:e.target.value})}
                value={this.state.answerTwo}/>
                </Col>
            </Form.Group>

            </Row>

            <Row className="mb-3">
           
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                Ответ на задачу
                </Form.Label>
                <Col sm="5">
                <Form.Control type="textarea" placeholder="Ответ №3" onChange = {(e)=>this.setState({answerThree:e.target.value})}
                value={this.state.answerThree}/>
                </Col>
            </Form.Group>

            </Row>

            <Button variant="primary" type="submit" name = "action">
              Сохранить
            </Button>
            </Form>
            
            
            
            </div>
        

           

               

);
}
  
}
export default UpdateTask