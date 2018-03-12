let tags=[];
tags.push({color:"grey",text:"grey",});
tags.push({color:"green",text:"green",});
tags.push({color:"red",text:"red",});
tags.push({color:"#54BCF9",text:"blue",});
tags.push({color:"violet",text:"violet",});
tags.push({color:"orange",text:"orange",});
tags.push({color:"#FCD448",text:"yellow",});
export default function update(state=tags,action){
    switch(action.type){
        case 'UPDATE':
            if(action.payload.tags){
                return [...state,...action.payload.tags];
            }
            else{
                return state;
            }
        break;
    }
    return state;
}

