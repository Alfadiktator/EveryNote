import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components'


const Wrap1=styled.div`
height:40vh;
width:15vw;
@media (min-width: 300px) {
    width:300px;
}
border:2px solid black;
left:70vw;
top:40vh;
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
padding-bottom:2%;
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
  background-color:rgb(0, 121, 30);
  margin-bottom:2vh;
  color:#fff;
  font-size:2em;
  font-weight:bold;
  border-radius:3px;
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
      <Form row>
      <FormGroup>
          <Label for="Firstname" hidden>First name</Label>
          <Input type="text" name="First name" id="1Name" placeholder="First name" value="dfvfdv@dfvdfv.ru"/>
        </FormGroup>
        <FormGroup>
          <Label for="Lastname" hidden>Last name</Label>
          <Input type="text" name="Second name" id="2Name" placeholder="Second Name" value="dfvfdv@dfvdfv.ru"/>
        </FormGroup>
        <FormGroup>
          <Label for="Email" hidden>Email</Label>
          <Input type="email" name="email" id="Email" placeholder="Email" value="dfvfdv@dfvdfv.ru"/>
        </FormGroup>
        <FormGroup>
          <Label for="Password" hidden>Password</Label>
          <Input type="password" name="password" id="Password" placeholder="Password" value="dfvfdv@dfvdfv.ru" />
        </FormGroup>
        <FormGroup>
          <Label for="Passwordconfirm" hidden>Password Confirm</Label>
          <Input type="password" name="passwordconfirm" id="Passwordconfirm" placeholder="Password Confirm" value="dfvfdv@dfvdfv.ru"/>
        </FormGroup>
        <Centrer><Button color="success" onClick={() =>{this.onSubmit(document.getElementById('1Name').value,
        document.getElementById('2Name').value,document.getElementById('Email').value,document.getElementById('Password').value,
        document.getElementById('Passwordconfirm').value)}}>Submit</Button></Centrer>
      </Form>
     </Wrap2>
  </Wrap1>
    );
  }
}

export default Registration