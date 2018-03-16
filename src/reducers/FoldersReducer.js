
export default function update(state=[],action){
    switch(action.type){
        case 'UPDATE':
            if(action.payload.folders){
                return action.payload.folders;
            }
            else{
                return state;
            }
        case 'FOLDER_CREATE':
            return [action.payload,...state];
        case 'FOLDER_DELETE':
            state.splice(action.payload,1);
            return [...state];
    }
    return state;
}

