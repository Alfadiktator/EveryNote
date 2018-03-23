import React from 'react';
import styled from 'styled-components';
import Button from './Tools/Button';
import CreateNode from './CreateNode';
import Notes from './Notes';
import Folders  from './Folders';
import './Styles/Animation.css';
import Tags  from './Tags';
import {HashRouter as Router,Route,Switch,Link} from 'react-router-dom';
import {connect} from 'react-redux';

const PLUSSRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAClUlEQVR42s2Yz0sbQRTH9+bZv6HnIu2liDalQqNSz0ILVoOn4opi0IBovai5lxa8KL14Vbx41JjEH4i2ohHBSKS9KI34s1BqTKbzWboSG2N2N5Nk3zKw7M6892Vm3nvf9zTNpgzvTz17vRoYbFrtX/Qu+0/rwl2pp6HODIN3vvGPOczVSiEf4/NVresf/I0r/sOGaK8Y2ZsSc0dRsXOREGfXV+ImkzYG73zjH3OYyxrWokMJmI6Nsbcvot0/2zfHRSi5ZRi2KswNJb8J1nqkDnQ5BhLcnq5uWQvMN6/0i6WTLVGsoANd6Ax+n662BWZo58sjT1iPD8QmxK/Ub6FK0IVOdGPDMpj6iH70KTEjMvJRLehENzYKgmIrQc+CUsvE4Zy8V3r8wePjfNnSUuzMfTsVkLawmdebuHQq74yVO4VN39fgm5w4g2ur8CYn3kdIuBOnCFzECqfStjFqDKfSvjkmwHALiGhK0HMqjxc6jOF4l6Rt73Lfj9vcRIi3E4FVA8L2y2iPGN6brNVIguSdYqRYQAgYwKKRmUmGlQYEBrBo0IWYzNCVBgQGsGhwGGhDpQGdSwy14fc32hNJrKxcaNzaNGx3WAkJYKhZ9GXKAuidjDOF5DqdEmBxzZGd/rkUYHHfpXad27suMLoudSBeFyTXV2ZyVUU/rLh2fvoxfpd+QI48biJolaaweQtICHegnCR/9wGSn10GfU7MlqUMeh7RDwpWsRRvdRH9mAWlKhTRjY2huNXqVU4EPVuqupRGp1FKWwWTfXyuaTb8732ef+2YJQftGNYY7ZhId7Kodsx9DSuiKSHebFjFLhMG00tLw/AZKATfzIYVc1mjtGGV09KT+Sa7pQftrFnwGeQqp6Vn5iYb8heRUjaIguwUDAAAAABJRU5ErkJggg==";
const PLUSHOVER="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABvElEQVR42s1YzUrDQBDeg5c+QG89qceNzyDoK+Qm3c2t72TPHnwALzXZi0gRRHoK+gqi9GihRGc2NiE0pJPsJp2FgdBsZr7O/4wQLU+wiE5lrGdBrO6AVjJRn0Gif5DsM/yG7+wduCt6OebyRD5Ob0DgE1AGwn8phHftN/At8vCCJVhMr4NEpVQQDZQir85AJvfhCP7dHBhlHsDsCDU2nzyHo1Zgzh/CMfjAi0cgVVMCb5RBB4Pq7QlM6V86PQgKVdmnZuo01Wg+adTtUGAKUCCzIZq8OjDZ0S8SdbWXZzyFdueUUMlTmLhcGL6tPyw5mQ6TZwEIsqkLs91x1NKyrE0tykGPgDIZqzNhi6CjD3gChGlgJmzVZgIIsQiIrhUbQIBF/PczTADpLzTZhhraXQ85JcRqOwig1/U7FdCGlckQCz+nZhf20nBLjNxKR15cNZ/i6qv9IIc2pf3IGzTNp0GzbYg5XguLsuub/Hww5NHkH2UMMgfGoOEHxYg6vUZjRN/vKE0EUzEfl2VDTfT5WccYh3VM3cIKs2lLjeHdpdeF1V5qgHpTrPRs66K+QegWm6u8typXekVtanH+ABqtwq/7bw5UAAAAAElFTkSuQmCC";
const NOTESRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACsUlEQVR42s1YMWsUQRQeYhQDqYLpUogJFrldG/MDBK1USLVFIHeziyD+AxvlFP+FpjQW9wNC8NwdEZEQ0qTxmrOUFEFrhcD5fbOXzR3Z7M7ezZgdeHDMvnnvuzcz33vzhKg4/G50y4vDZ34sP0AOvUQe+0n4h6J/Y47ftA50hZOh7s16n1qbcPgVjn96sXznfQ6bnmquNXafLIhOcIXC35zT36CjdbGGa2nDCha/23rgJ7Lnx+EXGH+knZuOQXsGYB5zLcD1aGtiIEudYA4AtmCoD3k49R+DDdqizaVvwVylxSs7wSLOwD4MbK+qYN7WztMWbdI2fZiDUdH3RiJfC0eDtumjFBRDSfQuwYxs4Uv6Ktw+T+mbsS3+09DbB58X36Y4/GHzzBieqf6dRN4/xzP6ahfcJj+J1vH9CDKoKEdcW3L7emM8ReIiV5SEdxIwGahC2+Q4kmcGiGxK0isGNJhGimzTN3T2stxEii9jYJeAyOjDlLQsmASZdwxuxJiDmyq8XiSVADFKzI/AInRmRjKsCshqhAgIGIgFjlBCfGyuXTogYCAWHqhjXUJUBGRbv7EbLEDvF7fsr0lJ4TpC+mDH8qQ2gFY7wTWNpS5bdltt3CCW+h3q2l17T01GjIU6qvW8alF/RoynqQOn3FaE0uphZE7JN8apI01uodXkOh6tEjD03x1Jri7KjwyQAZjc8mMYYmsFmtY3BZNXoKUG+CAM+5dRwtL3RYXSVm2K/NFnEOSVczCxfAHK2S99xeqHIs8TFjgFAx8rO5Hp6zVaJHpHT+n36VPaEMzY9tWl2ZBz+9J2DAisjNHPtWNIeqftGDVFOyavYUU2JcVD3iLsTWZoVnqi3Z65e/D0qi4hMMdv1Bnq7lltWOUkweWspYdyAfIbTk9YXKXtvbOWXpabKox/OnbP48EnSB8AAAAASUVORK5CYII=";
const NOTEHOVER="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAB90lEQVR42s2YvU7DMBCAPbD0Abp1AsYEIfECSPAK3VCdIiFl4lUQI6Jzh24sLKUxA0IVW1myIPEAFYiRSFXCndPmh0axndqtLZ1UtWf76519dz5CFIc77u87E893J3QIMnMCOncD7xeFf4bv8DeuA7rEyGCne85T7wI2fAGJYfNERlCXz4G5uIYWFnfcO3cDGspC1EiIazUG6Yy6Lfh3A1go1gCzErTYoPPabSnBHD5223AG3jSClF0Ja+Me8jBoXkMw+fnyQiEUmtKkZaosVes+h9H7bcFkULBnzW3SeoClD/pRQM/W4ozoal+/3ybz6CdRHTgH54pCQilOYeAS/ZMmMEUooesweGZAEE1FEzYdEq6b5rlJIh1sASh2JvSA8CQocfj+j5Pnq1ppAIRhwCc8azcAMmChBFkI3K6ZNUDAQpb1jDKQbv2lfKHLIotctrANKLLKZchi36G27to7rFlgrNO5+Rglx+yySX3kG0kdCFMcd58P8qkjTa6e1uRa1JeEyZOrifJjBaQAUy4/0gLN01agob4KzFqBxssQtrsSFveuLvLTh6EdRf5OnkFM8Aza/kOxL/t67beR3uxTWhKm5D5bmg0Vt09PO4Zt0I6palhhNFW0GOpOtTas1kID5JuspcdLF/oNmy6wuEprq7yll+UmhfEH20L3SIG6FE8AAAAASUVORK5CYII=";
const TAGSSRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAADEUlEQVR42s1YS2sTURQe6wOKropFkKxsUUhmomJ/gGBBUMHVLIpO7kRB9D8o0R+gP8B22bjIRuki1KQzIyJSigpuzCYuxEqQomulhfh9d5pX85h7kwzmwoFh5txzvrnnnqdhaC6rnD1jeu59yxMvQJ9NX+xYvvuHJJ/xjt8kD3iNWFZw+Yi5kbkNhe+g+IfpiWXzjeuYgbOQWr87YxTswyQ+8538Bh7Jiz3cSxljwWKVM4uWLyqW576F8OtSueqq56YA5gb3AlyFsoYGkijY0wCwAkFV0LWRfwwyKIsyE+/taa3N80V7FndgCwLyycA+MS7LUxZlUjZ1qIMJsl9SvnhixLQomzoiQfEoiV4bTN04JEnPhI+oa6D5zEB6Rl7vb52rcPOfJD5rgspTZ39v8tyvOncGrv0AHrgLwfWQxC7fad6patoXV7rijHRtVW/K5abA/6wFpIuekkfD+yodcYqBi7FC9a9g+7UBYEIK3Ffp185xJVCMcQyeTUCMpgx6EStdvJWwAvGpQ7HnvjQ3lk6R+HwA2MdzpTunI00P3eDdbOYmhvioCHy+nLkIvu2DJ0EgrZMGqK7TEt+TJfdCVETfT0lzBpMg846Crbd7mSYaEHg88U3BQZaJxZCZGclQAVDvuzLYZE2KBAQMxAJFKCFKzsLQgBQpEhAwEAsv1I4sIf4zoNS6PQO+XzTZX5WSIm5A8mJ7Ym9iACUL9jGJZRiTaeQq5T1ng6WTxDJ5l3pktx8XoIbbm4FyYIzVZK3A2Egd9cHZOdYTak8dYXJzI5NrnIDMcltyVS0/sKE2AqCaVvkRFmjuwALN8rM3hwRV416tAk1+CNgQutVxtj2qJSx19yuUVnSL/BGbx/5FfnsbBHocOxhPPETI2YrsYmWjyPuEDbGCgY75Yla1e83OEn1MrfRq2Eorgukw36QMG3p4XziOQQCLiuhd4xgGvcY4JhhhHNNrYMVoyhAPeo5jd5ihWemxKbz04d5RWULgHb+RZ593c6wDqx5JcK450kO5APoNpXssrsLxXmuk18xNGusfyUjZw0JN2iEAAAAASUVORK5CYII=";
const TAGSHOVER="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACXUlEQVR42s1YvU7DQAzOwMIDsDEBYwMbrEjwCGRDXDLRCcELsLCyMMMCAwMPgECQRIiAqkr8lIGIDTogIBQBC42oetgX2lKatr4krWLJ0im1z1/tO/+cokiSemSMZEw9q5psF7iQsZinWnoZWazhG/4mZEBW6QnZ0wOZ44V5MOgAV8E4pzDKCh3QxT0SwaIeLcyqFnOpIDqwi3tFBjK8pw3Cv9uCjaoJgKkxemxr+FwblAIztq8NwRnIJwikOZSwN9qgg0H39ghM43zpbldQ6Moonhm3DMFRPNUxfBmbbcpuuni9zkv+h2BcS4MCmx1uk9wBXrvb5pVqhdfoG9b4Tfagj1tspiXPyFztCQjPTvGQt6Od4oGQkUkJTXkKExdVeepkkdveFe9GlnfJJ0GWHDpMnnVAkE0pSrNnK9z9fGgybL5c8GlnSTCu/9Lt5z2fcZapoHKN2kQoB1p+lT+X31o8gUBqMrj+T0/lEp8DXVLSNNmoIoog4R+EgaEAQnr8eqWmgawiqjZBuB2JkJ2Gh+wvkcIGWBS4XYU4gKhEO0esoPz2MykBpJcwZH5qAJmskjZAfqSQUZOdrA5iSd+hjnvtEw7ZLrQctMTYl5CJxEgsHX3wUFA6guKqOykAlJNqPzz/PTIY1JVqP4IGrXNjv3SzEQkU6qCuVIMm2hBbvoVNalZD2+FNfjAY9hVQ2yY/zhgUHUyXMaj/g6JBnV6NIUTf21GaCKYpfGl5bAi5fck8x9gxnmPCHqwwm0p6DGVziT5YtaQGqDf1Jz3RurA3MFrB5irorRpPevXaJEE/gW31vBzI7JIAAAAASUVORK5CYII=";
const FOLDERSRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACs0lEQVR42s1Yv2sUQRQe4g8IWAXTpTLB4jJrYyqxELRSIdUWQjaziyC29srpv6EpjcX9ASF47k4QkRBsbLzmLOWKoLVC4Py+2dx64Ta7s3s73g08OHZm3vtu5r3vvXlCVBxeN7om4/CpF6t3kK8yUcdeEv6mmN/4xjmzBmuFk6HvXJQftrdg8BMM/5CxeiMPwkDqYGN9//GS6PgXKPzNb2YOa8xa7OFe6mgEi9fdvuclqufF4Ucof2CM245hewFgHnIvwPWoqzaQlY6/CAA7UNSH3J/6j0EHdVHnymd/sdLmtT1/GT5wBAW7Le1faermqYs6qZs27MHo6Nt6ol4JR4O6aaMUFI+S6F2CGbvCF7RVeH1Sm8jYFf9pmOuDzfOjKQ6/N+kzlj7Vv5GouxM8Y0K7IJowN6SM/7aUgZdEmyXR1zvDUyQuckXJ8dYFZEAV6ibHkTwzQGRTkp47QMMi3bSNNYdZbiLFlzGwS0Bk9NOUtCqYBJl3LCIiF5DNnlJAPCXmR2ARJjMjGc4cEDAQCzahhHgfbMwcEDAQCx3q2JQQNQE14kNMJ/v+Etb95JX9sSkpXAMyjh2rk7kB1Or4lw2Webmy6/rRVWKZ2qmbApQ59bRh3xigUdhLXY0Ya8rAnhhHqQNe7ghQYbafSB1pcgutkquMt27VK8TUs8LT6Y4l1wrlx6AOoJYOblcuP9ICLSwp0KLN9PibvbLcAs1MaD4Iw/4sSljaPq9Q2pmbIn/8GQR56RxMrJ6Dco5KX7HmoUh/wganYGBjbS+yfb1Gy0Tv6Cn9Nn1KW4I5c33z0mzIib60HQMCK2P0iXYMSW/UjtFTtGPyGlZkU1I85DWOPWCGZqUn2u2Fm1+eXDIlBL5xjmtO1x422rDKSYKrWUsP5QLkF4yesLhK23v/WnpZbqow/gLgfZ2yi4WMNQAAAABJRU5ErkJggg==";
const FOLDERHOVER="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAB90lEQVR42s2YvU7DMBCAPbD0Abp1AsaEZ0CCV8gGcbJ14ilgYWOmcwYegKUkWRCqEAxlycAjVCBGIlUtdwlJiBLic+KktnRS1Prns+98dz7GJJs5d/cN35maPvdAlkbAV2bgfKMk3/Ab/pf0gb6slxYe7xkP9hks+AiygcW3FMG+yRgYi3MoYTHn9qkZ8IgK0SARztUaZHJnjWB3M5hoowAmEzyx2eTJGknBHN5bY7CBZ4UgZVXC3LgGHQaPtyeYwr6cSAiFR9nnydSdVKP6jJDfDgWTQ8GaDbdJqQGTDf0o4CcVPyO62ln7+01pq/hre/F2I3QJJT+Fjku0k7ZAGZRQdeg8cyDwpn0CZeMEsihiEyEcDAC0MXx+wJIgSDC+/4AoY4hA6AamLInamgAhC4PbtdQGCFjYbz6z1cCGUD5QZbE2QD5f6wYUa6UyZOls1GptCIy667VXrDIPUg45x9imUWJZ4RglQ0cbGEK0L0JHGlwdUnA9f7lslfNcv3v04EpNP3CnbYDs1yv59CNN0JoTezx2nLgnlUWVh6QZ7i6FxbXrk/z0YahHkr+TZ1AoeAYN/1B0qa9Xd4z0/T6liTAl9elSbKi5fWrKMWGHckxdwQq9qeSJYd+F0oJVxTVAvMlLeknqwj9h0TUmV2luVZT08tgk0X4ASkfZj4ss8JEAAAAASUVORK5CYII=";

