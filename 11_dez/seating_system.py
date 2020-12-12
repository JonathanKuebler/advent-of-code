from pprint import pprint
import copy


def check_adjacent(x, y, seating_map):
    counter = 0

    if seating_map[y - 1][x - 1] == "#":
        counter += 1
    if seating_map[y][x - 1] == "#":
        counter += 1
    if seating_map[y + 1][x - 1] == "#":
        counter += 1
    if seating_map[y - 1][x] == "#":
        counter += 1
    if seating_map[y + 1][x] == "#":
        counter += 1
    if seating_map[y - 1][x + 1] == "#":
        counter += 1
    if seating_map[y][x + 1] == "#":
        counter += 1
    if seating_map[y + 1][x + 1] == "#":
        counter += 1
    return counter


def check_directions(x, y, seating_map):
    counter = 0
    for i in range(1, x):
        if seating_map[y][x - i] == "#":
            counter += 1
            break
        if seating_map[y][x - i] == "L":
            break
    for i in range(1, len(seating_map[0]) - x):
        if seating_map[y][x + i] == "#":
            counter += 1
            break
        if seating_map[y][x + i] == "L":
            break
    for i in range(1, y):
        if seating_map[y - i][x] == "#":
            counter += 1
            break
        if seating_map[y - i][x] == "L":
            break
    for i in range(1, len(seating_map) - y):
        if seating_map[y + i][x] == "#":
            counter += 1
            break
        if seating_map[y + i][x] == "L":
            break
    for i in range(1, min(x, y)):
        if seating_map[y - i][x - i] == "#":
            counter += 1
            break
        if seating_map[y - i][x - i] == "L":
            break
    for i in range(1, min(x, len(seating_map) - y)):
        if seating_map[y + i][x - i] == "#":
            counter += 1
            break
        if seating_map[y + i][x - i] == "L":
            break
    for i in range(1, min(len(seating_map) - y, len(seating_map[0]) - x)):
        if seating_map[y + i][x + i] == "#":
            counter += 1
            break
        if seating_map[y + i][x + i] == "L":
            break
    for i in range(1, min(len(seating_map[0]) - x, y)):
        if seating_map[y - i][x + i] == "#":
            counter += 1
            break
        if seating_map[y - i][x + i] == "L":
            break
    return counter


def count_occupied(seating_map):
    counter = 0
    for y in range(1, len(seating_map) - 1):
        for x in range(1, len(seating_map[0]) - 1):
            if seating_map[y][x] == "#":
                counter += 1
    return counter


with open("input", "r") as input:
    lines = input.read().rstrip().split("\n")
    seating_map = []
    just_floor = [dot for dot in ("." * (len(lines[0]) + 2))]
    seating_map.append(just_floor)
    for line in lines:
        seats = [position for position in line]
        seats.append(".")
        seats.insert(0, ".")
        seating_map.append(seats)
    seating_map.append(just_floor)


change = True
while change:
    change = False
    new_map = copy.deepcopy(seating_map)
    for y in range(1, len(seating_map) - 1):
        for x in range(1, len(seating_map[0]) - 1):
            if seating_map[y][x] != ".":
                counter = check_adjacent(x, y, seating_map)
                if counter == 0 and seating_map[y][x] == "L":
                    new_map[y][x] = "#"
                    change = True
                elif counter >= 4 and seating_map[y][x] == "#":
                    new_map[y][x] = "L"
                    change = True
    seating_map = copy.deepcopy(new_map)

print(count_occupied(seating_map))

with open("input", "r") as input:
    lines = input.read().rstrip().split("\n")
    seating_map = []
    just_floor = [dot for dot in ("." * (len(lines[0]) + 2))]
    seating_map.append(just_floor)
    for line in lines:
        seats = [position for position in line]
        seats.append(".")
        seats.insert(0, ".")
        seating_map.append(seats)
    seating_map.append(just_floor)

change = True
while change:
    change = False
    new_map = copy.deepcopy(seating_map)
    for y in range(1, len(seating_map) - 1):
        for x in range(1, len(seating_map[0]) - 1):
            if seating_map[y][x] != ".":
                counter = check_directions(x, y, seating_map)
                if counter == 0 and seating_map[y][x] == "L":
                    new_map[y][x] = "#"
                    change = True
                elif counter >= 5 and seating_map[y][x] == "#":
                    new_map[y][x] = "L"
                    change = True
    seating_map = copy.deepcopy(new_map)

print(count_occupied(seating_map))
