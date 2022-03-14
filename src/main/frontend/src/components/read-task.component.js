import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Component } from "react";
import {  Alert, Form } from 'react-bootstrap';
import AuthService from '../services/auth.service';






export default class ReadTask extends Component {
    constructor(props) {
      super(props);

      this.state={
          tasks:[],
          tagsTask:[],
          answer:false,
          textAnswer:'',
          button:'Решить задачу',
          answerOne:'',
          answerTwo:'',
          answerThree:'',
          flagOne:false,
          flagTwo:false,
          currentUser: AuthService.getCurrentUser(),
         id:0,
         tasksDone:[],
         radio:0,
         raitin:[],
         controlRaiting:true
         
         
        
          

      }
      
    }
componentDidMount(){
    axios.get(`http://localhost:8080/api/tasks/${this.props.match.params.id}`).then((res)=>{
      this.setState({
          tasks:res.data, 
          tagsTask:res.data.tagsTask,
          answerOne:res.data.answerOne,
          answerTwo:res.data.answerTwo,
          answerThree:res.data.answerThree,

      })
     
  })

    axios.get(`http://localhost:8080/api/donetask/${this.state.currentUser.id}`).then((res)=>{
      console.log(res.data)
          this.setState({
              tasksDone:res.data
          }) 
           
      })

     
}

submit(event){
    event.preventDefault();
   let mass = [this.state.answerOne, this.state.answerTwo, this.state.answerThree]
   if(mass.includes(this.state.textAnswerOne)){
      delete mass[mass.findIndex(()=>this.state.textAnswerOne)]
      if(mass.includes(this.state.textAnswerTwo)){
        delete mass[mass.findIndex(()=>this.state.textAnswerTwo)]
        if(mass.includes(this.state.textAnswerTwo)){
            this.setState({flagOne:true})
            this.setState({flagTwo:false})
            axios.put(`http://localhost:8080/api/adddonetask/${this.state.currentUser.id}`,
            { 
               id: this.state.tasks.id
            })
        }
      }
   } else{
       this.setState({flagTwo:true})
       this.setState({flagOne:false})
   }
     
}

addAnswer(){
      this.state.answer ? this.setState({answer:false}) : this.setState({answer:true})
      this.state.button === 'Решить задачу' ? this.setState({button:'Отменить'}) : this.setState({button:'Решить задачу'})
      if(this.state.button === 'Отменить'){
          this.setState({
            flagTwo:false,
            flagOne:false
          })
      }
}
control(){
    let i = 0
    this.state.tasksDone.map(taskDone => {if(taskDone.id === this.state.tasks.id){
         i = i + 1
        }
        return i
        })
    if(i !== 0){
       
           return  false;
    }
        
        else {
        
        return   true;
        
}
}

submitRate(e){
    e.preventDefault();
    axios.put(`http://localhost:8080/api/raiting/`,
    {
        raiting : this.state.radio,
        userId: this.state.currentUser.id,
        taskId:this.props.match.params.id
    } ).then(res=>{
        this.componentDidMount()
    }
    )

   
}

    render(){
        
        
        return(
            <div>
            <div>
               <div>Название: {this.state.tasks.name}</div>
               <div>Раздел: {this.state.tasks.topic}</div>
               <div>Теги: {this.state.tagsTask.map(tag=>(
                  <span key={tag.id}>{tag.text}</span> 
               ))}</div>
               <div >Текст задачи: {this.state.tasks.content}</div>
               <div style={{marginBottom:'50px'}}>Рейтинг: {this.state.tasks.raiting}</div>
                
               { 
               this.control()
               &&
                
                <Button variant="primary" onClick={()=>this.addAnswer()}>{this.state.button}</Button>
               }
               {
                   this.state.answer && 
                   <Form  onSubmit={(e)=>this.submit(e)} style={{marginBottom:'15px'}}>
                      
                    <Alert variant='danger' style = {{marginTop:'10px'}}>
                    У задачи может быть несколько вариантов ответа, но не больше трех. Для получения положительного результата необходимо
                       вписать все правильные ответы
                    </Alert>
    
                   <Form.Group  >
                    <Form.Label column sm="2">Ответ к задаче</Form.Label>
                            <Form.Control   as="textarea" rows={1} placeholder="Введите ответ" 
                            onChange = {(e)=>this.setState({textAnswerOne:e.target.value})} value={this.state.textAnswerOne} />
                    </Form.Group>

                    <Form.Group  >
                    <Form.Label column sm="2">Ответ к задаче</Form.Label>
                            <Form.Control   as="textarea" rows={1} placeholder="Введите ответ" 
                            onChange = {(e)=>this.setState({textAnswerTwo:e.target.value})} value={this.state.textAnswerTwo} />
                    </Form.Group>

                    <Form.Group  >
                        <Form.Label column sm="2">Ответ к задаче</Form.Label>
                        <Form.Control   as="textarea" rows={1} placeholder="Введите ответ" 
                        onChange = {(e)=>this.setState({textAnswerThree:e.target.value})} value={this.state.textAnswerThree} />
                        </Form.Group>
                    <Button type='submit'style={{marginTop:'15px'}} >Отправить на проверку</Button>
                  </Form>
                  
               }
               
               {
                   this.state.flagOne &&
                   <Alert  variant='success'>
                   Поздравляю! Ответ верный
                   </Alert>
               }
               {
                   this.state.flagTwo &&
                   <Alert variant='danger'>
                   Ответ не верный
                  </Alert>
               }
               {
                   !this.control() &&
                   <Alert  variant='success'>
                   Эта задача вами уже решена !
                   </Alert>
               }   
            </div>
           
            <div style={{marginTop:'15px'}}>
            <h5>Поставить оценку задаче:</h5>
            <Form onSubmit={(e) => this.submitRate(e)}>
                    
                        <Form.Check
                            inline
                            label="1"
                            name="group1"
                            type="radio"
                            onChange={(e)=>
                                this.setState({
                                    radio: 1

                                })
                            }
                            
                        />
                        <Form.Check
                            inline
                            label="2"
                            name="group1"
                            type="radio"
                            onChange={(e)=>
                                this.setState({
                                    radio: 2

                                })
                            }
                            
                        />
                        <Form.Check
                            inline
                            label="3"
                            name="group1"
                            type="radio"
                            onChange={(e)=>
                                this.setState({
                                    radio: 3

                                })
                            }
                            
                        />
                         <Form.Check
                            inline
                            label="4"
                            name="group1"
                            type="radio"
                            onChange={(e)=>
                                this.setState({
                                    radio: 4

                                })
                            }
                            
                        />
                         <Form.Check
                            inline
                            label="5"
                            name="group1"
                            type="radio"
                            onChange={(e)=>
                                this.setState({
                                    radio: 5

                                })
                            }
                            
                        />
                        <div>
                         <Button type='submit'style={{marginTop:'15px'}} >Отправить</Button>
                         </div>
                    </Form>
                    </div>
                  
            </div>
            
        )
    }
}