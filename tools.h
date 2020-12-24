#ifndef GRAPHMATRIX_TOOLS_H
#define GRAPHMATRIX_TOOLS_H

#endif //GRAPHMATRIX_TOOLS_H

#include <stdbool.h>
#include <stdlib.h>

#define HOME_DIR       "C:\\code\\Coloring_graph\\"

#define fill(block,block_size,value,i)      if (block && block_size){for(size_t i=0; i<block_size; i++){block[i] = value;}}
#define random_int(min,max)                 min + rand()%(max - min +1)
#define row(dst,size,begin,index)           fill(dst,size,index+begin,index)

#define _VALUE_OF(type,pointer)             *((type*)pointer)
#define new(type)                           malloc(sizeof(type))
#define new_const(type,value)               &((type){value})
#define new_block(type,how_much)            malloc(sizeof(type)*how_much)
#define del(ptr)                            free(ptr)

#define and &&
#define or ||

int get_int_index_binary(int* arr, size_t size, int num);

int one_or_zero(float chance);

int fst_false(bool* arr,int size);

int positive_or_zero(int max, double chance);

