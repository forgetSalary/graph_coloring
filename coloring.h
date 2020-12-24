#ifndef GRAPHMATRIX_COLORING_H
#define GRAPHMATRIX_COLORING_H

#endif //GRAPHMATRIX_COLORING_H

#ifndef GRAPHMATRIX_LISTSGRAPH_H
#include "matrixgraph.h"
#endif

#include "stretchy_buffers.h"

int** indp_sets_buf(matrix_graph* graph);

void indp_sets_out(matrix_graph* graph);

int color_graph(matrix_graph* graph, int** colors);

void log_indp_sets(FILE* stream, int** sets);

void free_indp_sets(int** sets);