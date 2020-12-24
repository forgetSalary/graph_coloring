#include "tools.h"

int one_or_zero(float chance){
    int a = rand()%100;
    if ((float)a<(100*chance)){
        return 1;
    }
    else{
        return 0;
    }
}

int positive_or_zero(int max, double chance){
    int a = rand()%100;
    if ((float)a<(100*chance)){
        return 1+rand()%max;
    }
    else{
        return 0;
    }
}

int get_int_index_binary(int* arr, size_t size, int key){
    size_t left = 0;
    size_t right = size-1;
    while (left<=right){
        size_t mid = (left+right)/2;
        if (key==arr[mid]){
            return mid;
        }
        if (key< arr[mid]){
            right = mid - 1;
        } else{
            left = mid +1;
        }
    }
    return -1;
}

int fst_false(bool* arr,int size){
    for (int i = 0; i < size; ++i) {
        if(!arr[i]){
            return i;
        }
    }
    return -1;
}
