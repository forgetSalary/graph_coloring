#ifndef GRAPHMATRIX_MATRIX_H
#define GRAPHMATRIX_MATRIX_H

#endif //GRAPHMATRIX_MATRIX_H

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#ifndef GRAPHMATRIX_TOOLS_H
#include "tools.h"
#endif

#define MATRIX_LOC(name,type,rows,cols) \
type** name = (type**)malloc(cols*sizeof(type*)); \
for(int i=0; i<cols; i++){\
    name[i] = (type*)malloc(rows*sizeof(type));\
}

#define MATRIX_FREE(matrix,cols) \
for(int i=0; i<cols; i++){\
    free(matrix[i]);\
}\
\
free(matrix);\

int row_sum(int** matrix, size_t cols_count, size_t row);

void matcpy(int** dst, int** src, size_t size);

int** matrix_create(int size);

void print_matrix(FILE* stream, int** matrix, int rows,int cols, char _break);

void print_matrix_to_json(FILE* stream, int** matrix, int size);

void matrix_free(int** matrix,int size);

void init_bin_symetric_matrix(int** matrix, int size, float chance);

int init_random_symetric_matrix(int** matrix, int size, int max, float chance);

void init_random_oriented_matrix(int** matrix, int size, int max, float chance);

void init_bin_oriented_matrix(int** matrix, int size, float chance);

void init_bin_incidence_matrix(int** matrix, int vc, int ec, float chance);

void init_empty_matrix(int** matrix, int rows_count, int cols_count);
