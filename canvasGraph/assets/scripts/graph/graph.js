import {canvas_arrow, canvas_line, clear} from "../canvasTools.js";
import {coordinates_on_line} from "../maths.js";
import {getOneOrZero} from "../maths.js";

let main_colors = [
    'DarkBlue',
    'DarkGreen',
    'DarkCyan',
    'DarkRed',
    'DarkMagenta',
    '#FFC138',
    'Gray',
    'DarkGray',
    'Blue',
    'Green',
    'Cyan',
    'Red',
    'Magenta',
    'Yellow',
    'White']

let id_colors = [
    'White',
    'White',
    'White',
    'White',
    'White',
    'Black',
    'Black',
    'Black',
    'White',
    'White',
    'White',
    'White',
    'White',
    'Black',
    'Black']

export let readIndpSets = function (data){
    let sets = [[]];
    let strNumber='';
    let setCount=0;
    let j=0;
    for (let i=0; i<data.length; i++){
        if (data[i] !== ','){
            if (data[i]!=='\n'){
                strNumber+=data[i];
            }
            else{
                sets.push([]);
                setCount++;
                j=0;
            }
        }
        else{
            sets[setCount][j] = Number(strNumber);
            strNumber='';
            j++;
        }
    }
    return sets;
}

export let readMatrix = function (data){
    let str_len = data.indexOf('\n');

    let order = Math.floor((str_len+1)/2);
    let matrix = [];
    let next_num;

    if (order){
        for (let i=0; i<order; i++){
            matrix.push([]);
            for (let j=0; j<order; j++){
                try{
                    next_num = Number(data[2*j+i*(str_len+1)]);
                    if (next_num){
                        matrix[i][j] = next_num;
                    } else{
                        return null;
                    }
                } catch (err){
                    return null;
                }

            }
        }
    } else{
        return null;
    }

    return matrix;
}

export let inti_randomMatrix = function (kind,size,density){
    let matrix = [];
    let i,j,c;
    c=0;

    for (let k = 0; k < size; k++) {
        matrix.push([]);
    }
    for (i = c; i < size; i++) {
        for (j = c; j < size; j++) {
            if (i!==j){
                if (kind){
                    matrix[i][j] = matrix[j][i] = getOneOrZero(density);
                }
                else{
                    matrix[i][j] = getOneOrZero(density);
                    matrix[j][i] = 0;
                    if (!matrix[i][j]){
                        matrix[j][i] = getOneOrZero(density);;
                    }
                }
            }
            else{
                matrix[i][j] = 0;
            }
        }
        c++;
    }

    return matrix;
}

export let colorGraph = function (graphModel,sets){
    for (let i=0; i<sets.length; i++) {
        for (let j=0; j<sets[i].length; j++){
            graphModel.vertexes[sets[i][j]].main_color = main_colors[i];
            graphModel.vertexes[sets[i][j]].id_color = id_colors[i];
        }
    }
}

export function Graph(model,matrix){
    this.model = model;
    this.matrix = matrix;
    this.draw = function (){
        clear(this.model.canvas,this.model.context);
        this.model.drawEdges();
        this.model.drawVertexes();
    }
}

export let matrixToString = function (matrix,_break){
    if (matrix[0][0] !== undefined){
        let str = '';
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length - 1; j++) {
                str += String(matrix[i][j])+_break;
            }
            str+= String(matrix[i][matrix.length - 1]) + '\n';
        }
        return str;
    }else{
        return null;
    }
}