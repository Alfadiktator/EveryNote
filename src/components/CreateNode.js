import React from 'react';
import styled from 'styled-components'
import {Button} from 'reactstrap';
import './Styles/Animation.css';
import DropDown  from './Tools/DropDown';
import {connect} from 'react-redux';

const Wraper=styled.div`
    width:100%;
    height:100vh;
    padding:30px;
    overflow-y:auto;
    display:grid;
    grid-template-rows: 30px 150px 35px;
    grid-template-columns: 200px auto 100px;
    grid-gap:10px;
    grid-template-areas:
    "label label label"
    "desc desc desc"
    "tags time button";
    @media (max-width: 500px) {
        overflow-y:auto;
        grid-template-rows:30px 150px 35px 70px 35px;
        grid-template-columns: auto;
        grid-template-areas:
        "label"
        "desc"
        "time"
        "tags"
        "button";
    }
    @media (min-width: 1300px) {
        padding-right:calc(100% - 1100px);
    }
    @media (max-height: 500px) {
        overflow-x:auto;
        padding:10px;
    }
`
const Label=styled.input`
    border:0;
    border-bottom:2px solid grey;
    width:100%;
    outline:none;
    grid-area:label;
`
const Description=styled.textarea`
    border:0;
    width:100%;
    outline:none;
    grid-area:desc;
    rows:10;
`

const Tagarr=styled.div`
    box-shadow: 0 2px 0 0 #d7d8db, 0 0 0 2px #e3e4e8;
    width:180px;
    height:30px;
    display:grid;
    grid-area:tags;
    justify-content:center;
    overflow-y:hidden;
    grid-template-columns:repeat(auto-fit,20px);
    grid-gap:1px;
    padding:5px;
    margin-right:15px;
    @media (max-width: 500px) {
        height:50px;
        margin-bottom:20px;
        width:auto;
    }
`

const Tag=styled.li`
    margin:0;
    border-radius:5px;
    width:15px;
    height:15px;
    border-radius:50%;
    background-color: ${props=>props.color||'black'};
    background-size: 5px 5px;
    background-repeat: no-repeat;
    background-position: center center;
    z-index:100;
    align-self:center;
    justify-self:center;
`

class CreateNode extends React.Component{
    constructor(props){
        super(props);
        this.curtags=[];
        this.curfolder={};
        this.tagchoose = this.tagchoose.bind(this);
    }
    tagchoose(e){
            let element = document.getElementById(e.currentTarget.id);
            let ind=this.curtags.findIndex((elem)=>elem.text===element.id);
            let i=this.props.store.tags.findIndex((elem)=>elem.text===element.id);
            if(ind===-1){
                this.curtags.push(this.props.store.tags[i]);
                element.classList.add("enableTag");
                element.style.backgroundImage="url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Icosagon.svg/178px-Icosagon.svg.png)";
                setTimeout(()=>{element.classList.remove("enableTag")},100);
            }
            else{
                this.curtags.splice(ind,1);
                element.classList.add("unenableTag");
                element.style.backgroundImage="";
                setTimeout(()=>{element.classList.remove("unenableTag")},100);
            }
    }

    render(){
        return(
        <Wraper>
            <Label id="label" placeholder="Label..."/>
            <Description id="text" placeholder="Description..."/>
                <Tagarr>
                    {this.props.store.tags.map(({color,text})=>{
                        return <Tag id={text} color={color} title={text} onClick={this.tagchoose}/>;
                    })}
                </Tagarr>
            <DropDown items={this.props.store.folders} folder={this.curfolder}></DropDown>
            <Button padding="5px" grid-area="button" color="success" onClick={() =>{
                
            }}>TODO</Button>
        </Wraper>)
    }
    componentWillUpdate(nextProps, nextState){
        let{label,desc,tags,folder,data,name}=nextProps.store.note;
        let elem;
        let event={};
        elem=document.getElementById("label");
        elem.value="";
        if(label){
            elem.value=label;
        }
        elem=document.getElementById("text");
        elem.value="";
        if(desc){
            elem.value=desc;
        }
        //console.log('this.curtags',this.curtags);
        while(this.curtags.length){
            elem=document.getElementById(this.curtags[0].text);
            event.currentTarget=elem;
            this.tagchoose(event);
        }
        if(tags){
            //console.log('tags',tags);
            for(let i=0;i<tags.length;i++){
                elem=document.getElementById(tags[i].text);
                event.currentTarget=elem;
                this.tagchoose(event);
            }
        }
        let but = document.getElementById("folderdrop");
        but.innerHTML='Folders';
        this.curfolder.name="";
        if(folder){
            elem=document.getElementById(folder);
            but.innerHTML=elem.id;
            this.curfolder.name=elem.id;
        }  
    }
    componentDidMount(){
        let{label,desc,tags,folder,data,name}=this.props.store.note;
        let elem;
        let event={};
        if(label){
            elem=document.getElementById("label");
            elem.value=label;
        }
        if(desc){
            elem=document.getElementById("text");
            elem.value=desc;
        }
        if(tags){
            console.log('tags',tags);
            for(let i=0;i<tags.length;i++){
                elem=document.getElementById(tags[i].color);
                event.currentTarget=elem;
                this.tagchoose(event);
            }
        }
        if(folder){
            elem=document.getElementById(folder);
            let but = document.getElementById("folderdrop");
            but.innerHTML=elem.id;
            this.curfolder.name=elem.id;
        }
    }
    componentWillUnmount(){
        this.props.onCurChange({});
    }
}

export default connect(
    state =>({
        store:state
      }),
      dispatch => ({
        onCurChange:(data)=>{
            dispatch({type:'UPDATE_FOCUS_NOTES',payload:data});
        }
      }),
)(CreateNode)