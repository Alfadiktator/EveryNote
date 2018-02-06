import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components'


const Wrap1=styled.div`
height:20vh;
width:15vw;
@media (min-width: 300px) {
    width:300px;
}
border:2px solid black;
left:70vw;
top:15vh;
position: absolute;
display: flex;
align-items: center;
justify-content: center;
background-color:#fff;
z-index:50;
`

const Wrap2=styled.div`
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
    return (
    <Wrap1>
        <Wrap2>
        <LabelReg>Logon</LabelReg>     
      <Form row>
        <FormGroup>
          <Label for="Email" hidden>Email</Label>
          <Input type="email" name="email" id="EmailLogon" placeholder="Email" value="dfvfdv@dfvdfv.ru"/>
        </FormGroup>
        <FormGroup>
          <Label for="Password" hidden>Password</Label>
          <Input type="password" name="password" id="PasswordLogon" placeholder="Password" value="dfvfdv@dfvdfv.ru" />
        </FormGroup>
        <Centrer><Button color="success" onClick={() =>{this.onLogOn(document.getElementById('EmailLogon').value,
        document.getElementById('PasswordLogon').value)}}>Log on</Button></Centrer>
      </Form>
     </Wrap2>
  </Wrap1>
    );
  }
}

export default Logon