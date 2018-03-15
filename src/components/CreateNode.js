import React from 'react';
import styled from 'styled-components'
import {Button} from 'reactstrap';
import './Styles/Animation.css';
import DropDown  from './Tools/DropDown';
import {connect} from 'react-redux';
import hash from 'object-hash';

const Wraper=styled.div`
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
        grid-template-rows:30px 150px 35px 100px 35px;
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
    height:100px;
    display:grid;
    grid-template-columns:repeat(auto-fit,20px);
    grid-gap:2px;
    grid-area:tags;
    overflow-y:auto;
    justify-content:center;
    align-content:center;
    padding:5px;
    margin-right:15px;
    @media (max-width: 500px) {
        margin-bottom:20px;
        width:auto;
    }
`

const Tag=styled.div`
    margin:0 2px;
    width:15px;
    height:15px;
    border-radius:50%;
    background-color: ${props=>props.color||'black'};
    background-size: 5px 5px;
    background-repeat: no-repeat;
    background-position: center center;
    z-index:100;
    justify-self:center;
    align-self:center;
`

class CreateNode extends React.Component{
    constructor(props){
        super(props);
        if(props.data){
            let {label,desc,tags,folder,date,name}=props.data;
            this.state={
                label,
                desc,
                tags,
                folder,
                date,
                name,
            }
        }
        else{
            this.state={
                label:"",
                desc:"",
                tags:[],
                folder:"",
                date:"",
                name:"",
            }
        }
        this.curtags=[];
        this.tagchoose = this.tagchoose.bind(this);
        this.createValidate=this.createValidate.bind(this);
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
    createValidate(e){
        let label= document.getElementById("label");
        let text= document.getElementById("text");
        if(!(label.value)){
            label.value="Labels can not be empty";
            label.style.border="2px solid red";
            label.style.color="red";
            setTimeout(()=>{
                label.value="";
                label.style.color="black";
                label.style.border="0";
                label.style.borderBottom="2px solid grey";
            },1000);
            return;
        }
        if(!(text.value)){
            text.value="Description can not be empty";
            text.style.border="2px solid red";
            text.style.color="red";
            setTimeout(()=>{
                text.style.color="black";
                text.value="";
                text.style.border="0";
            },1000);
            return;
        }
        let note={};
        note.label=label.value;
        note.desc=text.value;
        note.tags=this.curtags.slice(0);
        let but = document.getElementById("folderdrop");
        if(but.innerHTML==="Folders"){
            note.folder="";
        }
        else{
            note.folder=but.innerHTML;
        }
        note.date=new Date().toUTCString().match(/,.+\d\d:/)[0];
        note.date=note.date.substring(2,note.date.length-1);
        if(this.state.name){
            note.name=this.state.name;
            this.props.onEditNote(note,this.props.store.notes);
        }
        else{
            note.name=hash(note);
            this.props.onNewNote(note);
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
            <DropDown items={this.props.store.folders}></DropDown>
            <Button padding="5px" grid-area="button" color="success" onClick={this.createValidate}>TODO</Button>
        </Wraper>)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.data){
            let {label,desc,tags,folder,date,name}=nextProps.data;
            this.setState({
                label,
                desc,
                tags,
                folder,
                date,
                name,
            })
        }
    }
    componentWillUpdate(nextProps, nextState){
        let{label,desc,tags,folder,data,name}=nextState;
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
        while(this.curtags.length){
            elem=document.getElementById(this.curtags[0].text);
            event.currentTarget=elem;
            this.tagchoose(event);
        }
        if(tags){
            for(let i=0;i<tags.length;i++){
                elem=document.getElementById(tags[i].text);
                event.currentTarget=elem;
                this.tagchoose(event);
            }
        }
        let but = document.getElementById("folderdrop");
        but.innerHTML='Folders';
        if(folder){
            elem=document.getElementById(folder);
            but.innerHTML=elem.id;
        }
    }
    componentDidMount(){
        let{label,desc,tags,folder,data,name}=this.state;
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
            for(let i=0;i<tags.length;i++){
                elem=document.getElementById(tags[i].text);
                event.currentTarget=elem;
                this.tagchoose(event);
            }
        }
        if(folder){
            elem=document.getElementById(folder);
            let but = document.getElementById("folderdrop");
            but.innerHTML=elem.id;
        }
    }
}

export default connect(
    state =>({
        store:state,
      }),
      dispatch => ({
        onNewNote:(data)=>{
            const asyncSetData= ()=>{
              return (dispatch)=>{
                let xhr=new XMLHttpRequest();
                xhr.open('POST', '/api/notes/create', false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(`note=${JSON.stringify(data)}`);
                xhr.onload=()=>{
                  let datas=JSON.parse(xhr.responseText);
                  if(datas.success){
                    window.location.replace("#/user/Notes");
                    dispatch({type:'NOTE_CREATE',payload:data});
                  }
                };
                /*setTimeout(()=>{
                    window.location.replace("#/user/Notes");
                  dispatch({type:'NOTE_CREATE',payload:data});
                },200);*/
              }
            }
            dispatch(asyncSetData());
          },
        onEditNote:(data,arr)=>{
            console.log('this',this);
            const asyncSetData= ()=>{
              return (dispatch)=>{
                console.log('this',arr);
                let ind=arr.findIndex((e)=>e.name===data.name);
                let xhr=new XMLHttpRequest();
                xhr.open('POST', '/api/notes/edit', false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(`newNote=${JSON.stringify(data)}&index=${ind}`);
                xhr.onload=()=>{
                  let datas=JSON.parse(xhr.responseText);
                  if(datas.success){
                    dispatch({type:'EDIT',payload:{data,ind},});
                    window.location.replace("#/user/Notes");
                  }
                };
                /*setTimeout(()=>{
                  dispatch({type:'EDIT',payload:{data,ind},});
                  window.location.replace("#/user/Notes");
                },200);*/
              }
            }
            dispatch(asyncSetData());
          },
      }),
)(CreateNode)