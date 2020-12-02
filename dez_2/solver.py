import re

def split_line(line):
    split = line.split(" ")
    positions = split[0].split("-")
    character = split[1].split(":")[0]
    search_string = split[2]
    pos1 = int(positions[0])
    pos2 = int(positions[1])
    return pos1, pos2, character, search_string

def check_password_part_1(line):
    min, max, character, search_string = split_line(line)
    number = len(re.findall(character, search_string))
    if min <= number and max >= number:
        return 1
    else:
        return 0

def check_password_part_2(line):
    pos1, pos2, character, search_string = split_line(line)
    if search_string[pos1-1] == character and search_string[pos2-1] != character:
        return 1
    elif search_string[pos1-1] != character and search_string[pos2-1] == character:
        return 1
    else:
        return 0

with open("input", "r") as input:
    lines = input.read().rstrip().split("\n")
    counter_part_1 = 0
    counter_part_2 = 0
    for line in lines:
        counter_part_1 = counter_part_1 + check_password_part_1(line)
        counter_part_2 = counter_part_2 + check_password_part_2(line)
    print(f"The number of correct passwords for Part_1 is: {counter_part_1}")
    print(f"The number of correct passwords for Part_2 is: {counter_part_2}")
