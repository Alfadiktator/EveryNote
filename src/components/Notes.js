import React from 'react';
import styled from 'styled-components'
import GridBlock from './Tools/GridBlock';
import CreateNode from './CreateNode';
import {HashRouter as Router,Route,Switch,Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Wraper=styled.div`
    width:100%;
    height:100vh;
    display:grid;
    padding:0 10px;
    grid-template-columns: 350px auto;
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
    justify-content:center;
    grid-template-rows: 50px repeat(auto-fill,200px);
    grid-gap:20px;
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
    padding:20px;
    justify-content:start;
    align-content:center;
    font-size:20px;
    font-family: gotham, helvetica, arial, sans-serif;
    color:#878787;
    border-bottom: 1px solid #878787;
    margin-bottom:20px;
`

const WhiteSpace=styled.div`
    height:100px;
`

class Notes extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <Wraper>
            <GridPlace id="gridplace">
                <Label>Notes</Label>
                {this.props.store.notes && this.props.store.notes.map((elem,ind)=>{
                    console.log('elem',elem);
                    return <Link to={`/user/Notes/${elem.name}`}><GridBlock data={elem} ind={ind}/></Link>
                })}
                <WhiteSpace/>
            </GridPlace>
            <Router>
                <Route path="/user/Notes/:tab" render={(props) =>{
                        let {tab}=props.match.params;
                        let place=document.getElementById("gridplace");
                        if( place &&(window.innerWidth <= 500 || window.innerHeight <= 500)){
                                place=document.getElementById("gridplace");
                                place.style.display="none";
                        }
                        let elem=this.props.store.notes.find((elem)=>elem.name===tab);
                        return <CreateNode data={elem}/>;
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
        onCurChange:(data)=>{
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
                    dispatch({type:'UPDATE_FOCUS_NOTES',payload:data});
                },200);
              }
            }
            dispatch(asyncSetData());
          },
      }),
)(Notes)