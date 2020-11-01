---
title: 'One way of doing dependency injection with C'
date: '2020-11-01'
---

I'm teaching C programming at the Danish Technical University and I was trying to explain to my students a little bit of how to test.

I find this cool library called [MinUnit](http://www.jera.com/techinfo/jtns/jtn002.html) which is just 4 lines of code:

~~~ c
/* file: minunit.h */
#define mu_assert(message, test) do { if (!(test)) return message; } while (0)
#define mu_run_test(test) do { char *message = test(); tests_run++; \
                                if (message) return message; } while (0)
extern int tests_run;
~~~

This allows you to organize a test file this way:
~~~ c
#include "minunit.h"
#include "function_under_test_source.c"
static char *test_ac1() {
    mu_assert("max char, should broke, it didn't",
              function_under_test() == 1);
    return 0;
}
static char *all_tests() {
    mu_run_test(test_ac1);
    return 0;
}
int main(int argc, char **argv) {
    char *result = all_tests();
    if (result != 0) {
        printf("%s\n", result);
    } else {
        printf("ALL TESTS PASSED\n");
    }
    printf("Tests run: %d\n", tests_run);

    return result != 0;
}
~~~

Really cool. I was writing a function to read a string from input stream that doesn't overflow if put more chars than allowed ones. (I can't post it since it's part of the assignment for my students)

But I was having the problem of testing it because it uses `getchar` from `stdio.h`.

I wanted to teach my students how to test, and hopefully a little bit of TDD. With pointer to function is actually quite easy:

~~~ c
int get_string(char s[], int maxChar, int (*getchar)()) {
~~~

This means I'm passing a pointer to a function called `getchar` that return an int and accept no arguments, like the actual `getchar` from `stdio.h`.

So you can create a mock function to mimic I/O like:
~~~ c
const char *mock_getchar_data_ptr;

char        mock_getchar() {
    return *mock_getchar_data_ptr++;
}
~~~

and on the test you just create the string you want to read.

~~~ c
static char *test_ac2() {
    char text[100];
    mock_getchar_data_ptr = "\nhello!\n"; // the initial \n is there because I'm using scanf on production code (main.c)
    get_string(text, 100, mock_getchar);
    mu_assert("text is hello", strcmp(text, "hello!") == 0);
    return 0;
}
~~~

Pretty neat, right?

I'm no expert on this so if you have any advices, just write me on [twitter](https://twitter.com/IsTDDDeadYet)