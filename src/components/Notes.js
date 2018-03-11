import React from 'react';
import styled from 'styled-components'
import GridBlock from './Tools/GridBlock';
import CreateNode from './CreateNode';
import {HashRouter as Router,Route,Switch,Link} from 'react-router-dom';

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

export default class Notes extends React.Component{
    constructor(props){
        super(props);
        this.className={};
        this.notes=[{
            label:"KsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxa",
            desc:"voobshe taka9 vaflia shokeKsu aKsuxaK su xaKsu xaKsuxaKsuxaKs xaKsuxaKsuxa Ksuxa suxaKsux KsuxaK uxaKsu xaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxa",
            tags:[{color:"red",text:"danger"},{color:"green",text:"good"}],
            folder:"KSUXA",
            date:new Date(),
            name:"Ksuxa",
        },{
            label:"KsuxaKsuxaKsuxa",
            desc:"voobshe taka9 xaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxaKsuxa",
            tags:[{color:"violet",text:"mad"},{color:"red",text:"danger"}],
            folder:"KSUXA",
            date:new Date(),
            name:"Fad",
        }];
    }
    render(){
        return (
        <Wraper>
            <GridPlace id="gridplace">
                <Label>Notes</Label>
                {this.notes.map((elem)=>{
                    return <Link to={`/user/Notes/${elem.name}`}><GridBlock data={elem}/></Link>
                })}
                <WhiteSpace/>
            </GridPlace>
            <Route path="/user/Notes/:tab" render={(props) =>{
                    let {tab}=props.match.params;
                    let place=document.getElementById("gridplace");
                    if( place &&(window.innerWidth <= 500 || window.innerHeight <= 500)){
                            place=document.getElementById("gridplace");
                            
                            place.style.display="none";
                            
                    }
                    let elem=this.notes.find((elem)=>elem.name===tab);
                    return <CreateNode data={elem}/>
            }}/>
        </Wraper>)
    }
}