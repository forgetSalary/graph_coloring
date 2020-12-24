#include "coloring.h"

//void test_algo(){
//    FILE* test_matrix = fopen(HOME_DIR"test.txt","r");
//    matrix_graph* graph = init_graph_from_stream(test_matrix);
//    row(graph->vertexes,graph->size,0,i)
//    indp_sets_out(graph);
//    matrixGraph_free(graph);
//}

int main(int argc,char** argv) {
    matrix_graph* graph = init_graph_from_cgi_client();
    printf("Content-type: text/plain\n\n");
    indp_sets_out(graph);
    matrixGraph_free(graph);
    return 0;
}
