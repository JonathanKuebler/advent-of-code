from solver import travel_solver
import numpy as np

input_list = [
    "..##.......",
    "#...#...#..",
    ".#....#..#.",
    "..#.#...#.#",
    ".#...##..#.",
    "..#.##.....",
    ".#.#.#....#",
    ".#........#",
    "#.##...#...",
    "#...##....#",
    ".#..#...#.#",
]

correct_list = [list(word) for word in input_list]

array = np.array(correct_list)


def test_travel_solver():
    assert travel_solver(array, (1, 3)) == 7
