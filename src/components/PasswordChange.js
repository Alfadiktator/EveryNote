import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components'

const Wrap1=styled.div`
height:100%;
width:100%;
position: absolute;
display: flex;
align-items: center;
justify-content: center;
background-color:#fff;
z-index:50;
border: 1px solid black;
`

const Wrap2=styled.div`
margin-top:-5%;
height:35vh;
width:15vw;
@media (min-width: 300px) {
  width:300px;
}
`

const Logo=styled.div`
width:20vh;
height:20vh;
background-size: contain;
background-image: url("https://vignette.wikia.nocookie.net/fallout/images/3/3f/Icon_Detective_Case_Files.png/revision/latest?cb=20151228140900");
background-repeat: no-repeat;
margin:auto;
`

const Centrer=styled.div`
  display: flex;
  align-items: center;
  justify-content: center
`

class PasswordChange extends React.Component {
    constructor(props){
      super(props);
      this.onSubmit=this.props.OnSubmit;
      this.onChangePassword=this.props.OnChangePassword;
    }
    render() {
      return (
      <Wrap1>
          <Wrap2> 
          <Logo></Logo>     
        <Form row>
        <FormGroup>
            <Label for="NewPassword" hidden>New Password</Label>
            <Input type="text" name="NewPassword" id="NewPassword" placeholder="New Password"/>
          </FormGroup>
          <FormGroup>
            <Label for="Password" hidden>Password</Label>
            <Input type="password" name="password" id="Password" placeholder="Password" />
          </FormGroup>
          <FormGroup>
            <Label for="Passwordconfirm" hidden>Confirm password </Label>
            <Input type="password" name="passwordconfirm" id="Passwordconfirm" placeholder="Confirm password"/>
          </FormGroup>
          <Centrer><Button color="success" onClick={() =>{this.onChangePassword(document.getElementById('NewPassword'),document.getElementById('Password').value,
          document.getElementById('Passwordconfirm').value)}}>Change</Button></Centrer>
        </Form>
       </Wrap2>
    </Wrap1>
      );
    }
  }
  
  export default PasswordChange