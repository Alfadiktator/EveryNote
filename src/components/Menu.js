import React from 'react';
import styled from 'styled-components'
import ButtonMenu from './ButtonMenu'

const Wraper=styled.div`
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    display:inline-block;
    background-color:blue;
    display: flex;
    z-index:40
`
const Content=styled.div`
    height:100%;
    width:100%;
    display:inline-block;
    background-color:papayawhip;
`


class Menu extends React.Component {
    constructor(props){
      super(props);
      
    }
    render() {
        return (
            <Wraper>
                <ButtonMenu></ButtonMenu><Content id="contentField"></Content>
            </Wraper>
        )
      }
}

export default Menu