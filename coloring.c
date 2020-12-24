#include "coloring.h"

static void mark_set_as_visited(bool* visited, int** indp_sets){
    for (int i = 0; i < buf_len(indp_sets); ++i) {
        for (int j = 0; j < buf_len(indp_sets[i]); ++j) {
            visited[indp_sets[i][j]]=1;
        }
    }
}

int** indp_sets_buf(matrix_graph* graph){
    int** sets = NULL;//массив незавсимых множеств (далее НМ) вершин
    bool* visited = (bool*)calloc(graph->size,1);//см. по телу цикла
    int v_index = 0;//следующий эллемент НМ
    int count = 0;

    while (v_index!=-1){
        buf_push(sets,NULL);//создаем новое НМ
        while (v_index!=-1){
            visited[v_index]=1; //здесь visited хранит все вершины всех НМ,
            // и все смежные врешины, каждой вершины текущего НМ
            buf_push(sets[count],v_index);// пополняем текущее НМ

            for (int i = 0; i < graph->size; ++i) {
                if ((graph->matrix[v_index][i] or graph->matrix[i][v_index]) and !visited[i]){
                    visited[i]=1;
                }
            }
            v_index = fst_false(visited,graph->size);// находим подходящую вершину для текущего НМ, если есть
        }//если такой вершины не нашлось, то еще одно НМ найдено

        memset(visited,0,graph->size);  //
        mark_set_as_visited(visited,sets);     //здесь visited хранит только лишь все вершины всех НМ

        v_index = fst_false(visited,graph->size);// находим первую вершину следующего НМ, если есть
        count++;
    }                                           // если нет, то все независимые множества найдены
    free(visited);

    return sets;
}

void indp_sets_out(matrix_graph* graph){
    int* current_set = new_block(int,graph->size);
    int set_size = 0;
    bool* visited = (bool*)calloc(graph->size,1);
    int v_index = 0;

    while (graph->size>0){
        set_size = 0;
        while (v_index!=-1){
            visited[v_index]=1;
            current_set[set_size] = graph->vertexes[v_index];

            for (int i = 0; i < graph->size; ++i) {
                if ((graph->matrix[v_index][i] or graph->matrix[i][v_index]) and !visited[i]){
                    visited[i]=1;
                }
            }
            set_size++;
            v_index = fst_false(visited,graph->size);
        }
        memset(visited,0,graph->size);
        for (int i = 0; i < set_size; i++) {
            printf("%d,",current_set[i]);
            remove_vertex(graph,get_int_index_binary(graph->vertexes,graph->size,current_set[i]));
        }
        printf("\n");

        v_index = 0;
    }

    free(visited);
    free(current_set);
}

void log_indp_sets(FILE* stream, int** sets){
    for (int i = 0; i < buf_len(sets); ++i) {
        for (int j = 0; j < buf_len(sets[i]); ++j) {
            fprintf(stream,"%d,",sets[i][j]);
        }
        fprintf(stream,"\n");
    }
}

void free_indp_sets(int** sets){
    for (int i = 0; i < buf_len(sets); ++i) {
        buf_free(sets[i]);
    }
    buf_free(sets);
}