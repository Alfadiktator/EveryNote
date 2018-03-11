import React from 'react';
import styled from 'styled-components';
import Registration from './Registration';
import Logon from './Logon';

const Wraper=styled.div`
    width:100vw;
    height:100vh;
    background-color:#fcfcfc;
    z-index:100;
    position:absolute;
    overflow-y:scroll;
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
    height:calc(90vh - 100px);
    @media (max-width: 600px) {
        display:none;
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
        return (
           <Wraper><Logo></Logo><Image></Image><Registration onSubmit={this.onSubmit}></Registration><Logon onLogOn={this.onLogOn}></Logon></Wraper>
        )
      }
}
export default FrontPage