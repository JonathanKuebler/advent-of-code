from seating_system import check_directions

with open("test_directions", "r") as input:
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

with open("test_more_directions", "r") as input:
    lines = input.read().rstrip().split("\n")
    new_map = []
    just_floor = [dot for dot in ("." * (len(lines[0]) + 2))]
    new_map.append(just_floor)
    for line in lines:
        seats = [position for position in line]
        seats.append(".")
        seats.insert(0, ".")
        new_map.append(seats)
    new_map.append(just_floor)


def test_check_directions():
    # assert check_directions(4, 4, seating_map) == 0
    assert check_directions(4, 2, new_map) == 3
