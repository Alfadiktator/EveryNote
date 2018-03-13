import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

const Wraper=styled.div`
    width:300px;
    height:200px;
    display:grid;
    grid-template-columns:1fr;
    grid-template-rows: 40px 120px 40px;
    margin-bottom:10px;
`

const Label=styled.div`
    width:100%;
    box-shadow: 0 2px 0 0 #d7d8db, 0 0 0 2px #e3e4e8;
    padding:0 10px;
    display:grid;
    align-items:center;
    grid-template-columns:230px 30px 30px;
    ${Wraper}:hover &{
        background-color:#2dbe60;
    }
`
const Description=styled.textarea`
    width:100%;
    overflow-y:hidden;
    outline:none;
    box-shadow: 0 2px 0 0 #d7d8db, 0 0 0 2px #e3e4e8;
    font-weight:300;
    font-size:15px;
    padding:10px;
    padding-bottom:30px;
    ${Wraper}:hover &{
        background-color:#2dbe60;
        color:#fff;
    }
`
const TagsArea=styled.div`
    width:100%;
    display:grid;
    padding-left:5px;
    grid-template-columns:repeat(auto-fit,8px);
`
const Tag=styled.div`
    border-radius:100%;
    width:15px;
    height:15px;
    background-color: ${props=>props.color||'black'};
    z-index:100;
`
const Labelblock=styled.span`
    margin-right:20px;
    font-weight:700;
    font-size:20px;
    overflow:hidden;
    color:black;
    ${Wraper}:hover &{
        color:#fff;
    }
`
const Report=styled.img`
    width:24px;
    height:24px;
    content:url("https://www.evernote.com/redesign/global/js/focus/img/reminder_white_24x24.png");
    display:none;
    ${Wraper}:hover &{
        display:block;
    }
    ${Report}:hover{
        content:url("https://www.evernote.com/redesign/global/js/focus/img/reminder_solid_white_24x24.png");
    }
`
const Delete=styled.img`
    width:24px;
    height:24px;
    content:url("https://www.evernote.com/redesign/global/js/focus/img/delete_white_24x24.png");
    display:none;
    ${Wraper}:hover &{
        display:block;
    }
    ${Delete}:hover{
        content:url("https://www.evernote.com/redesign/global/js/focus/img/delete_solid_white_24x24.png");
    }
`
const BottomInfo=styled.div`
    display:grid;
    align-content:center;
    grid-template-columns:150px 150px;
    box-shadow: 0 2px 0 0 #d7d8db, 0 0 0 2px #e3e4e8;
    ${Wraper}:hover &{
        background-color:#2dbe60;
        color:#fff;
    }
`

const DateBlock=styled.div`
    font-size:13px;
    font-family: gotham, helvetica, arial, sans-serif;
    color:#878787;
    ${Wraper}:hover &{
        color:#fff;
    }
`

/*export default class GridBlock extends React.Component{
    constructor(props){
        super(props);
        
        if(props && props.data){
            for(let prop in data){
                if(props.data.hasOwnProperty(prop)){
                    data[prop]=props.data[prop];
                }
            }
        }
        
        let {label,desc,tags,folder}=data;
        data.label=label;
        data.desc=desc;
        data.arrtags=tags;
        data.folder=folder;
        data.date=data.date;
        data.name=data.name;
        data.state={
            
        }
    }
    render(){
        let time=data.date.toUTCString().match(/,.+\d\d:/)[0];
        return(
            <Wraper>
                <Label><Labelblock>{data.label}</Labelblock><Report/><Delete/></Label>
                <Description>{data.desc}</Description>
                <BottomInfo>
                <TagsArea>
                    {data.arrtags.map(({color,text})=>{
                        return <Tag color={color} title={text}></Tag>;
                    })}
                </TagsArea>
                <DateBlock>{time.substring(2,time.length-1)}</DateBlock>
                </BottomInfo>
            </Wraper>
        );
    }
}*/

function GridBlock(props){
        let {data}=props;
        return(
            <Wraper>
                <Label><Labelblock>{data.label}</Labelblock><Report onClick={(e)=>{
                    e.preventDefault();
                    this.props.onReport(data);
                }}/><Delete onClick={(e)=>{
                    e.preventDefault();
                    this.props.onDelete(data);
                }}/></Label>
                <Description value={data.desc}/>
                <BottomInfo>
                <TagsArea>
                    {data.tags.map(({color,text})=>{
                        return <Tag color={color} title={text}></Tag>;
                    })}
                </TagsArea>
                <DateBlock>{data.date}</DateBlock>
                </BottomInfo>
            </Wraper>
        );
}

export default connect(
    state =>({
        store:state,
      }),
      dispatch => ({
        onDelete:(data)=>{
            const asyncSetData= ()=>{
              return (dispatch)=>{
              /*let xhr=new XMLHttpRequest();
                xhr.open('POST', '/api/account/logon', false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(`email=${info.email}&password=${info.password}`);
                xhr.onload=()=>{
                  let datas=JSON.parse(xhr.responseText);
                  if(datas.success){
                    const {userProfileModel,data}=datas.extras;
                    const {notes,tags,folders}=data;
                    dispatch({type:'GET_USER_INFO',payload:userProfileModel});
                    dispatch({type:'UPDATE',payload:{notes,tags,folders}});
                    window.location.replace("#/user/Notes");
                  }
                };*/
                setTimeout(()=>{
                    dispatch({type:'DELETE_NOTE',payload:data});
                },200);
              }
            }
            dispatch(asyncSetData());
          },
        onReport:(data)=>{
            const asyncSetData= ()=>{
              return (dispatch)=>{
              /*let xhr=new XMLHttpRequest();
                xhr.open('POST', '/api/account/logon', false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(`email=${info.email}&password=${info.password}`);
                xhr.onload=()=>{
                  let datas=JSON.parse(xhr.responseText);
                  if(datas.success){
                    const {userProfileModel,data}=datas.extras;
                    const {notes,tags,folders}=data;
                    dispatch({type:'GET_USER_INFO',payload:userProfileModel});
                    dispatch({type:'UPDATE',payload:{notes,tags,folders}});
                    window.location.replace("#/user/Notes");
                  }
                };*/
                setTimeout(()=>{
                    dispatch({type:'REPORT_NOTE',payload:data});
                },200);
              }
            }
            dispatch(asyncSetData());
          },
      }),
)(GridBlock)