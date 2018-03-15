import React from 'react';
import styled from 'styled-components';
import GridBlock from './Tools/GridBlock';
import NewTag from './Tools/NewTag';
import './Styles/Animation.css';
import {HashRouter as Router,Route,Switch,Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';

const Wraper=styled.div`
    width:100%;
    height:100vh;
    display:grid;
    padding:0 3px;
    grid-template-columns: 250px auto;
    grid-template-areas:
    "grids .";
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
        grid-template-areas:
        "grids";
    }
    @media (max-height: 500px) {
        grid-template-columns: 1fr;
        grid-template-areas:
        "grids";
    }
`

const GridPlace=styled.div`
    border-right:2px solid #878787;
    height:100vh;
    display:grid;
    overflow-y:auto;
    padding:5px;
    justify-content:center;
    grid-template-rows: 50px repeat(auto-fill,30px);
    grid-template-columns:1fr;
    grid-gap:5px;
    grid-area:grids;
    @media (max-width: 500px) {
        border-right:0;
    }
    @media (max-height: 500px) {
        border-right:0;
    }
`

const Label=styled.div`
    width:100%;
    display:grid;
    justify-content:center;
    padding:0 5px;
    grid-template-columns: 130px 24px;
    border-bottom: 1px solid #878787;
    margin-bottom:20px;
`
const LabelText=styled.div`
    font-size:20px;
    font-family: gotham, helvetica, arial, sans-serif;
    color:#878787;
`

const WhiteSpace=styled.div`
    height:100px;
`

const FolderImg=styled.img`
    width:30px;
    height:30px;
    content: url("http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Places-folder-green-icon.png");
`
const Grid=styled.div`
    width:100%;
    box-shadow: 0 2px 0 0 #d7d8db, 0 0 0 2px #e3e4e8;
    display:grid;
    padding:2px;
    align-content:center;
    grid-template-columns:1fr 30px;
    ${Grid}:hover{
        background-color:#2dbe60;
    }
`

const Text=styled.div`
    overflow-x:auto;
    font-size:15px;
    font-weight:600;
    display:grid;
    justify-content:center;
    align-content:center;
    font-family: gotham, helvetica, arial, sans-serif;
    color:#272727;
    ${Grid}:hover &{
        color:#fff;
        background-color:#2dbe60;
    }
`

const MatchGrid=styled.div`
    width:100%;
    display:grid;
    overflow-y:auto;
    padding:10px;
    grid-template-columns:repeat(auto-fit,300px);
    grid-template-rows:repeat(auto-fit,200px);
    grid-gap:20px;
`

const NewFolderButton=styled.div`
    margin-top:3px;
    width:24px;
    height:24px;
    background-size:cover;
    background-image:url(http://www.newdesignfile.com/postpic/2012/04/create-new-folder-icon_290140.png);
`
const NewFolderBlock=styled.div`
    padding:5px;
    height:100px;
    width:200px;
    display:none;
    justify-content:center;
    box-shadow: 0 2px 0 0 #d7d8db, 0 0 0 2px #e3e4e8;
    grid-template-rows:40px 50px;
    grid-gap:5px;
    z-index:1000;
    background-color:#fff;
`

const Input=styled.input`
    outline:none;
    border:0;
    border-bottom:2px solid grey;
`

const ButtonArea=styled.div`
    justify-self:end;
    aling-self:center;
`
class Tags extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dropfolder:false,
        }
        let {tags,notes,folders}=this.props.store;
        this.tags=tags;
        this.notes=notes;
        this.folders=folders;
        this.createFolder=this.createFolder.bind(this);
    }
    createFolder(){
        let block=document.getElementById("newfolder");
        if(this.state.dropfolder){
            block.style.display="none";
        }
        else{
            block.style.display="grid";
        }
        this.setState({
            dropfolder:!this.state.dropfolder,
        })
     }
    render(){
        return(<Wraper>
            <GridPlace id="gridplace">
                <Label><LabelText>Folders</LabelText><NewFolderButton title="Create Folder" onClick={this.createFolder}/>
                <NewFolderBlock id="newfolder">
                    <Input id="label" placeholder="Name..." ref={(input) => { this.name = input; }}/>
                    <ButtonArea><Button padding="2px" grid-area="button" color="success" onClick={()=>{return console.log(1)}}>Create</Button></ButtonArea>
                </NewFolderBlock>
                </Label>
                {this.folders.map((elem)=>{
                    return <Link to={`/user/Folder/${elem}`}><Grid><Text>{elem}</Text><FolderImg/></Grid></Link>;
                })}
                <WhiteSpace/>
            </GridPlace>
            <Router>
            <Route path="/user/Folder/:tab" render={(props) =>{
                    console.log('this',this);
                    let {tab}=props.match.params;
                    let place=document.getElementById("gridplace");
                    if( place &&(window.innerWidth <= 500 || window.innerHeight <= 500)){
                            place.style.display="none";
                    }
                    let arr=this.notes.filter((elem)=>elem.folder===tab);
                    var matchgrid = document.getElementById("matchgrid");
                    return (<MatchGrid id="matchgrid">
                                {arr.map((elem,ind)=>{
                                    return (<Link to={`/user/Notes/${elem.name}`}><GridBlock data={elem} ind={ind}/></Link>);
                                })}
                            </MatchGrid>)
                    }}/>
            </Router>
        </Wraper>)        
    }
}

export default connect(
    state =>({
        store:state,
      }),
      dispatch => ({
        onCreate:(data)=>{
            const asyncGetData= ()=>{
              return (dispatch)=>{
                let xhr=new XMLHttpRequest();
                xhr.open('POST', '/api/folders/create', false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onload=()=>{
                  let datas=JSON.parse(xhr.responseText);
                  if(datas.success){
                    const {userProfileModel}=datas.extras;
                    dispatch({type:'GET_USER_INFO',payload:userProfileModel});
                  }
                };
                xhr.send(`folder=${data}`);
                /*setTimeout(()=>{
                  let data={};
                  data=test;
                  dispatch({type:'GET_USER_INFO',payload:{email:"qwerty",firstname:"rew",secondname:"das"}});
                  dispatch({type:'UPDATE',payload:data});
                  window.location.replace("#/user/Notes");
                },100);*/
              }
            }
            dispatch(asyncGetData());
          },
          onDelete:(data)=>{
            const asyncGetData= ()=>{
              return (dispatch)=>{
                let xhr=new XMLHttpRequest();
                xhr.open('POST', '/api/folders/create', false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onload=()=>{
                  let datas=JSON.parse(xhr.responseText);
                  if(datas.success){
                    const {userProfileModel}=datas.extras;
                    dispatch({type:'GET_USER_INFO',payload:userProfileModel});
                  }
                };
                xhr.send(`folder=${data}`);
                /*setTimeout(()=>{
                  let data={};
                  data=test;
                  dispatch({type:'GET_USER_INFO',payload:{email:"qwerty",firstname:"rew",secondname:"das"}});
                  dispatch({type:'UPDATE',payload:data});
                  window.location.replace("#/user/Notes");
                },100);*/
              }
            }
            dispatch(asyncGetData());
          },
      }),
)(Tags)