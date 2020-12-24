import {Dot} from "./canvasTools.js";

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getOneOrZero(chance) {
    let tmp = getRandomInt(101);
    if (tmp<=chance){
        return 1;
    }
    else{
        return 0;
    }
}

export let vector_length = function (x1,y1,x2,y2){
    return Math.sqrt((x2-x1)**2+(y1-y2)**2);
}

export let coordinates_on_line = function(ax,ay,bx,by,d){
    let c = new Dot(0,0);
    let k = d/vector_length(ax,ay,bx,by);

    let katetX = Math.abs(ax - bx)*k;
    let katetY = Math.abs(ay - by)*k;

    const arr_ptr_offset = 4;
    if (bx>ax){
        if (by>ay){ //case →↓
            c.x = bx - katetX - arr_ptr_offset;
            c.y = by - katetY - arr_ptr_offset;
        }
        else{       //case →↑
            c.x = bx - katetX - arr_ptr_offset;
            c.y = by + katetY + arr_ptr_offset;
        }
    }
    else{
        if (by>ay){ //case ←↓
            c.x = bx + katetX + arr_ptr_offset;
            c.y = by - katetY - arr_ptr_offset;
        }
        else{       //case ←↑
            c.x = bx + katetX + arr_ptr_offset;
            c.y = by + katetY + arr_ptr_offset;
        }
    }

    return c;
}