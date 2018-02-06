import React, { Component } from 'react';
import './App.css';
import PasswordChange from './components/PasswordChange'
import FrontPage from './components/FrontPage'
import Menu from './components/Menu'
import CSSTransition from 'react-addons-css-transition-group'
import styled from 'styled-components'


//TODO:Clear value field in registration.js

var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var xhr = new XHR();

const Wraper=styled.div`
    width:100%;
    height:100%;
`

class App extends Component {
  state = {
    mounted: true
  }

 logOn=(email,pass)=>{
  console.log(`email=${email}&password=${pass}`);
  this.setState({ mounted: false,
    email:email,
  });
  xhr.open('POST', 'http://localhost:3000/api/account/register', false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(`email=${email}&password=${pass}`);
 }

 handleSubmit= (name1,name2,email,pass,passconf) => {
    this.setState({ mounted: false,
      firstname:name1,
      secondname:name2,
      email:email,
    });
    var xhr = new XHR();
    console.log(`email=${email}&firstName=${name1}&lastName=${name2}&password=${pass}&passwordConfirm=${passconf}`);
    xhr.open('POST', 'http://localhost:3000/api/account/register', false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`email=${email}&firstName=${name1}&lastName=${name2}&password=${pass}&passwordConfirm=${passconf}`);
 }
 ChangePassword=(newpass,pass,passconf) =>{
  console.log(`newpass=${newpass}&pass=${pass}&passconf=${passconf}`);
 }

  render() {
    return (
      <Wraper>
          <CSSTransition
                    transitionName="fade"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeaveTimeout={300}>
                    {this.state.mounted && <FrontPage onSubmit={this.handleSubmit} onLogOn={this.logOn}/>}
          </CSSTransition>
          <Menu></Menu>
      </Wraper>
    );
  }
}

export default App;
