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
    console.log(info);
    this.props.onRegistraition(info);
  }

 ChangePassword=(newpass,pass,passconf) =>{
    
 }
  render() {
    /*if(!this.props.testStore.user || !this.props.testStore.user.email)
        this.props.onCheck();*/
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
      onCheck:()=>{
        const asyncGetData= ()=>{
          return (dispatch)=>{
            let xhr=new XMLHttpRequest();
            xhr.open('POST', '/api/account/getdata', false);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onload=()=>{
              let datas=JSON.parse(xhr.responseText);
              if(datas.success){
                const {userProfileModel,data}=datas.extras;
                const {notes,tags,folders}=data;
                dispatch({type:'GET_USER_INFO',payload:userProfileModel});
                dispatch({type:'UPDATE',payload:{notes,tags,folders}});
              }
            };
            xhr.send();
            /*setTimeout(()=>{
              let data={};
              data=test;
              dispatch({type:'GET_USER_INFO',payload:{email:"qwerty",firstname:"rew",secondname:"das"}});
              dispatch({type:'UPDATE',payload:data});
              window.location.replace("#/user/Notes");
            },100);*/
          }
        }
        dispatch(asyncGetData());        
      },
      onLogOn:(info)=>{
        const asyncGetData= ()=>{
          return (dispatch)=>{
        /*  let xhr=new XMLHttpRequest();
            xhr.open('POST', '/api/account/logon', false);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onload=()=>{
              let datas=JSON.parse(xhr.responseText);
              console.log(datas);
              if(datas.success){
                const {userProfileModel,data}=datas.extras;
                let {notes,tags,folders}=data;
                dispatch({type:'GET_USER_INFO',payload:userProfileModel});
                dispatch({type:'UPDATE',payload:{notes,tags,folders}});
                window.location.replace("#/user/Notes");
              }
            };
            xhr.send(`email=${info.email}&password=${info.password}`);
            */setTimeout(()=>{
              let data={};
              data=test;
              dispatch({type:'GET_USER_INFO',payload:{email:"qwerty",firstname:"rew",secondname:"das"}});
              dispatch({type:'UPDATE',payload:data});
              window.location.replace("#/user/Notes");
            },100);
          }
        }
        dispatch(asyncGetData());
      },
      onRegistraition:(info)=>{
        const asyncGetData= ()=>{
          return (dispatch)=>{
          let xhr=new XMLHttpRequest();
            xhr.open('POST', '/api/account/register', false);
            //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onload=()=>{
              let datas=JSON.parse(xhr.responseText);
              console.log(datas);
              if(datas.success){
                const {userProfileModel}=datas.extras;
                dispatch({type:'GET_USER_INFO',payload:userProfileModel});
                window.location.replace("#/user/CreateNode");
              }
            };
            xhr.send(`email=${info.email}&firstname=${info.name}&lastName =${info.name2}&password=${info.pass}&passwordConfirm=${info.passconf}`);
            /*setTimeout(()=>{
              let data={};
              data=test;
              dispatch({type:'GET_USER_INFO',payload:{email:"qwerty",firstname:"rew",secondname:"das"}});
              dispatch({type:'UPDATE',payload:data});
              window.location.replace("#/user/Notes");
            },100);*/
          }
        }
        dispatch(asyncGetData());
      },
    })
)(App);