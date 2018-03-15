
export default function update(state=[],action){
    switch(action.type){
        case 'UPDATE':
            if(action.payload.notes)
                return action.payload.notes;
            else
                return state;
        case 'NOTE_CREATE':
            return [action.payload,...state];
        case 'DELETE_NOTE':
            let ind=state.findIndex((e)=>e.name===action.payload);
            console.log('DELETE_NOTE',action,ind);
            state.splice(ind,1);
            return [...state];
        case'EDIT':
            console.log(action);
            state.splice(action.payload.ind,1);
            return[action.payload.data,...state];
    }
    return state;
}

