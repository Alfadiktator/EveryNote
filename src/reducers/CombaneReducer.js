import {combineReducers} from 'redux'

import tags from './TagsReducer'
import notes from './NotesReducer'
import folders from './FoldersReducer'
import note from './CurrentNoteReducer'
import user from './UserReducer'

export default combineReducers({
    tags,
    notes,
    folders,
    note,
    user,
});
/*
let xhr;
switch(action.type){
    case 'LOG_ON':
        console.log(action.payload);
        /*xhr=new XMLHttpRequest();
        xhr.open('POST', '/api/account/logon', false);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(`email=${action.payload.email}&password=${action.payload.password}`);
        xhr.onload((event)=>{
            console.log(event,this);
        });*/


     /*   xhr=new XMLHttpRequest();
        xhr.open('POST', '/account/register', false);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(`email=${action.payload.email}&password=${action.payload.password}&lastName=${action.payload.lastname}&
        firstName=${action.payload.firstname}&passwordConfirm=${action.payload.passwordConfirm}`);
        window.location.href='#/user/Notes';*/