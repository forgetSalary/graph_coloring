#ifndef GRAPHMATRIX_CONSOLECOLORS_H
#define GRAPHMATRIX_CONSOLECOLORS_H

#endif //GRAPHMATRIX_CONSOLECOLORS_H

#include <windows.h>
#include <stdio.h>

#define DEFAULT_CONSOLE_COLOR   7
#define std_hConsole            (GetStdHandle(STD_OUTPUT_HANDLE))
#define set_color(color)        SetConsoleTextAttribute(std_hConsole, color)

void patterns();