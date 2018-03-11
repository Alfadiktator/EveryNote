import React from 'react';
import styled from 'styled-components'
import {Button} from 'reactstrap';

const Wraper=styled.div`
    width:100%;
    height:100vh;
    padding-top:150px;
    padding-left:30px;
    display:grid;
    grid-gap:10px;
    grid-template-columns: 120px 256px 60px;
    grid-template-rows: 120px 100px;
    grid-template-areas:
    "color slider slider"
    "title title button";
    @media (max-width: 500px) {
        padding:10px;
        grid-template-columns:1fr 60px;
        grid-template-rows: 120px 120px 120px;
        grid-template-areas:
        "color color"
        "slider slider"
        "title  button";
    }
    @media (max-height: 500px) {
        padding:10px;
    }
`
const Color=styled.div`
    grid-area:color;
    margin-left:20px;
    margin-top:20px;
    width:80px;
    height:80px;
    background-color:rgb(50,50,50);
    border-radius:100%;
    @media (max-width: 500px) {
        justify-self:center;
    }
`

const Slide=styled.div`
    display:grid;
    grid-template-rows:1fr 1fr 1fr;
    justify-items:space-evenly;
    grid-area:slider;
    padding-top:20px;
`

const Input=styled.input`
    height:10px;
    background:${props=>props.color};
    outline: none;
    opacity: 0.7;
    cursor: pointer;
    appearance: none;
    ${Input}:hover{
        opacity: 1;
    }
    ${Input}::-webkit-slider-thumb{
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #000;
        cursor: pointer;
    }
`

const Title=styled.textarea`
    border:0;
    width:100%;
    outline:none;
    grid-area:title;
    rows:10;
    box-shadow: 0 2px 0 0 #d7d8db, 0 0 0 2px #e3e4e8;
`
const ButtonArea=styled.div`
    grid-area:button;
    align-self:end;
`

function change(e){
    let circle=document.getElementById("color_circle");
    let rgb=document.getElementsByClassName("rgb");
    circle.style.background=`rgb(${rgb[0].value},${rgb[1].value},${rgb[2].value})`
    
}

export default function(props){
    let {tags}=props;
    let {validateTag}=props;
    return(
        <Wraper>
            <Color id="color_circle"/>
            <Slide>
                <Input className="rgb" type="range" max="256" min="1"  color="red" onInput={change}/>
                <Input className="rgb" type="range" max="256" min="1"  color="green" onInput={change}/>
                <Input className="rgb" type="range" max="256" min="1"  color="blue" onInput={change}/>
            </Slide>
            <Title id="title" placeholder="Description..."/>
            <ButtonArea><Button padding="2px" grid-area="button" color="success" onClick={validateTag}>TODO</Button></ButtonArea>
        </Wraper>
    )
}
