import React from 'react';
import styled from 'styled-components';
import Registration from './Registration';
import Logon from './Logon';

const Wraper=styled.div`
    width:100vw;
    height:100vh;
    background-color:#fff;
    z-index:100;
    position:relative;
`

class FrontPage extends React.Component {
    constructor(props){
      super(props);
      this.onSubmit=props.onSubmit;
      this.onLogOn=props.onLogOn;
    }
    render() {
        return (
           <Wraper><Registration onSubmit={this.onSubmit}></Registration><Logon onLogOn={this.onLogOn}></Logon></Wraper>
        )
      }
}
export default FrontPage