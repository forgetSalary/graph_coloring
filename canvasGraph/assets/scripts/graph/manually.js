import {EdgeModel} from "./models.js";

export let addVertex = function(graph,vrtx){
    let gSize = graph.model.vertexes.length;

    if (gSize){
        graph.matrix.push([]);
        for (let i = 0; i < gSize; i++) {
            graph.matrix[i].push(0);
            graph.matrix[gSize].push(0);
        }
        graph.matrix[gSize].push(0);
    }
    else{
        graph.matrix[0][0] = 0;
    }
    graph.model.vertexes.push(vrtx);
}

export let addEdge = function(graph,vrtx1,vrtx2,kind){
    //kind = 0 - oriented, 1 - not oriented
    const next_index = graph.model.vertexes.length;
    if (kind){
        graph.matrix[vrtx1.index][vrtx2.index] = graph.matrix[vrtx2.index][vrtx1.index] = 1;
    }else{
        graph.matrix[vrtx1.index][vrtx2.index] = 1;
    }
    graph.model.edges.push(new EdgeModel(next_index,vrtx1,vrtx2,kind));
}

export let remVertex = function (graph,vertex_index){
    let gSize = graph.model.vertexes.length;

    if (gSize>1){
        let count = graph.model.edges.length;
        for (let i = 0; i < count; i++) {
            if (graph.model.edges[i].vertexes[0].index === vertex_index ||
                graph.model.edges[i].vertexes[1].index === vertex_index)
            {
                graph.model.edges.splice(i,1);
                i--;
                count--;
            }
        }

        for (let i = 0; i < gSize; i++) {
            graph.matrix[i].splice(vertex_index,1);
        }

        graph.matrix.splice(vertex_index,1);
        graph.model.vertexes.splice(vertex_index,1);
        for (let i = vertex_index; i < graph.model.vertexes.length; i++) {
            graph.model.vertexes[i].index --;
        }
    }
    else{
        graph.matrix = [[]];
        graph.model.vertexes = [];
        graph.model.edges = [];
    }

}

export let remEdge = function(graph,edge){
    //kind = 0 - oriented, 1 - not oriented
    if (edge.kind){
        graph.matrix[edge.vertexes[0]][edge.vertexes[1]] = 0;
    }
    else{
        graph.matrix[edge.vertexes[0]][edge.vertexes[1]] = graph.matrix[edge.vertexes[0]][edge.vertexes[1]] = 0;
    }
}