const classList={
    CreateNode:CreateNode,
    Notes:Notes,
    Folders:Folders,
    Tags:Tags,
};

const Wraper=styled.div`
    width:100vw;
    height:100vh;
    left:0;
    top:0;
    overflow:hidden;
    background-color:#fff;
    display:grid;
    align-items: stretch;
    grid-template-columns:72px calc(100% - 100px);
    grid-template-areas:
    "menu route";
    @media (max-width: 500px) {
        grid-template-rows:50px 1fr;
        grid-template-columns:1fr;
        grid-template-areas:
        "header"
        "route";
    }
`;

const ButtonWrap=styled.div`
    height:100vh;
    left:0;
    display:grid;
    grid-template-rows:72px auto 72px;
    grid-row-gap:20px;
    @media (max-width: 500px) {
        width:100vw;
        height:100px;
        transition:top 0.3s ;
        justify-content:center;
        align-content:space-around;
        grid-template-columns:1fr 72px;
        grid-template-rows:100px;
        position:absolute;
        top:-100px;
        z-index:1000;
    }
    @media (max-height: 500px) {
        grid-template-rows:auto 72px;
    }
    background-color:#f5f5f5;
    grid-area:menu;
`;

const Logo=styled.div`
    width:100%;
    height:100%;
    background-size: contain;
    background-image: url("https://orig00.deviantart.net/445d/f/2011/189/b/d/mouse_logo_by_rmballou-d3lgdpw.jpg");
    background-repeat: no-repeat;
    margin:auto;
    @media (max-height: 500px) {
        display:none;
    }
    @media (max-width: 500px) {
        display:none;
    }
`;

