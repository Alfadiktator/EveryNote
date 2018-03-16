import React from 'react';
import styled from 'styled-components';
import Registration from './Registration';
import Logon from './Logon';
import {connect} from 'react-redux';

const Wraper=styled.div`
    width:100vw;
    height:100vh;
    background-color:#fcfcfc;
    z-index:100;
    padding-left:30px;
    position:absolute;
    overflow-y:auto;
`
const Logo=styled.div`
    width:100%;
    height:100px;
    background-image:url("https://orig00.deviantart.net/445d/f/2011/189/b/d/mouse_logo_by_rmballou-d3lgdpw.jpg");
    background-repeat: no-repeat;
    background-size:100px 100px;
    background-position:center;
    left:0;
    top:0;
`

const Image=styled.div`
    width:calc(90vw - 400px);
    height:calc(90vw - 400px);
    @media (max-width: 600px) {
        display:none;
    }
    @media (min-width: 1350px) {
        width:800px;
        height:800px;
    }
    top:calc(5% + 100px);
    background-color:#C0FAE3;
`

class FrontPage extends React.Component {
    constructor(props){
      super(props);
      this.onSubmit=props.onSubmit;
      this.onLogOn=props.onLogOn;
    }
    render() {
        if(this.props.store.user && this.props.store.user.email){
            window.location.replace('#/user/Notes');
        }
        return (
           <Wraper><Logo/><Image/><Registration onSubmit={this.onSubmit}></Registration><Logon onLogOn={this.onLogOn}></Logon></Wraper>
        )
      }
}
export default connect(
    state =>({
      store:state,
    }),
    dispatch => ({
    })
)(FrontPage);