import React from 'react';
import styled from 'styled-components'
import GridBlock from './Tools/GridBlock';
import NewTag from './Tools/NewTag';
import './Styles/Animation.css';
import {HashRouter as Router,Route,Switch,Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Wraper=styled.div`
    width:100%;
    height:100vh;
    display:grid;
    padding:0 3px;
    grid-template-columns: 200px auto;
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
    grid-template-rows: 50px repeat(auto-fill,28px);
    grid-template-columns:1fr;
    grid-gap:3px;
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

const Tag=styled.div`
    border-radius:100%;
    width:15px;
    height:15px;
    margin:auto;
    background-color: ${props=>props.color||'black'};
    z-index:100;
`
const Grid=styled.div`
    width:100%;
    box-shadow: 0 2px 0 0 #d7d8db, 0 0 0 2px #e3e4e8;
    display:grid;
    padding:2px;
    align-content:center;
    grid-template-columns:30px 1fr;
    ${Grid}:hover{
        background-color:#2dbe60;
    }
`

const Text=styled.div`
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

const NewTagButton=styled.div`
    margin-top:3px;
    width:24px;
    height:24px;
    background-image:url(https://www.evernote.com/redesign/global/js/focus/img/new_tag_grey.png);
`

class Tags extends React.Component{
    constructor(props){
        super(props);
        let {tags,notes,folders}=this.props.store;
        this.tags=tags;
        this.notes=notes;
        this.folders=folders;
    }
    render(){
        return(<Wraper>
                    <GridPlace id="gridplace">
                        <Label><LabelText>Tags</LabelText><Link to={`/user/Tags/NewTag`}><NewTagButton title="Create Tag"/></Link></Label>
                        {this.tags.map((elem)=>{
                            return <Link to={`/user/Tags/${elem.text}`}><Grid><Tag color={elem.color}/><Text>{elem.text}</Text></Grid></Link>;
                        })}
                        <WhiteSpace/>
                    </GridPlace>
                    <Router>
                        <Route path="/user/Tags/:tab" render={(props) =>{
                                let {tab}=props.match.params;
                                let place=document.getElementById("gridplace");
                                if( place &&(window.innerWidth <= 500 || window.innerHeight <= 500)){
                                        place.style.display="none";
                                }
                                if(tab==="NewTag"){
                                    return(<NewTag tags={this.tags}/>)
                                }
                                else{
                                    let arr=this.notes.filter((elem)=>elem.tags.findIndex((e)=>e.text===tab)!==-1);
                                    var matchgrid = document.getElementById("matchgrid");
                                return (<MatchGrid id="matchgrid">
                                    {arr.map(elem=>{
                                        return (<Link to={`/user/Notes/${elem.name}`}><GridBlock data={elem}/></Link>);
                                    })}
                                    </MatchGrid>)
                                }}}/>
                    </Router>
                </Wraper>)        
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
)(Tags)