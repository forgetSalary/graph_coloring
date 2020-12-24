#include "consoleColors.h"

void patterns(){
    set_color(DEFAULT_CONSOLE_COLOR);
    printf("Default\n");
    for(int k = 1; k < 255; k++){
        set_color(k);
        printf("%d: I want to be nice today!\n",k);
    }
}
