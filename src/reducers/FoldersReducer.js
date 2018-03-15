
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
        break;
        case 'FOLDER_DELETE':
        break;
    }
    return state;
}

