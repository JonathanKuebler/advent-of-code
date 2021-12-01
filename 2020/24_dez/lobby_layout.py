# east = "e"
# south_east = "se"
# south_west = "sw"
# west = "w"
# north_west = "nw"
# north_east = "ne"

from collections import defaultdict


def next_days(days):
    new_days = []
    found = defaultdict(int)
    for day in days:
        east_west = day[0]
        south_north = day[1]
        neighbours = [
            (east_west + 1, south_north),
            (east_west - 1, south_north),
            (east_west - 0.5, south_north + 1),
            (east_west - 0.5, south_north - 1),
            (east_west + 0.5, south_north + 1),
            (east_west + 0.5, south_north - 1),
        ]
        counter = 0
        for neighbour in neighbours:
            if neighbour in days:
                counter += 1
            else:
                found[neighbour] += 1

        if counter == 0 or counter > 2:
            pass
        else:
            new_days.append(day)

    for single in found.keys():
        if found[single] == 2:
            new_days.append(single)

    return new_days


with open("input", "r") as input:
    input = input.read().rstrip().split("\n")

    tiles = []
    for line in input:
        east = line.count("e") - (0.5 * (line.count("se") + line.count("ne")))
        west = line.count("w") - (0.5 * (line.count("sw") + line.count("nw")))
        south = line.count("sw") + line.count("se")
        north = line.count("nw") + line.count("ne")

        east_west = east - west

        south_north = south - north

        tiles.append((east_west, south_north))

    parts = set(tiles)
    days = []
    counter = 0
    for part in parts:
        tmp = tiles.count(part)
        if tmp % 2 != 0:
            counter += 1
            days.append(part)

    print(counter)

    for i in range(100):
        days = next_days(days)

    print(len(days))
