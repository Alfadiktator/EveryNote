
export default function update(state=[],action){
    switch(action.type){
        case 'UPDATE':
            if(action.payload.tags){
                return action.payload.tags;
            }
            else{
                return state;
            }
        case 'TAG_CREATE':
            return [action.payload,...state];
        case 'TAG_DELETE':
            state.splice(action.payload,1);
            return [...state];
    }
    return state;
}

