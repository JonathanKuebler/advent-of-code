import numpy as np

with open("input", "r") as input:
    start, ids = input.read().rstrip().split("\n")
    ids = ids.split(",")
    ids = [int(x) for x in ids if x != "x"]
    start = int(start)

    modulo = []

    for id in ids:
        modulo.append(start % id)

    modulo = np.array(ids) - np.array(modulo)
    print(ids[modulo[min(modulo)]] * min(modulo))

# with open("test_input", "r") as input:
#     _, ids = input.read().rstrip().split("\n")
#     ids = ids.split(",")

################# Maybe LinA will help? ###############################

# id_list = []
# for index, id in enumerate(ids):
#     if id != "x":
#         if int(id) - index <= 0:
#             index = int(id) - (index % int(id))
#         id_list.append([int(id), index])

# print(id_list)
# mul = 1
# index = 0
# while len(id_list) > index:
#     mul = mul * id_list[index][0]
#     print(id_list[index])
#     index += 1
# print(mul)
# string = "("
# for id in id_list:
#     string = string + "[x mod " + str(id[0]) + "=" + str(id[1]) + "], "
# string = string + "solve for x)"
# print(string)

with open("input", "r") as fp:
    lines = fp.readlines()

LINES = lines
start = int(LINES[0])
busses = ["x" if x == "x" else int(x) for x in LINES[1].split(",")]


def part2():
    mods = {bus: -index % bus for index, bus in enumerate(busses) if bus != "x"}
    print(mods)
    vals = list(reversed(sorted(mods)))
    val = mods[vals[0]]
    r = vals[0]
    print(r)
    print(vals)
    for b in vals[1:]:
        while val % b != mods[b]:
            val += r
        r *= b
    return val


print(part2())
