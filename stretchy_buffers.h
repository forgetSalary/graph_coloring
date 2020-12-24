// Copyright Sean Barrett https://github.com/nothings/stb/blob/master/stretchy_buffer.h

#ifndef GRAPHMATRIX_STRECHED_BUFFERS_H
#define GRAPHMATRIX_STRECHED_BUFFERS_H

#endif //GRAPHMATRIX_STRECHED_BUFFERS_H

#include <stdint.h>
#include <stddef.h>
#include <malloc.h>
#include <assert.h>
#include <string.h>

#define MAX(x,y) ((x) >= (y) ? (x) : (y) )

typedef struct BufHdr_s{
    size_t len;
    size_t cap;
    char buf[0];
}BufHdr;

void* buf__grow(const void* buf, size_t new_len, size_t elem_size);

#define buf__hdr(b)             ((BufHdr*)((char*)b - offsetof(BufHdr, buf)))
#define buf__fits(b,n)          (buf_len(b) + (n) <= buf_cap(b))
#define buf__fit(b,n)           (buf__fits(b, n) ? 0 : ((b) = (buf__grow((b), buf_len(b) + (n), sizeof(*b)))))

#define buf_len(b)              ((b) ? buf__hdr(b)->len : 0)
#define buf_cap(b)              ((b) ? buf__hdr(b)->cap : 0)
#define buf_push(b,x)           (buf__fit(b,1), b[buf_len(b)] = (x), buf__hdr(b)->len++)
#define buf_last(b)             (b[buf_len(b)-1])
#define buf_free(b)             ((b) ? free(buf__hdr(b)) : 0)

#define buf_append(_dst,_src)   ((_dst) = (buf__grow((_dst), (buf_len(_dst)+buf_len(_src)), sizeof(*_dst)))), \
                                (memcpy((_dst+buf_len(_dst)),_src,(buf_len(_dst)+buf_len(_src)*sizeof(*_dst)))), \
                                buf__hdr(_dst)->len += buf_len(_src)
