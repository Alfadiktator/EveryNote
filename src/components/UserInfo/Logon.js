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
    return (
    <Wrap1>
        <Wrap2>
      <Form row>
        <FormGroup>
          <Label for="Email" hidden>Email</Label>
          <Input type="email" name="email" id="EmailLogon" placeholder="king@example.com"/>
        </FormGroup>
        <FormGroup>
          <Label for="Password" hidden>Password</Label>
          <Input type="password" name="password" id="PasswordLogon" placeholder="Password..."/>
        </FormGroup>
        <Centrer><Button color="success" onClick={() =>{
          let em=document.getElementById('EmailLogon').value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
          let pas=document.getElementById('PasswordLogon').value;
          if(em && pas){
            this.onLogOn({
              email:em[0],
              password:pas})
          }
          else{
            if(!em){
              let el=document.getElementById('EmailLogon');
              let temp=el.value;
              el.value="Please,enter correct email";
              el.style.color="red";
              setTimeout(()=>{
                  el.value=temp;
                  el.style.color="black";
              },1000);
            }
            else{
              let el=document.getElementById('PasswordLogon');
              el.value="Please,enter password";
              el.style.color="red";
              setTimeout(()=>{
                  el.value="";
                  el.style.color="black";
              },1000);
            }
          }
        }}>Log on</Button></Centrer>
      </Form>
     </Wrap2>
  </Wrap1>
    );
  }
  componentDidMount(){
    document.getElementById("EmailLogon").value="skateray17@gmail.com";
    document.getElementById("PasswordLogon").value="1234567";
  }
}

export default Logon