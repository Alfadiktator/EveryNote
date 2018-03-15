
export default function update(state=[],action){
    switch(action.type){
        case 'UPDATE':
            if(action.payload.folders){
                return action.payload.folders;
            }
            else{
                return state;
            }
        break;
        case 'FOLDER_CREATE':
        return [action.payload,...state];
        break;
        case 'FOLDER_DELETE':
        state.splice(action.payload,1);
        return [...state];
        break;
    }
    return state;
}

