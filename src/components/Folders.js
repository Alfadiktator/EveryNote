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
    justify-content:center;
    grid-template-columns:1fr 30px;
    ${Grid}:hover{
        grid-template-columns:30px 1fr 30px;
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
const Delete=styled.img`
    width:24px;
    height:24px;
    content:url("https://www.evernote.com/redesign/global/js/focus/img/delete_white_24x24.png");
    display:none;
    ${Grid}:hover &{
        display:block;
    }
    ${Delete}:hover{
        content:url("https://www.evernote.com/redesign/global/js/focus/img/delete_solid_white_24x24.png");
    }
`

class Folder extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dropfolder:false,
        }
        this.dropFolderCreater=this.dropFolderCreater.bind(this);
        this.onDel=this.onDel.bind(this);
        this.createFolder=this.createFolder.bind(this);
    }

    onDel(e){
        e.preventDefault();
        this.props.onDelete(e.currentTarget.index);
    }

    dropFolderCreater(){
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
    createFolder(e){
        e.preventDefault();
        let label=document.getElementById('label');
        this.dropFolderCreater();
        this.props.onCreate(label.value);
        label.value="";
     }
    render(){
        return(<Wraper>
            <GridPlace id="gridplace">
                <Label><LabelText>Folders</LabelText><NewFolderButton title="Create Folder" onClick={this.dropFolderCreater}/>
                <NewFolderBlock id="newfolder">
                    <Input id="label" placeholder="Name..."/>
                    <ButtonArea><Button padding="2px" color="success" onClick={this.createFolder}>Create</Button></ButtonArea>
                </NewFolderBlock>
                </Label>
                {this.props.store.folders.map((elem,ind)=>{
                    return <Link to={`/user/Folders/${elem}`}><Grid><Delete title='delete' onClick={this.onDel} index={ind}/><Text>{elem}</Text><FolderImg/></Grid></Link>;
                })}
                <WhiteSpace/>
            </GridPlace>
            <Router>
            <Route path="/user/Folders/:tab" render={(props) =>{
                    console.log('this',this);
                    let {tab}=props.match.params;
                    let place=document.getElementById("gridplace");
                    if( place &&(window.innerWidth <= 500 || window.innerHeight <= 500)){
                            place.style.display="none";
                    }
                    let arr=this.props.store.notes.filter((elem)=>elem.folder===tab);
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
        store:state
      }),
      dispatch => ({
        onDelete:(data)=>{
            const asyncSetData= ()=>{
              return (dispatch)=>{
                let xhr=new XMLHttpRequest();
                xhr.open('POST', '/api/folders/delete', false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onload=()=>{
                  let datas=JSON.parse(xhr.responseText);
                  if(datas.success){
                    dispatch({type:'FOLDER_DELETE',payload:data});
                    window.location.replace("#/user/Folders");
                  }
                };
                xhr.send(`index=${data}`);
                /*setTimeout(()=>{
                    dispatch({type:'FOLDER_DELETE',payload:data});
                    window.location.replace("#/user/Folders");
                },200);*/
              }
            }
            dispatch(asyncSetData());
          },
          onCreate:(data)=>{
            const asyncSetData= ()=>{
              return (dispatch)=>{
                let xhr=new XMLHttpRequest();
                xhr.open('POST', '/api/folders/create', false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onload=()=>{
                  let datas=JSON.parse(xhr.responseText);
                  if(datas.success){
                    dispatch({type:'FOLDER_CREATE',payload:data});
                    window.location.replace("#/user/Folders");
                  }
                };
                xhr.send(`folder=${data}`);
                /*setTimeout(()=>{
                    dispatch({type:'FOLDER_CREATE',payload:data});
                    window.location.replace("#/user/Folders");
                },200);*/
              }
            }
            dispatch(asyncSetData());
          }
      }),
)(Folder)