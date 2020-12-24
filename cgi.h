#ifndef GRAPHMATRIX_CGI_H
#define GRAPHMATRIX_CGI_H

#endif //GRAPHMATRIX_CGI_H
#include "stdlib.h"
#include "stdio.h"
#include "string.h"

#define REQ_MTD         getenv("REQUEST_METHOD")
#define CONTENT_TYPE    getenv("CONTENT_TYPE")
#define CONTENT_LENGTH  atoi(getenv("CONTENT_LENGTH"))

char* post_data(int content_len);