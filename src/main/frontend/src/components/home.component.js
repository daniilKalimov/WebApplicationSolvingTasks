
import axios from "axios";
import React, { Component } from "react";
import { Accordion,  Alert,  Col, Container, Row } from "react-bootstrap";
import logo from '../logo.png'
import Button from 'react-bootstrap/Button';




export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      tasks:[],
      tags:[],
      tagsTask:[],
      number:[],
      // star1:"",
      // star2:"",
      // star3:"",
      // star4:"",
      // star5:""
      
      
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/api/tasks`).then((res)=>{
      this.setState({
          tasks:res.data
      
  })
  console.log(this.state.tasks)
})
  axios.get(`http://localhost:8080/api/tagsdto`).then((res)=>{
    this.setState({
        tags:res.data,
        
    })
  
})
  }
  getTags(){
    let id = [];
  for(let i=0;i<this.state.tasks.length; i++){
    for(let j=0;j<this.state.tasks[i].tagsTask.length; j++){
      if(this.state.tasks[i].tagsTask[j] !== [])
     id[i] = this.state.tasks[i].tagsTask[j]
    }
           
    }
    return id
  }
      
  starState(tasks){
    let mas =[]
    console.log(mas)
    
    if(tasks>0.5 && tasks <1.5){
        
return mas=["active", " ", " "," ", " "]
      
    } else if(tasks>=1.5 && tasks <2.5){
      
        
        return mas=["active", "active", " "," ", " "]
      
    }
    else if(tasks>=2.5 && tasks <3.5){
      
       
        return mas=["active", "active", "active"," ", " "]

      
    }
    else if(tasks>=3.5 && tasks <4.5){
      
       
        return mas=["active", "active", "active","active", " "]

      
    }
    else if(tasks>=4.5){
     
       
        return mas=["active", "active", "active","active", "active"]

      
    }
    
  }
  
  

  render() {
    const tags = this.getTags();
    
    return (
      <div className="container">
        
          <Container>
            <Row>
              <Col md={{ span: 4, offset: 0 }}>
              <h5 style={{paddingBottom:'5px'}}>Последние добавленые задачи на сайт:</h5>
              {this.state.tasks.map((task, i) => (
                i<10  &&
            
             <div key={task.id}>
              <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                     
                         <Col md={4}> {task.name}</Col>
                         <Col md={{ span: 1, offset: 4 }}>
            
                         <div class="rating-mini">
                         {  this.mas = this.starState(task.raiting)}
                            <span class={this.mas[0]}></span>	
                            <span class={this.mas[1]}></span>    
                            <span class={this.mas[2]}></span>  
                            <span class={this.mas[3]}></span>    
                            <span class={this.mas[4]}></span>
                          </div>
                          </Col>
                      </Accordion.Header>
                    <Accordion.Body>
                      {task.content}
                      <div style={{marginTop:'5px'}}>
                      <Button variant="info" href = {`./readTask/${task.id}`}>Подробнее</Button>
                      </div> 
                    </Accordion.Body>
                  </Accordion.Item>
              </Accordion>
            </div>   
               ))}
              </Col>
              <Col md={{ span: 4, offset: 0 }} >
              <h5 style={{paddingBottom:'5px'}}>Задачи по рейтингу:</h5>
              </Col>
            
              <Col  md={{ span: 4, offset: 9 }}>  
                <Alert  variant="info">
                    <h5>Облако тегов</h5>
                    {tags.map(tag=>(
                    <span>
                  <img src={logo} alt='error'/>
                      <Button href={`/tasksbytag/${tag.id}`} variant='Link' style={{paddingBottom:'10px'}} >
                        {tag.text}
                      </Button>
                  </span> 
                   ))}
                </Alert>
              </Col>
              </Row>
          </Container>
        
      </div>
    );
  }
}