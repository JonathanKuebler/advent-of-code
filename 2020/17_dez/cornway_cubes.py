import numpy as np
import scipy as sc

WINDOW = np.ones((3, 3, 3, 3))
WINDOW[1, 1, 1, 1] = 0

CYCLES = 7


def next_cycle(cubes):
    new_state = np.zeros(cubes.shape)
    for x in range(1, cubes.shape[0] - 1):
        for y in range(1, cubes.shape[1] - 1):
            for z in range(1, cubes.shape[2] - 1):
                for w in range(1, cubes.shape[3] - 1):
                    state = cubes[x, y, z, w]
                    s = np.sum(
                        np.multiply(
                            cubes[
                                x - 1 : x + 2,
                                y - 1 : y + 2,
                                z - 1 : z + 2,
                                w - 1 : w + 2,
                            ],
                            WINDOW,
                        )
                    )
                    if state == 1.0 and 2.0 <= s <= 3.0:
                        new_state[x, y, z, w] = 1.0
                    elif state == 0 and s == 3.0:
                        new_state[x, y, z, w] = 1.0
    cubes = new_state
    return cubes


with open("input", "r") as input:
    input = input.read().rstrip().split("\n")
    input = [line.split() for line in input]
    start = np.zeros((len(list(input[0][0])), len(input), 1, 1))
    for y_index, line in enumerate(input):
        for x_index, element in enumerate(list(line[0])):
            if element == ".":
                start[y_index, x_index, 0] = 0
            else:
                start[y_index, x_index, 0] = 1

    start = np.pad(
        start,
        ((CYCLES, CYCLES), (CYCLES, CYCLES), (CYCLES, CYCLES), (CYCLES, CYCLES)),
        "constant",
    )
    print(np.sum(start))
    for i in range(CYCLES - 1):
        start = next_cycle(start)
        print(np.sum(start))
