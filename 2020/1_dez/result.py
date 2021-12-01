from aoc.helpers import read_input_from_file, output
import numpy as np

sum_number = 2020


def check_includes(nbr, split_input):
    try:
        index = split_input.index(nbr)
    except ValueError:
        return False
    return index


def find_product_2(input):
    for index, number_a in enumerate(input):
        summed_input = [x + number_a for x in input[index:]]
        found_index = check_includes(sum_number, summed_input)
        if found_index:
            return int(number_a * input[index + found_index])
    return False


def find_product_3(input):
    for index_a, number_a in enumerate(input):
        for index_b, number_b in enumerate(input[index_a:]):
            summed_input = [x + number_a + number_b for x in input[index_a + index_b :]]
            found_index = check_includes(sum_number, summed_input)
            if found_index:
                return int(number_a * number_b * input[index_a + index_b + found_index])
    return False


print(f"The product for part 1 is: {find_product_2(np.loadtxt('input.txt'))}")
print(f"The product for part 2 is: {find_product_3(np.loadtxt('input.txt'))}")
