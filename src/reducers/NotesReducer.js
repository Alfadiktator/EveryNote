
export default function update(state=[],action){
    switch(action.type){
        case 'UPDATE':
            if(action.payload.notes)
                return [...action.payload.notes,...state];
            else
                return state;
        case'EDIT':
            state.splice(state.findIndex((e)=>e.name===action.payload.name),1);
            return[action.payload,...state];
    }
    return state;
}

