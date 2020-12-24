cmake_minimum_required(VERSION 3.17)
project(Coloring_graph C)

set(CMAKE_C_STANDARD 11)

SET(CMAKE_RUNTIME_OUTPUT_DIRECTORY "C:/code/webLearning/canvasGraph/cgi-bin")

add_executable(Coloring_graph main.c cgi.c cgi.h coloring.h coloring.c matrix.c matrix.h matrixgraph.c matrixgraph.h tools.h tools.c consoleColors.h consoleColors.c stretchy_buffers.c stretchy_buffers.h)