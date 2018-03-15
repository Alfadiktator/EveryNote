
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

        case 'TAG_DELETE':
    }
    return state;
}

