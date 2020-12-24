#include "matrix.h"

void init_bin_symetric_matrix(int** matrix, int size, float chance){
    int c=0;

    int i,j;
    for (i=c; i<size; i++){
        for (j=c; j<size;j++ ) {
            matrix[i][j] = one_or_zero(chance);
            matrix[j][i] = matrix[i][j];
        }
        c++;
    }

    //обнуление диагонали
    for (i=0; i<size; i++){
        matrix[i][i] = 0;
    }
}


void print_matrix(FILE* stream, int** matrix, int rows,int cols, char _break){
    for (int i = 0; i < cols; ++i) {
        for (int j = 0; j < rows; ++j) {
            fprintf(stream,"%d%c", matrix[i][j],_break);
        }
        fprintf(stream,"\n");
    }
}


int** matrix_create(int size){
    int **matrix = (int **) malloc(size * sizeof(int *));
    for (int i = 0; i < size; i++){ matrix[i] = (int *) malloc(size * sizeof(int)); }
    return matrix;
}

void matrix_free(int** matrix,int size){
    for (int i = 0; i < size; i++) { free(matrix[i]); }
    free(matrix);
}