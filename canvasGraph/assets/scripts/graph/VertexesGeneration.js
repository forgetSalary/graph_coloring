import {Dot} from "../canvasTools.js";
import {vector_length} from "../math.js";
import {EdgeModel, VertexModel} from "./models.js";
import {getRandomInt} from "../math.js";


export let getNewPosition = function (graphModel,vertexes){
    let position = new Dot(0,0);
    let len;
    let posIsNotFine = true;

    while (posIsNotFine){
        position.x = getRandomInt(graphModel.canvas.width);
        position.y = getRandomInt(graphModel.canvas.height);
        posIsNotFine = false;
        for (let i=0; i<vertexes.length; i++){
            len = vector_length(position.x,position.y,vertexes[i].x,vertexes[i].x);
            if (len<vertexes[i].radius){
                posIsNotFine = true;
                break;
            }
        }
    }
    return position;
}

export let generateVertexes = function (graphModel,names,count){
    let newPosition;
    let vertexes = [];
    for (let i=0; i<count;i++){
        newPosition = getNewPosition(graphModel,vertexes);
        vertexes.push(new VertexModel(
            names[i],
            i,
            newPosition.x,
            newPosition.y,
            '#f0a74f',
            '#000000',
            graphModel.context)
        );
    }
    return vertexes;
}

export let generateEdges = function (matrix,vertexes){
    let c=0;
    let i,j;
    let edges = [];
    for (i = c; i < matrix.length; i++) {
        for (j = c; j < matrix.length; j++) {
            if (matrix[i][j] && matrix[j][i]){
                edges.push(new EdgeModel(
                    c,
                    vertexes[i],
                    vertexes[j],
                    1));
            }
            else if (matrix[i][j]){
                edges.push(new EdgeModel(
                    c,
                    vertexes[i],
                    vertexes[j],
                    0));
            }
            else if (matrix[j][i]){
                edges.push(new EdgeModel(
                    c,
                    vertexes[j],
                    vertexes[i],
                    0));
            }
        }
        c++;
    }
    return edges;
}