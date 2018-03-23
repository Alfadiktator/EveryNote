import React from 'react';
import styled from 'styled-components'

const Li=styled.li`
  width:36px;
  height:36px;
  background-image:url(${props=>props.src});
  ${Li}:hover{
    background-image:url(${props=>props.hover});
  }
`

export default  function Button(props){
        return (
            <Li key={props.content} title={props.content} src={props.imageSource} hover={props.imageHover}/>
        )
}
