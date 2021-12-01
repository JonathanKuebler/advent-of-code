import numpy as np


def next(commands, direction, waypoint=False):
    location = np.array([0, 0])
    for command in commands:
        if command[0] == "F":
            location = location + command[1] * direction
        elif command[0] == "N":
            if waypoint:
                direction += [0, command[1]]
            else:
                location += [0, command[1]]
        elif command[0] == "S":
            if waypoint:
                direction += [0, -command[1]]
            else:
                location += [0, -command[1]]
        elif command[0] == "E":
            if waypoint:
                direction += [command[1], 0]
            else:
                location += [command[1], 0]
        elif command[0] == "W":
            if waypoint:
                direction += [-command[1], 0]
            else:
                location += [-command[1], 0]
        elif command[0] == "R":
            theta = np.deg2rad(360 - command[1])
            cs = np.cos(theta)
            sn = np.sin(theta)
            new_x = direction[0] * cs - direction[1] * sn
            new_y = direction[0] * sn + direction[1] * cs
            direction = np.array([new_x, new_y])
        elif command[0] == "L":
            theta = np.deg2rad(command[1])
            cs = np.cos(theta)
            sn = np.sin(theta)
            new_x = direction[0] * cs - direction[1] * sn
            new_y = direction[0] * sn + direction[1] * cs
            direction = np.array([new_x, new_y])
    return int(np.ceil(np.abs(location[0]) + np.abs(location[1])))


with open("input", "r") as input:
    input = input.read().rstrip().split("\n")
    commands = [[c[0], int(c[1:])] for c in input]

##Part 1
direction = np.array([1, 0])
print(next(commands, direction))

##Part 2
direction = np.array([10, 1])
print(next(commands, direction, True))