const ButtonList=styled.ul`
    width:100%;
    display:grid;
    justify-items: center;
    grid-template-rows:repeat(4,36px);
    grid-gap:15px;
    list-style-type: none;
    @media (max-width: 500px) {
        grid-template-columns:repeat(4,36px);
        grid-template-rows:36px;
        grid-gap:10px;
        align-content:center;
        justify-content: space-around;
    }
    padding-left:0;
    background-color:#f5f5f5;
    @media (max-height: 500px) {
        margin-bottom:0;
        padding-top:0%;
    }
`;

const WraperRoute=styled.div`
    grid-area:route;
    @media (max-width: 500px) {
        width:100vw;
    }
`;

const Header=styled.div`
    height:50px;
    z-index:100;
    background-color:rgb(40,167,69);
    grid-area:header;
    @media (max-width: 500px) {
        width:100vw;
        display:grid;
    }
    display:none;
`;

const Hamburger=styled.div`
    width:50px;
    height:100%;
    border-radius:50%;
    background-size: contain;
    background-color:rgb(40,167,69);
    background-image: url(https://cdn.shopify.com/s/files/1/1227/1058/t/9/assets/hamburger-icon.png?14588486506455971827);
    background-repeat: no-repeat;
    margin-left:5px;
    transition:background-color 0.15s;
`;

