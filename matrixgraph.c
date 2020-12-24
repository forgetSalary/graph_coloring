#include "matrixgraph.h"

void print_graph(matrix_graph* graph){
    printf("|v\t|");

    for (int i=0; i<graph->size; i++){
        printf("%d\t|",graph->vertexes[i]);
    }
    printf("\n|");

    for (int i=0; i<graph->size; i++){

        printf("\t|");
    }
    printf("\t|\n");

    for (int i=0; i<graph->size; i++){
        printf("|%d\t",graph->vertexes[i]);
        for (int j=0; j<graph->size; j++){
            printf("|%d\t",graph->matrix[i][j]);
        }
        printf("|\n");
    }
    printf("\n");
}

void matrixGraph_free(matrix_graph* graph){
    matrix_free(graph->matrix,graph->size);
    free(graph);
}

matrix_graph* matrix_graph_create(size_t size){
    matrix_graph* graph = new(matrix_graph);
    graph->matrix = matrix_create(size);
    graph->vertexes = new_block(int,size);
    graph->size = size;
    return graph;
}

matrix_graph* init_graph_from_stream(FILE* stream){
    int order=0;
    char next_char=' ';

    int position = ftell(stream);
    do{
        if (next_char!=' '){
            order++;
        }
        next_char = fgetc(stream);
    }while (next_char!='\n');
    fseek(stream, position, SEEK_SET);

    matrix_graph* graph = matrix_graph_create(order);

    int check;

    for (int i = 0; i < order; ++i) {
        for (int j = 0; j < order; ++j) {
            fscanf(stream,"%d",&graph->matrix[i][j]);
        }
    }

    return graph;

}

matrix_graph* init_graph_from_string(char* str){
    int order=0;
    char next_char=' ';

    int i=0;
    do{
        if (next_char!=' '){
            order++;
        }
        next_char = str[i];
        i++;
    }while (next_char!='\n');

    matrix_graph* graph = matrix_graph_create(order);

    int str_len = strchr(str,'\n') - str;
    for (int i = 0; i < order; ++i) {
        for (int j = 0; j < order; ++j){
            next_char = str[2*j+i*(str_len+1)];
            graph->matrix[i][j] = (int)(next_char-'0');
        }
    }

    return graph;
}

matrix_graph* init_graph_from_cgi_client(){
    int data_length = CONTENT_LENGTH;
    char* data = post_data(data_length);
    if (!data_length){printf("error,%d\n",data_length);exit(1);}
    matrix_graph* graph = init_graph_from_string(data);
    row(graph->vertexes,graph->size,0,i)
    free(data);
    return graph;
}

int edge_count(matrix_graph* graph, int kind){
    int count = 0;
    for (int i = 0; i < graph->size; ++i) {
        for (int j = 0; j < graph->size; ++j) {
            if (graph->matrix[i][j]){
                count ++;
            }
        }
    }

    if (kind>=2){
        count /= 2;
    }

    return count;
}


void remove_vertex(matrix_graph* graph, int vrtxindex){
    int data_size;

    void* dst;
    void* src;

    //удаляем строку
    for (int i=0; i<graph->size;i++){
        for (int j = vrtxindex; j < graph->size-1; j++) {
            graph->matrix[j][i] = graph->matrix[j+1][i];
        }
    }

    //удаляем столбец
    for (int i=0; i<graph->size;i++){
        dst = &(graph->matrix[i][vrtxindex]);
        src = &(graph->matrix[i][vrtxindex+1]);

        data_size=(graph->size)-vrtxindex;

        memmove(dst,src,data_size*sizeof(int));
    }

    //удаляем название вершины
    dst = &(graph->vertexes[vrtxindex]);
    src = &(graph->vertexes[vrtxindex+1]);

    memmove(dst,src,(graph->size-vrtxindex)*sizeof(int));

    graph->size--;
}

void add_vrtx(matrix_graph* graph, int new_vrtx){
    int old_size=graph->size;

    graph->matrix = (int**)realloc(graph->matrix, (old_size+1) * sizeof(int*));
    graph->matrix[old_size] = (int*)malloc((old_size+1)* sizeof(int));

    for (int i = 0; i < old_size; i++){
        graph->matrix[i] = (int*)realloc(graph->matrix[i], (old_size+1)* sizeof(int));
    }

    graph->size++;
    int new_size=graph->size;

    for (int i=0; i<new_size; i++){
        graph->matrix[new_size-1][i]=0;
        graph->matrix[i][new_size-1]=0;
    }


    graph->vertexes = realloc(graph->vertexes,sizeof(int)*new_size);
    graph->vertexes[new_size-1] = new_vrtx;
}

