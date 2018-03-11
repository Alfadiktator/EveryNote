import {Link} from 'react-router-dom';

const init={
    email:"",
    name:"sad",
}

export default function update(state=init,action){
    let xhr;
    switch(action.type){
        case 'LOG_ON':
            console.log(action.payload);
             xhr=new XMLHttpRequest();
            xhr.open('POST', '/api/account/logon', false);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(`email=${action.payload.email}&password=${action.payload.password}`)
            xhr.onload((event)=>{
                console.log(event,this);
                window.location.href='#/user/Notes';
            });
            return {email:action.payload.email};
            break;
        case 'REGISTRATION':
            xhr=new XMLHttpRequest();
            xhr.open('POST', '/account/register', false);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(`email=${action.payload.email}&password=${action.payload.password}&lastName=${action.payload.lastname}&
            firstName=${action.payload.firstname}&passwordConfirm=${action.payload.passwordConfirm}`);
            window.location.href='#/user/Notes';
            return state;
            break;
        default:
            return state;
    }
    return state;
}