const Center=styled.div`
    border-top:2px solid black;
    width:72px;
    display:grid;
    align-content: center; 
    justify-content:center;
    @media (max-height: 500px) {
        align-content: start;
    }
    @media(max-width:500px){
        border-top:0;
    }
    @media (max-height: 400px) {
        display:none;
    }
`
const WraperMainMenu=styled.div`
    position:absolute;
    width:100%;
    height:100%;
    justify-content:center;
    align-content:center;
    background-color:rgba(120,120,120,0.5);
`

const MainMenu=styled.div`
    width:320px;
    display:grid;
    grid-template-columns:1fr;
    grid-template-rows:60px 30px 30px 30px;
    border:1px solid black;
    background-color:#fff;
    z-index:1000;
`

const MenuHeader=styled.div`
    font-family: Brush Script MT, Brush Script Std, cursive;
    font-weight:500;
    font-size:25px;
    border-bottom:1px solid black;
    display:grid;
    justify-content:center;
    align-content:center;
`

const MenuButton=styled.div`
    border-bottom:1px solid black;
    display:grid;
    justify-content:center;
    align-content:center;
    ${MenuButton}:hover{
        background-color:#ddd;
    }
`

class ButtonMenu extends React.Component {
    constructor(props){
      super(props);
      this.data=props.data;
      this.popUp=false;
      const UserMenuButton=styled.div`
            width:60px;
            height:60px;
            background-size: contain;
            background-image: url(https://www.evernote.com/redesign/business/BusinessHomeAction/letters/${(this.props.store.user.firstName && this.props.store.user.firstName.substring(0,1).toLowerCase()) || 'c'}_100px_1.png);
            background-repeat: no-repeat;
            background-position:bottom;
            border-radius:100%;
            transition:transform 0.3s;
            @media (max-height: 500px) {
                width:65px;
                height:65px;
            }
      `
      this.usertag= UserMenuButton;
      this.mainMenuDrop=this.mainMenuDrop.bind(this);
      this.mayDown=this.mayDown.bind(this);
      this.visible=this.visible.bind(this);
    }
    mainMenuDrop(){
        let elem = document.getElementById("hamburger");
        elem.style.backgroundColor="rgba(120,120,120,0.5)";
        setTimeout(()=>{elem.style.backgroundColor="rgb(40,167,69)";},150);
        let Menu=document.getElementById("buttonWrap");
        if(this.popUp){
            Menu.style.top="-100px";                          
        }
        else{
            Menu.style.top="0px"; 
        }
        this.popUp=!this.popUp;
    }
    mayDown(){
        if(this.popUp){
            this.mainMenuDrop();
        }
    }
    visible(){
        let elem = document.getElementById("usersharm");
        elem.style.transform= "rotate(90deg)";
        setTimeout(()=>{elem.style.transform= "rotate(0deg)";},300);
        let menu=document.getElementById("mainMenu");
        if(menu.style.display==="none"){
            menu.style.display="grid";
        }
        else{
            menu.style.display="none";
        }
        this.mayDown();
    }
    render() {
       return (
            <Wraper id="Wraper">
                <Header><Hamburger id="hamburger" onClick={this.mainMenuDrop}/></Header>
                <ButtonWrap id="buttonWrap">
                    <Logo/>
                    <ButtonList>
                        <Link to="/user/CreateNode" onClick={this.mainMenuDrop}><Button content="Add note" imageSource={PLUSSRC} imageHover={PLUSHOVER}></Button></Link>
                        <Link to="/user/Notes" onClick={this.mainMenuDrop}><Button content="Notes" imageSource={NOTESRC} imageHover={NOTEHOVER}></Button></Link>
                        <Link to="/user/Tags" onClick={this.mainMenuDrop}><Button content="Tags" imageSource={TAGSSRC} imageHover={TAGSHOVER}></Button></Link>
                        <Link to="/user/Folders" onClick={this.mainMenuDrop}><Button content="Folders" imageSource={FOLDERSRC} imageHover={FOLDERHOVER}></Button></Link>
                    </ButtonList>
                    <Center>
                        <this.usertag id="usersharm" onClick={this.visible}/>
                    </Center>
                </ButtonWrap>
                <WraperRoute id="wraperRoute" onClick={this.mayDown}>
                <Router>
                <Route path="/user/:tab" render={(props) =>{
                    console.log("route");
                    let {tab}=props.match.params;
                    return <Tab tab={tab} data={this.data}/>
                }}/>
                </Router>
                </WraperRoute>
                <WraperMainMenu id="mainMenu" style={{display:"none"}} onClick={this.visible}>
                    <MainMenu onClick={(e)=>{e.stopPropagation();}}>
                        <MenuHeader>{"this.props.store.user.email"}</MenuHeader>
                        <MenuButton>Change Password</MenuButton>
                        <MenuButton>Log off</MenuButton>
                        <MenuButton>Cancel</MenuButton>
                    </MainMenu>
                </WraperMainMenu>
            </Wraper>
        )
      }
}
const Tab =(props)=>{
    var {tab}=props;
    var MyComponent=classList[tab];
    let a=document.getElementById("gridplace");
    if(a && a.style.display==="none"){   
         a.style.display="grid";
    }
    return <MyComponent data={props.data}/>;
}

export default connect(
    state =>({
      store:state,
    }),
    dispatch => ({
    })
)(ButtonMenu);