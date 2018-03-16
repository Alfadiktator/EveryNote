
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
            state.splice(action.payload,1);
            return [...state];
        case'EDIT':
            state.splice(action.payload.ind,1);
            return[action.payload.data,...state];
    }
    return state;
}

