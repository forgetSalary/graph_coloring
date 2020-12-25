#ifndef GRAPHMATRIX_MTRXGRPH_H
#define GRAPHMATRIX_MTRXGRPH_H

#endif //GRAPHMATRIX_MTRXGRPH_H

#include <stdio.h>
#include <string.h>


#ifndef GRAPHMATRIX_CGI_H
#include "cgi.h"
#endif

#include "matrix.h"

typedef struct matrix_graph_s{
    int**   matrix;
    int*    vertexes;
    size_t  size;
}matrix_graph;

matrix_graph* matrix_graph_create(size_t size);

matrix_graph* init_graph_from_string(char* str);

matrix_graph* init_graph_from_stream(FILE* stream);

matrix_graph* init_graph_from_stream(FILE* stream);

matrix_graph* init_graph_from_cgi_client();

int edge_count(matrix_graph* grpah, int kind);

void remove_vertex(matrix_graph* graph, int vrtxindex);

void remove_vrtx_sectors(matrix_graph* graph, int vrtxindex);

void add_vrtx(matrix_graph* graph, int new_vrtx);

void print_graph(matrix_graph* graph);

void matrix_graph_free(matrix_graph* graph);

