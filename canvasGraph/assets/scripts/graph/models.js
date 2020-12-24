import {canvas_arrow,canvas_line,Dot} from "../canvasTools.js";
import {coordinates_on_line} from "../math.js"

export function VertexModel(id,index,x,y,main_color,id_color,context) {
    this.id = id;
    this.index = index;
    this.context = NaN;
    this.x = x;
    this.y = y;
    this.radius = 18;
    this.main_color = main_color;
    this.id_color = id_color;
    this.id_offset = Math.floor(this.radius/4.5);
    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.main_color;
        ctx.fill();

        ctx.fillStyle = this.id_color;
        ctx.font = String(this.radius * 1.2)+'px serif';
        ctx.fillText(this.id, this.x-this.id_offset, this.y+this.id_offset);

    }
}

export function EdgeModel(id,vertex1,vertex2,kind){
    this.id = id;
    this.vertexes = [vertex1,vertex2];
    this.kind = kind;// 0 - oriented, 1 - not oriented
    this.draw = function (context,thickness,color){
        if (this.kind){
            canvas_line(
                context,
                this.vertexes[0].x,
                this.vertexes[0].y,
                this.vertexes[1].x,
                this.vertexes[1].y,
                thickness,
                color)
        }
        else{
            let to = coordinates_on_line(
                this.vertexes[0].x,
                this.vertexes[0].y,
                this.vertexes[1].x,
                this.vertexes[1].y,
                this.vertexes[1].radius);

            canvas_arrow(
                context,
                this.vertexes[0].x,
                this.vertexes[0].y,
                to.x,
                to.y,
                thickness,
                color)
        }
    }
}


export function GraphModel(name,canvas,context) {
    this.name = name;
    this.vertexes = [];
    this.edges = [];
    this.edgeThickness = 5;
    this.edgesColor = 'black';
    this.canvas = canvas;
    this.context = context;
    this.drawVertexes = function (){
        for (let i=0; i<this.vertexes.length; i++){
            this.vertexes[i].draw(context);
        }
    }
    this.drawEdges = function (){
        for (let i=0; i<this.edges.length; i++){
            this.edges[i].draw(context,this.edgeThickness,this.edgesColor);
        }
    }
}