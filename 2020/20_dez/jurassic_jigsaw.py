import numpy as np
import math
import re
import copy
from collections import defaultdict


class Tile:
    def __init__(self, number, data):
        self.number = number
        self.data = data

        sides = []
        for _ in range(4):
            data = np.rot90(data, axes=(0, 1))
            side = data[0][:].tolist()
            sides.append(side)
            sides.append(side[::-1])

        self.sides = sides

        self.neighbours = None

        self.neighbour_indicies = None


def find_orientation(tile):
    neighbour_direction = {}
    for neighbour in tile.neighbour_indicies.keys():
        indicies = tile.neighbour_indicies[neighbour]
        if 1 in indicies:
            neighbour_direction[neighbour] = "left"
        elif 2 in indicies:
            neighbour_direction[neighbour] = "bottom"
        elif 4 in indicies:
            neighbour_direction[neighbour] = "right"
        elif 6 in indicies:
            neighbour_direction[neighbour] = "top"
        else:
            print("SOMETHING IS WRONG!!!")


def find_line(tile_list, corner_list, image_line, pos):
    if image_line[-1] in corner_list:
        return image_line
    if pos >= len(image_line):
        image_line[pos - 1] = 0
        return None
    for tile in tile_list:
        if image_line[pos - 1] in tile.neighbours:
            image_line[pos] = tile.number
            ret = find_line(tile_list, corner_list, image_line, pos + 1)
            if ret is not None:
                return image_line


def get_tile(tile_list, number):
    for tile in tile_list:
        if tile.number == number:
            return tile


def find_orientation(tile_list, number_matrix, x_pos, y_pos):
    tile = get_tile(tile_list, number_matrix[y_pos][x_pos])
    if x_pos == len(number_matrix[0]) and y_pos == len(number_matrix):
        tile_top = get_tile(tile_list, number_matrix[y_pos - 1][x_pos])
        tile_left = get_tile(tile_list, number_matrix[y_pos][x_pos - 1])
        if (
            tile.data[0][:].tolist() == tile_top.data[-1][:]
            and tile.data[:][0].tolist() == tile_left.data[:][-1].tolist()
        ):
            return tile_list
        else:
            return False


def createTiles(input):
    tile_list = []
    for tile in input:
        lines = tile.split("\n")
        number = int(re.findall(r"\d+", lines[0])[0])

        tile_data = []
        for line in lines[1:]:
            tile_data.append(list(line.replace(".", "0").replace("#", "1")))
        tile_list.append(Tile(number, np.array(tile_data)))

    return tile_list


with open("test_input", "r") as input:
    input = input.read().rstrip().split("\n\n")

    tile_list = createTiles(input)
    found = []
    for tile in tile_list:
        neighbour_list = []
        neighbour_indicies = defaultdict(list)
        for other in tile_list:
            if other != tile:
                for side in other.sides:
                    if side in tile.sides:
                        neighbour_indicies[other.number].append(tile.sides.index(side))
                        neighbour_list.append(other.number)
        tile.neighbour_indicies = neighbour_indicies
        tile.neighbours = set(neighbour_list)

    side_length = int(math.sqrt(len(tile_list)))
    final_numbers = np.zeros((side_length, side_length))
    edges = []
    for tile in tile_list:
        if len(tile.neighbours) == 2:
            edges.append(tile.number)

    final_numbers[0][0] = edges[0]
    final_numbers[0] = find_line(
        copy.deepcopy(tile_list),
        copy.deepcopy(edges[1:]),
        copy.deepcopy(final_numbers[0]),
        pos=1,
    )
    print(final_numbers)
    for x in range(1, side_length):
        for y in range(0, side_length):
            for tile in tile_list:
                if (
                    final_numbers[x - 1][y] in tile.neighbours
                    and tile.number not in final_numbers
                ):
                    final_numbers[x][y] = tile.number
    print(final_numbers)

    image_with_borders = np.zeros((side_length * 10, side_length * 10))

    for tile in tile_list:
        print(tile.number, tile.neighbour_indicies)
        print(len(tile.sides))

    # for x in range(0, side_length * 10, 10):
    #     for y in range(0, side_length * 10, 10):
    #         nbr = final_numbers[x / 10][y / 10]
    #         for tile in tile_list:
    #             if nbr == tile.number:
    #                 pass
    # image_with_borders[x:10][y:10] =
