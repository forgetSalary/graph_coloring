import {addEdge, addVertex, remVertex} from "./graph/manually.js";
import {VertexModel,GraphModel} from './graph/models.js'
import {canvas_arrow, canvas_line, Dot,clear} from "./canvasTools.js";
import {coordinates_on_line,vector_length} from "./maths.js";
import {generateEdges, generateVertexes} from "./graph/vertexesGeneration.js";
import {colorGraph, Graph, readIndpSets, matrixToString, readMatrix, inti_randomMatrix} from "./graph/graph.js"
import {HideAll} from "./Layout/mainMenu.js";

//macros
function el(elementName){let el = document.getElementById(elementName);if (el){return el;} else{ return document.getElementsByClassName(elementName)[0];}}

let canvas = document.getElementById('field');
let fieldOffset = new Dot(canvas.offsetLeft,canvas.offsetTop);
let current_primary_button = "AddGraph";

let set_primary_button = function (new_btn){
    el(current_primary_button).className = el(current_primary_button).className.replace("primary","default");
    el(new_btn).className = el(new_btn).className.replace("default","primary");
    current_primary_button = new_btn;
}

let ctx = canvas.getContext('2d');
let main_colorToSave = '#f0a74f';
let id_colorToSave = '#000000';

let main_graph_model = new GraphModel('main',canvas,ctx);
let main_graph = new Graph(main_graph_model,[[]]);

let resizeField = function (){
    canvas.width = canvas.clientWidth;
    fieldOffset = new Dot(canvas.offsetLeft,canvas.offsetTop);

    console.log(fieldOffset);
    main_graph.draw();
}

resizeField();


console.log(fieldOffset);

let fieldState = 'addV';
let running = false;
let standoutEdges = false;
let vertex_to_move = null;

let mouse_is_in_vertex = function (vertex,clientX,clientY){
    let len = vector_length(vertex.x,vertex.y,clientX,clientY);
    return len <= vertex.radius;
}

let determineVertex = function (graph,clientX,clientY){
    let vertex;
    for (let i = 0; i<graph.vertexes.length; i++){
        vertex = graph.vertexes[i];
        if (mouse_is_in_vertex(vertex,clientX- fieldOffset.x,clientY-fieldOffset.y)){
            return vertex;
        }
    }
    return null;
}

let moveState = function (e){
    fieldOffset.x = canvas.offsetLeft;
    fieldOffset.y = canvas.offsetTop;

    vertex_to_move = determineVertex(main_graph_model,e.clientX,e.clientY);
    if (vertex_to_move) {
        main_colorToSave = vertex_to_move.main_color;
        id_colorToSave = vertex_to_move.id_color;
        vertex_to_move.main_color = '#90642F';
        vertex_to_move.id_color = '#000000';
        main_graph.draw();

        if (standoutEdges){
            let buf = main_graph.model.edgeThickness;
            main_graph.model.edgeThickness = main_graph.model.edgeThickness*2;

            for (let i = 0; i < main_graph.model.edges.length; i++) {
                if (main_graph.model.edges[i].vertexes[0].id === vertex_to_move.id ||
                    main_graph.model.edges[i].vertexes[1].id === vertex_to_move.id){
                    main_graph.model.edges[i].draw(main_graph.model.context,main_graph.model.edgeThickness,'orange');
                }
            }

            vertex_to_move.draw(main_graph.model.context);
            main_graph.model.edgeThickness = buf;
        }

        running = true;
    }
}

let addVState = function (e){
    let nextIndex = main_graph.model.vertexes.length;
    let vertex = new VertexModel(
        nextIndex,
        nextIndex,
        e.clientX - fieldOffset.x,
        e.clientY - fieldOffset.y,
        '#f0a74f',
        '#000000',
        main_graph.model.context);
    addVertex(main_graph,vertex);
    main_graph.draw();
}

let vertexes_to_connect = [null,null];
let vertex_to_reset;
let addEState = function (e,kind){
    if (vertexes_to_connect[0] && vertexes_to_connect[1]){
        vertexes_to_connect = [null,null];
    }

    if (vertexes_to_connect[0]){
        vertexes_to_connect[1] = determineVertex(
            main_graph.model,
            e.clientX,
            e.clientY)

        if (vertexes_to_connect[1]) {
            main_colorToSave = vertexes_to_connect[1].main_color;
            id_colorToSave = vertexes_to_connect[1].id_color;
            vertexes_to_connect[1].main_color = '#90642F';
            vertexes_to_connect[1].id_color = '#000000';
            vertex_to_reset = vertexes_to_connect[1];
            main_graph.draw();
        }
    }
    else{
        vertexes_to_connect[0] = determineVertex(
            main_graph.model,
            e.clientX,
            e.clientY)

        if (vertexes_to_connect[0]){
            main_colorToSave = vertexes_to_connect[0].main_color;
            id_colorToSave = vertexes_to_connect[0].id_color;
            vertexes_to_connect[0].main_color = '#90642F';
            vertexes_to_connect[0].id_color = '#000000';
            vertex_to_reset = vertexes_to_connect[0];
            main_graph.draw();
        }
    }

    if (vertexes_to_connect[0] && vertexes_to_connect[1]){
        addEdge(main_graph,vertexes_to_connect[0],vertexes_to_connect[1],kind);
    }
}

let vertex_to_delete;
let edge_to_delete;
let removeState = function (e){
    vertex_to_delete = determineVertex(main_graph_model,e.clientX,e.clientY);
    if (vertex_to_delete){
        remVertex(main_graph,vertex_to_delete.index);
        main_graph.draw();
    }
}



