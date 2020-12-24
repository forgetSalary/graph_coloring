#include "cgi.h"

char* post_data(int content_len){
    if (!strcmp(REQ_MTD,"POST")){
        char* post_data = NULL;
        if (content_len != 0) {
            post_data = (char*)malloc(content_len);

            char next_char = NULL;
            int count = 0;
            while (next_char!=EOF && count<content_len){
                next_char = fgetc(stdin);
                post_data[count] = next_char;
                count ++;
            }
            post_data[content_len-1]=0;
        }
        return post_data;
    }
    return NULL;
}