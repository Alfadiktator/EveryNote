import React from 'react';
import styled from 'styled-components'
import './Button.css';



class Button extends React.Component {
    constructor(props){
      super(props);
      this.ButtonBack=styled.a`
      background-image:url(${props.imageSource});
      `
      this.content=props.content;
    }
    render() {
        return (
            <li><this.ButtonBack className="round green"><span class="round">{this.content}</span></this.ButtonBack></li>
        )
      }
}
export default Button