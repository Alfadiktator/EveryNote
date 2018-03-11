import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components'
import {markdown} from 'markdown';
import {Link} from 'react-router-dom';

const Wrap1=styled.div`
position:absolute;
height:auto;
width:400px;
@media (max-width: 600px) {
    width:100%;
    left:0;
}
@media (max-height: 700px) {
  height:186px;
  top:105px;
}
left:calc(95% - 400px);
top:15vh;
display: flex;
align-items: center;
justify-content: center;
background-color:#fff;
box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
z-index:50;
`

const Wrap2=styled.div`
padding:5%;
height:100%;
width:100%;
`
const Centrer=styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`
const LabelReg=styled.div`
  background-color:rgb(0, 121, 30);
  color:#fff;
  font-size:2em;
  font-weight:bold;
  border-radius:3px;
  `


class Logon extends React.Component {
  constructor(props){
    super(props);
    this.onLogOn=props.onLogOn;
  }

  render() {
//markdown.toHTML( "Hello *World*!");
    return (
    <Wrap1>
        <Wrap2>
      <Form row>
        <FormGroup>
          <Label for="Email" hidden>Email</Label>
          <Input type="email" name="email" id="EmailLogon" placeholder="Email" value="dfvfdv@dfvdfv.ru"/>
        </FormGroup>
        <FormGroup>
          <Label for="Password" hidden>Password</Label>
          <Input type="password" name="password" id="PasswordLogon" placeholder="Password" value="dfvfdv@dfvdfv.ru" />
        </FormGroup>
        <Centrer><Button color="success" onClick={() =>{
          this.onLogOn(document.getElementById('EmailLogon').value,
          document.getElementById('PasswordLogon').value)
        }}>Log on</Button></Centrer>
      </Form>
     </Wrap2>
  </Wrap1>
    );
  }
}

export default Logon