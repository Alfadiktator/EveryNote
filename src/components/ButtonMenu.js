import React from 'react';
import styled from 'styled-components'
import Button from './Button';

const PLUSSRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAClUlEQVR42s2Yz0sbQRTH9+bZv6HnIu2liDalQqNSz0ILVoOn4opi0IBovai5lxa8KL14Vbx41JjEH4i2ohHBSKS9KI34s1BqTKbzWboSG2N2N5Nk3zKw7M6892Vm3nvf9zTNpgzvTz17vRoYbFrtX/Qu+0/rwl2pp6HODIN3vvGPOczVSiEf4/NVresf/I0r/sOGaK8Y2ZsSc0dRsXOREGfXV+ImkzYG73zjH3OYyxrWokMJmI6Nsbcvot0/2zfHRSi5ZRi2KswNJb8J1nqkDnQ5BhLcnq5uWQvMN6/0i6WTLVGsoANd6Ax+n662BWZo58sjT1iPD8QmxK/Ub6FK0IVOdGPDMpj6iH70KTEjMvJRLehENzYKgmIrQc+CUsvE4Zy8V3r8wePjfNnSUuzMfTsVkLawmdebuHQq74yVO4VN39fgm5w4g2ur8CYn3kdIuBOnCFzECqfStjFqDKfSvjkmwHALiGhK0HMqjxc6jOF4l6Rt73Lfj9vcRIi3E4FVA8L2y2iPGN6brNVIguSdYqRYQAgYwKKRmUmGlQYEBrBo0IWYzNCVBgQGsGhwGGhDpQGdSwy14fc32hNJrKxcaNzaNGx3WAkJYKhZ9GXKAuidjDOF5DqdEmBxzZGd/rkUYHHfpXad27suMLoudSBeFyTXV2ZyVUU/rLh2fvoxfpd+QI48biJolaaweQtICHegnCR/9wGSn10GfU7MlqUMeh7RDwpWsRRvdRH9mAWlKhTRjY2huNXqVU4EPVuqupRGp1FKWwWTfXyuaTb8732ef+2YJQftGNYY7ZhId7Kodsx9DSuiKSHebFjFLhMG00tLw/AZKATfzIYVc1mjtGGV09KT+Sa7pQftrFnwGeQqp6Vn5iYb8heRUjaIguwUDAAAAABJRU5ErkJggg==";
const NOTESRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACsUlEQVR42s1YMWsUQRQeYhQDqYLpUogJFrldG/MDBK1USLVFIHeziyD+AxvlFP+FpjQW9wNC8NwdEZEQ0qTxmrOUFEFrhcD5fbOXzR3Z7M7ezZgdeHDMvnnvuzcz33vzhKg4/G50y4vDZ34sP0AOvUQe+0n4h6J/Y47ftA50hZOh7s16n1qbcPgVjn96sXznfQ6bnmquNXafLIhOcIXC35zT36CjdbGGa2nDCha/23rgJ7Lnx+EXGH+knZuOQXsGYB5zLcD1aGtiIEudYA4AtmCoD3k49R+DDdqizaVvwVylxSs7wSLOwD4MbK+qYN7WztMWbdI2fZiDUdH3RiJfC0eDtumjFBRDSfQuwYxs4Uv6Ktw+T+mbsS3+09DbB58X36Y4/GHzzBieqf6dRN4/xzP6ahfcJj+J1vH9CDKoKEdcW3L7emM8ReIiV5SEdxIwGahC2+Q4kmcGiGxK0isGNJhGimzTN3T2stxEii9jYJeAyOjDlLQsmASZdwxuxJiDmyq8XiSVADFKzI/AInRmRjKsCshqhAgIGIgFjlBCfGyuXTogYCAWHqhjXUJUBGRbv7EbLEDvF7fsr0lJ4TpC+mDH8qQ2gFY7wTWNpS5bdltt3CCW+h3q2l17T01GjIU6qvW8alF/RoynqQOn3FaE0uphZE7JN8apI01uodXkOh6tEjD03x1Jri7KjwyQAZjc8mMYYmsFmtY3BZNXoKUG+CAM+5dRwtL3RYXSVm2K/NFnEOSVczCxfAHK2S99xeqHIs8TFjgFAx8rO5Hp6zVaJHpHT+n36VPaEMzY9tWl2ZBz+9J2DAisjNHPtWNIeqftGDVFOyavYUU2JcVD3iLsTWZoVnqi3Z65e/D0qi4hMMdv1Bnq7lltWOUkweWspYdyAfIbTk9YXKXtvbOWXpabKox/OnbP48EnSB8AAAAASUVORK5CYII=";
const TAGSSRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAADEUlEQVR42s1YS2sTURQe6wOKropFkKxsUUhmomJ/gGBBUMHVLIpO7kRB9D8o0R+gP8B22bjIRuki1KQzIyJSigpuzCYuxEqQomulhfh9d5pX85h7kwzmwoFh5txzvrnnnqdhaC6rnD1jeu59yxMvQJ9NX+xYvvuHJJ/xjt8kD3iNWFZw+Yi5kbkNhe+g+IfpiWXzjeuYgbOQWr87YxTswyQ+8538Bh7Jiz3cSxljwWKVM4uWLyqW576F8OtSueqq56YA5gb3AlyFsoYGkijY0wCwAkFV0LWRfwwyKIsyE+/taa3N80V7FndgCwLyycA+MS7LUxZlUjZ1qIMJsl9SvnhixLQomzoiQfEoiV4bTN04JEnPhI+oa6D5zEB6Rl7vb52rcPOfJD5rgspTZ39v8tyvOncGrv0AHrgLwfWQxC7fad6patoXV7rijHRtVW/K5abA/6wFpIuekkfD+yodcYqBi7FC9a9g+7UBYEIK3Ffp185xJVCMcQyeTUCMpgx6EStdvJWwAvGpQ7HnvjQ3lk6R+HwA2MdzpTunI00P3eDdbOYmhvioCHy+nLkIvu2DJ0EgrZMGqK7TEt+TJfdCVETfT0lzBpMg846Crbd7mSYaEHg88U3BQZaJxZCZGclQAVDvuzLYZE2KBAQMxAJFKCFKzsLQgBQpEhAwEAsv1I4sIf4zoNS6PQO+XzTZX5WSIm5A8mJ7Ym9iACUL9jGJZRiTaeQq5T1ng6WTxDJ5l3pktx8XoIbbm4FyYIzVZK3A2Egd9cHZOdYTak8dYXJzI5NrnIDMcltyVS0/sKE2AqCaVvkRFmjuwALN8rM3hwRV416tAk1+CNgQutVxtj2qJSx19yuUVnSL/BGbx/5FfnsbBHocOxhPPETI2YrsYmWjyPuEDbGCgY75Yla1e83OEn1MrfRq2Eorgukw36QMG3p4XziOQQCLiuhd4xgGvcY4JhhhHNNrYMVoyhAPeo5jd5ihWemxKbz04d5RWULgHb+RZ593c6wDqx5JcK450kO5APoNpXssrsLxXmuk18xNGusfyUjZw0JN2iEAAAAASUVORK5CYII=";

const ButtonWrap=styled.section`
    height:100%;
    width:10%;
    display:inline-block;
    background-color:#fff;
    @media (min-width: 100px) {
        width:100px;
      }
`

const Logo=styled.div`
width:100%;
height:10%;
@media (min-width: 100px) {
    width:100px;
    height:100px;
  }
background-size: contain;
background-image: url("https://orig00.deviantart.net/445d/f/2011/189/b/d/mouse_logo_by_rmballou-d3lgdpw.jpg");
background-repeat: no-repeat;
margin:auto;
`
const ButtonList=styled.ul`
width:100%;
@media (min-width: 100px) {
    width:100px;
  }
height:70%;
padding-left:0;
padding-top:10% 
`


class ButtonMenu extends React.Component {
    constructor(props){
      super(props);    
    }
    render() {
        return (
            <ButtonWrap>
                <Logo>
                </Logo>
                <ButtonList>
                    <Button content="Add note" imageSource={PLUSSRC}></Button>
                    <Button content="Notes" imageSource={NOTESRC}></Button>
                    <Button content="Tags" imageSource={TAGSSRC}></Button>
                </ButtonList>
            </ButtonWrap>
        )
      }
}


export default ButtonMenu