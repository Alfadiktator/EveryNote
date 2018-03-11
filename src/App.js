import React, { Component } from 'react';
import './App.css';
import FrontPage from './components/UserInfo/FrontPage';
import styled from 'styled-components';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import ButtonMenu from './components/ButtonMenu';
import {connect} from 'react-redux';


const Wraper=styled.div`
    width:100vw;
    height:100vh;
`

class App extends Component {

 logOn=(email,pass)=>{
    this.props.onLog(email,pass);
 }

 handleSubmit= (name,name2,email,pass,passconf) => {
    var xhr = new XHR();
    this.props.onRegistration({
      name:name,
      name2:name2,
      email:email,
      pass:pass,
      passconf:passconf,
    })
   }

 ChangePassword=(newpass,pass,passconf) =>{
    
 }
  render() {
    console.log(this.props.testStore);
    return (
        <Wraper>
          <Router>
            <Switch>
              <Route exact path="/" render={()=> <FrontPage onSubmit={this.handleSubmit} onLogOn={this.logOn}/>}/>
              <Route  path="/user" render={() => <ButtonMenu data={this.state}/> }>
              </Route>
            </Switch>
          </Router>
        </Wraper>
    );
  }
}

export default connect(
    state =>({
      testStore:state
    }),
    dispatch => ({
      onLog:(email,pass)=>{
        dispatch({type:'LOG_ON',payload:{email:email,password:pass}})
      },
      onRegistration:(info)=>{
        dispatch({type:'REGISTRATION',payload:info})
      }
    })
)(App);
