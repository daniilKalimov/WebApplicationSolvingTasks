import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {lightTheme, darkTheme,GlobalStyles} from "./themes";
import AuthService from "./services/auth.service";
import styled, { ThemeProvider } from "styled-components";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import AddTask from "./components/add-task.component";
import UpdateTask from "./components/update-task.component";
import Button from 'react-bootstrap/Button';
import ReadTask from './components/read-task.component'
import TasksFindByTag from './components/tasks-findbytag.component'
import Search from "./components/searh.component";
import AnswerSearch from "./components/answer-search.component";




const StyledApp = styled.div`
color: ${props => props.theme.fontColor};`


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      theme: 'light',
      tasks:[],
      text:''

    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  themeToggler(){
    console.log(this.state.theme)
   this.state.theme === 'light' ? this.setState({theme:'dark'}) : this.setState({theme:'light'})
  }

  logOut() {
    AuthService.logout();
  }

  

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme }>
        <GlobalStyles/>
      <StyledApp>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          
            
          <Link to={"/"} className="navbar-brand">
            Решу.ру
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>


            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>
          

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          <Button variant="outline-primary"    onClick={()=>this.themeToggler()}>Изменит тему</Button>
          <div style={{paddingLeft:"750px"}}>
          <Search/>
          </div>
        </nav>
        <div className="container mt-3">
         
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/user" component={BoardUser} />
            <Route  exact path="/mod" component={BoardModerator} />
            <Route exact path="/admin" component={BoardAdmin} />
            <Route exact path="/user/addtask" component={AddTask} />
            <Route exact path="/user/updatetask/:id" component={UpdateTask} />
            <Route exact path="/readTask/:id" component={ReadTask}/>
            <Route exact path="/tasksbytag/:id" component={TasksFindByTag}/> 
            <Route exact path="/answersearch/:text" component={AnswerSearch}/>
          </Switch>
          
         
        </div>
      </StyledApp>
      </ThemeProvider>
    );
  }
}

export default App;