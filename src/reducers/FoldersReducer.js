
export default function update(state=[],action){
    switch(action.type){
        case 'UPDATE':
            if(action.payload.folders){
                return [...state,...action.payload.folders];
            }
            else{
                return state;
            }
        break;
    }
    return state;
}

