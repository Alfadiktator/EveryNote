import React, { Component } from 'react';
import './App.css';
import FrontPage from './components/UserInfo/FrontPage';
import styled from 'styled-components';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import ButtonMenu from './components/ButtonMenu';
import {connect} from 'react-redux';
import test from './Test';


const Wraper=styled.div`
    width:100vw;
    height:100vh;
`

class App extends Component {

state={
  redirect:false,
}

 handleSubmit= (name,name2,email,pass,passconf) => {
    let info={
      name:name,
      name2:name2,
      email:email,
      pass:pass,
      passconf:passconf,
    }
   }

 ChangePassword=(newpass,pass,passconf) =>{
    
 }
  render() {
    console.log(this.props.testStore);
    return (
        <Wraper>
          <Router>
            <Switch>
              <Route exact path="/" render={()=> <FrontPage onSubmit={this.handleSubmit} onLogOn={this.props.onLogOn}/>}/>
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
      testStore:state,
    }),
    dispatch => ({
      onLogOn:(info)=>{
        const asyncGetData= ()=>{
          return (dispatch)=>{
            let xhr=new XMLHttpRequest();
            xhr.open('POST', '/api/account/logon', false);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(`email=${info.email}&password=${info.password}`);
            xhr.onload=()=>{
              let datas=JSON.parse(xhr.responseText);
              if(datas.success){
                const {userProfileModel,data}=datas.extras;
                const {notes,tags,folders}=data;
                dispatch({type:'GET_USER_INFO',payload:userProfileModel});
                dispatch({type:'UPDATE',payload:{notes,tags,folders}});
                window.location.replace("#/user/Notes");
              }
            };
            /*setTimeout(()=>{
              let data={};
              data=test;

            },1000);*/
          }
        }
        dispatch(asyncGetData());
      }
    })
)(App);