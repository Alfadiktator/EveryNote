import React from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux';

const DropButton=styled.div`
    width:150px;
    font-size:20px;
    font-weight:500;
    vertical-align: middle;
    color:white;
    height:30px;
    padding-left:5px;
    padding-right:30px;
    display:grid;
    justify-content:center;
    aling-content:center;
    border:0;
    background-color:#28a745;
    border-radius:2px;
    background-size: 30px 30px;
    background-image: url("https://www.thrivingparish.org/wp-content/uploads/2018/01/white-down-arrow-png-2.png");
    background-repeat: no-repeat;
    background-position: right center;
`
const DropDownComponent=styled.div`
    display:grid;
    width:150px;
    height:auto;
    grid-template-rows:repeat(auto-fit,30px);
`
const DropItem=styled.li`
    width:100%;
    z-index:100;
    margin:0;
    border:1px solid grey;
    padding:5px;
    padding-right:30px;
    background-color:#fff;
    display:none;
    ${DropItem}:hover{
        background-color:#f5f5f5;
    }
    font-size:15px;
    background-size: 30px 30px;
    background-image: url("http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Places-folder-green-icon.png");
    background-repeat: no-repeat;
    background-position: right center;
`


export default class DropDown extends React.Component{
    constructor(props){
        super(props);
        this.arr=props.items;
        this.state = {
            dropdownOpen: false,
        }
        this.itemSelect=this.itemSelect.bind(this);
        this.drop=this.drop.bind(this);
    }
    itemSelect(e){
        e=e.currentTarget;
        let but = document.getElementById("folderdrop");
        if(e.id==='-'){
            but.innerHTML='Folders';
        }
        but.innerHTML=e.id;
        this.drop();
    }
    drop(){
        let elem = document.getElementById("folderdrop");
        let items=document.getElementsByClassName("folderitem");
        if(this.state.dropdownOpen){
            elem.classList.add("dropup");
            setTimeout(()=>{
                elem.style.backgroundColor="#28a745";
                elem.classList.remove("dropup");
            }, 100);
            for(let i=0;i<items.length;i++){
                items[i].style.display="none";
            }
        }
        else{
            elem.classList.add("dropdown");
            setTimeout(()=>{
                elem.style.backgroundColor="#155e26";
                elem.classList.remove("dropdown");
            }, 100);
            for(let i=0;i<items.length;i++){
                items[i].style.display="block";
            }
        }
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });       
    }
    render(){
        return(
            <DropDownComponent>
            <DropButton id="folderdrop" onClick={this.drop}>
                Folders
            </DropButton>
            <DropItem id="-" key="-" className="folderitem" onClick={this.itemSelect}>{"-"}</DropItem>
            {this.arr.map((e)=>{
                return <DropItem id={e} key={e} className="folderitem" onClick={this.itemSelect}>{e}</DropItem>
            })}
        </DropDownComponent>            
        );
    }
}
