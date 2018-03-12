
export default function update(state={},action){
    switch(action.type){
        case 'UPDATE_FOCUS_NOTES':
            return action.payload;
        break;
    }
    return state;
}

