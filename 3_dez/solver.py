import numpy as np


def travel_solver(input, slope):
    tree_counter = 0
    x_index = 0
    for y_index in range(int(input.shape[0] / slope[0])):
        if input[slope[0] * y_index, x_index] == "#":
            tree_counter += 1
        x_index = (x_index + slope[1]) % input.shape[1]
    return tree_counter


with open("input") as input:
    char_list = [list(char) for char in input.read().rstrip().split("\n")]
    array = np.array(char_list)
    tree_counter = travel_solver(array, (1, 3))
    print(f"The amount of trees hit in Part_1 is: {tree_counter}")

    slopes = [(1, 1), (1, 3), (1, 5), (1, 7), (2, 1)]
    tree_counter = 1
    for slope in slopes:
        tree_counter *= travel_solver(array, slope)
    print(f"The product of all trees hit for Part_2 is: {tree_counter}")
