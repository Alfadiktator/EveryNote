
export default function update(state=[],action){
    switch(action.type){
        case 'UPDATE':
            return [...state,...action.payload.notes];
        break;
    }
    return state;
}

