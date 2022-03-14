import { Component } from "react";
import { Form, FormControl } from "react-bootstrap";
import Button from 'react-bootstrap/Button';




export default class Search extends Component{
    constructor(props) {
        super(props);

    this.state={
        text:''
    }
}

    


    render(){
        return(
            <div>
          <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Поиск"
            className="me-2"
            aria-label="search"
            value={this.state.text}
            onChange={(e)=>this.setState({
              text:e.target.value
            })}
          />
          <Button variant="outline-primary"  href={`/answersearch/${this.state.text}`}>Поиск</Button>
        </Form>
        </div>
        )
    }
}