canvas.onmousemove = function (e){
    if (vertex_to_move && running && fieldState === 'move'){
        vertex_to_move.x = e.clientX - fieldOffset.x;
        vertex_to_move.y = e.clientY - fieldOffset.y;
        main_graph.draw();
    }
    else{return null;}
};

canvas.onmousedown = function (e){
    switch (fieldState){
        case 'move':
            moveState(e);
            break;
        case 'addV':
            addVState(e);
            break;
        case 'addEO':
            addEState(e,0);
            break;
        case 'addENO':
            addEState(e,1);
            break;
        case 'remove':
            removeState(e);
            break;

    }
};

function resetVertex(vertex){
    vertex.main_color = main_colorToSave;
    vertex.id_color = id_colorToSave;
}
canvas.onmouseup = function (e){
    switch (fieldState){
        case 'move':
            if (vertex_to_move) {
                resetVertex(vertex_to_move);
                vertex_to_move = null;
                running = false;
                main_graph.draw();
            }
            break;
        case 'addV':
            break;
        case 'addEO':
            if (vertex_to_reset) {
                resetVertex(vertex_to_reset);
                main_graph.draw();
            }
            break;
        case 'addENO':
            if (vertex_to_reset) {
                resetVertex(vertex_to_reset);
                main_graph.draw();
            }
            break;
        case 'remove':
            break;

    }
};

el('range-edge-thickness').oninput = function (e){
    main_graph.model.edgeThickness = Number(e.target.value)/5;
    main_graph.draw();
};
el('range-vertex-radius').oninput = function (e){
    for (let i=0; i<main_graph.model.vertexes.length; i++){
        main_graph.model.vertexes[i].radius = Number(e.target.value);
    }
    main_graph.draw();
};

document.addEventListener('keypress', function (e){
    switch (e.code){
        case 'KeyM':
            fieldState = 'move';set_primary_button('Default');
            break;
        case 'KeyV':
            fieldState = 'addV';set_primary_button('AddGraph');
            break;
        case 'KeyR':
            fieldState = 'remove';set_primary_button('DeleteObject');
            break;
    }
});
el('edge-color').onclick = function (e){standoutEdges = e.target.checked;};
el('Default').onclick = function (){
    fieldState = 'move';
    set_primary_button('Default');
    HideAll();}
el('AddGraph').onclick = function (){
    fieldState = 'addV';
    set_primary_button('AddGraph');
    HideAll();}
el('oriented').onclick = function (){
    fieldState = 'addEO';
    HideAll();}
el('not-oriented').onclick = function (){
    fieldState = 'addENO';
    HideAll();}
el('DeleteObject').onclick = function (){
    fieldState = 'remove';
    set_primary_button('DeleteObject');
    HideAll();}
el('color').onclick = function () {
    const data = matrixToString(main_graph.matrix,' ');
    console.log(main_graph.matrix);
    console.log("client:\n");
    console.log(data);

    let sets;
    if (data) {
        $.ajax({
            async: true,
            url: "cgi-bin/Coloring.exe",
            type: "post",
            data: data,
            dataType: "text",
            success: function (response) {
                console.log("server:\n");
                console.log(response);
                sets = readIndpSets(String(response));
                colorGraph(main_graph.model,sets);
                main_graph.draw();
            }
        });
    }

    else{
        alert("Граф не задан");
    }
};
el('confirm-matrix').onclick = function (){
    let textarea = el('matrix-input');
    main_graph.matrix = readMatrix(textarea.value);
    if (main_graph.matrix){
        let names = [];
        for (let i = 0; i < main_graph.matrix.length; i++) {names[i]=i;}
        main_graph.model.vertexes = generateVertexes(main_graph.model,names,main_graph.matrix.length);
        main_graph.model.edges = generateEdges(main_graph.matrix,main_graph.model.vertexes);
        main_graph.draw();
        HideAll();
    }else{
        textarea.value = "";
        alert("Не удалось прочитать матрицу");
        main_graph.matrix = [];
    }
}
el('create-graph').onclick = function (){
    const size = Number(el("gr-size").value);
    if (size < 1 || size > 200){
        alert("Размер графа должен быть больше 1, и не привышать 200")
    }
    else{
        const kind = Number(el("graph-kind").children[1].checked);
        const density = Number(el("gr-density").value);
        main_graph.matrix = inti_randomMatrix(kind,size,density);

        let names = [];
        for (let i = 0; i < main_graph.matrix.length; i++) {names[i]=i;}
        main_graph.model.vertexes = generateVertexes(main_graph.model,names,main_graph.matrix.length);
        main_graph.model.edges = generateEdges(main_graph.matrix,main_graph.model.vertexes);
        main_graph.draw();
    }

}
el('save-image').onclick = function(){
    const url = el("field").toDataURL('image/png')
    let link = document.createElement("a");
    link.download = url.substring((url.lastIndexOf("/") + 1), url.length);
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
el('DeleteAll').onclick = function (){
    main_graph.matrix = [[]];
    main_graph.model.vertexes = [];
    main_graph.model.edges = [];
    main_graph.draw();
    HideAll();
};
el('ShowAdjacencyMatrix').onclick = function (){
    const text = matrixToString(main_graph.matrix,',');
    if (text){
        el('matrix-input').value = text;
    }
}

window.onresize = resizeField;