import math


def find_row(input, minimum, maximum):
    if minimum == maximum:
        return minimum
    if input[0] == "B":
        mean = math.ceil((minimum + maximum) / 2)
        return find_row(input[1:], mean, maximum)
    else:
        mean = math.floor((minimum + maximum) / 2)
        return find_row(input[1:], minimum, mean)


def find_column(input, minimum, maximum):
    if minimum == maximum:
        return minimum
    if input[0] == "R":
        mean = math.ceil((minimum + maximum) / 2)
        return find_column(input[1:], mean, maximum)
    else:
        mean = math.floor((minimum + maximum) / 2)
        return find_column(input[1:], minimum, mean)


def find_your_seat(ids):
    ids.sort()
    for id in range(min(ids), max(ids)):
        if id not in ids:
            if id + 1 in ids and id - 1 in ids:
                return id


with open("input") as input:
    boarding_passes = input.read().rstrip().split("\n")
    ids = []
    for boarding_pass in boarding_passes:
        row = find_row(boarding_pass[:7], 0, 127)
        column = find_column(boarding_pass[7:], 0, 7)
        ids.append(int(row * 8 + column))
    print(f"Maximum seat number is: {max(ids)}")
    my_seat = find_your_seat(ids)
    print(f"My seat nuber is : {my_seat}")
