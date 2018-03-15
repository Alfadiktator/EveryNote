import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components'
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
  height:350px;
  top:300px;
  margin-bottom:10px;
}
box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
left:calc(95% - 400px);
top:40vh;
display: flex;
align-items: center;
justify-content: center;
background-color:#fff;
z-index:50;
`

const Wrap2=styled.div`
height:100%;
width:100%;
padding:5%;
@media (max-height: 700px) {
  height:100%;
  width:100%;
  padding:5%;
  padding-top:25px;
}
`
const Logo=styled.div`
width:20%;
height:20%;
background-size: contain;
background-image: url("https://orig00.deviantart.net/445d/f/2011/189/b/d/mouse_logo_by_rmballou-d3lgdpw.jpg");
background-repeat: no-repeat;
margin:auto;
`
const Centrer=styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`
const LabelReg=styled.div`
  margin-bottom:2vh;
  color:#000;
  font-size:30px;
  font-weight:500;
  border-radius:3px;
  @media (max-height: 700px) {
    display:none;
  }
  `


class Registration extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit=props.onSubmit;
  }
  render() {
    return (
    <Wrap1>
        <Wrap2> 
        <LabelReg>First time with us?</LabelReg>  
      <Form row onSubmit>
      <FormGroup>
          <Label for="Firstname" hidden>First name</Label>
          <Input type="text" name="First name" id="1Name" placeholder="First name" />
        </FormGroup>
        <FormGroup>
          <Label for="Lastname" hidden>Last name</Label>
          <Input height="100px" type="text" name="Second name" id="2Name" placeholder="Second Name" />
        </FormGroup>
        <FormGroup>
          <Label for="Email" hidden>Email</Label>
          <Input type="email" name="email" id="Email" placeholder="Email"  />
        </FormGroup>
        <FormGroup>
          <Label for="Password" hidden>Password</Label>
          <Input type="password" name="password" id="Password" placeholder="Password"   />
        </FormGroup>
        <FormGroup>
          <Label for="Passwordconfirm" hidden>Password Confirm</Label>
          <Input type="password" name="passwordconfirm" id="Passwordconfirm" placeholder="Password Confirm"  />
        </FormGroup>
        <Centrer><Input type='submit' color="success" onClick={() =>{this.onSubmit(document.getElementById('1Name').value,
        document.getElementById('2Name').value,document.getElementById('Email').value,document.getElementById('Password').value,
        document.getElementById('Passwordconfirm').value)}} value='Submit'/></Centrer>
      </Form>
     </Wrap2>
  </Wrap1>
    );
  }
}

export default Registration