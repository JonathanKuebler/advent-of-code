input = list("123487596")
input = [int(element) for element in input]
test_input = list("389125467")
test_input = [int(element) for element in test_input]
rest = []

# input: List of cups with the *current_cup* in pos 0 and clockwise all other cups
def one_round(cup_list):
    taken_out = cup_list[1:4]
    current_cup = cup_list[0]
    del cup_list[:4]

    destination_cup = 0
    indexer = 1
    while destination_cup == 0:
        if (current_cup - indexer) in cup_list:
            destination_cup = current_cup - indexer
        else:
            indexer = indexer + 1
        if current_cup - indexer < min(cup_list):
            destination_cup = max(cup_list)

    index = cup_list.index(destination_cup) + 1

    for i in range(len(taken_out)):
        cup_list.insert(index + i, taken_out[i])

    cup_list.append(current_cup)

    return cup_list


def one_round_part_2(cup_list):
    if -1 in cup_list[:4]:
        index = cup_list.index(-1)
        for i in range(3):
            cup_list.insert(index + i, rest.pop(rest.index(min(rest))))
    taken_out = cup_list[1:4]
    current_cup = cup_list[0]
    del cup_list[:4]

    destination_cup = 0
    indexer = 1
    while destination_cup == 0:
        if (current_cup - indexer) in cup_list:
            destination_cup = current_cup - indexer
        else:
            indexer = indexer + 1
        if current_cup - indexer < min(cup_list) + 1:
            if max(cup_list) < max(rest):
                destination_cup = rest.pop(rest.index(max(rest)))
                cup_list.append(destination_cup)

    index = cup_list.index(destination_cup) + 1

    for i in range(len(taken_out)):
        cup_list.insert(index + i, taken_out[i])

    cup_list.append(current_cup)
    return cup_list


### Part 1
# for i in range(100):
#     input = one_round(input)

# index = input.index(1)

# for i in range(index):
#     input.append(input.pop(0))

# solution = ""
# for element in input[1:]:
#     solution += str(element)

# print(solution)

for i in range(max(input) + 1, 1000000 + 1):
    rest.append(i)

input.append(-1)

for i in range(10000000):
    print(input)
    if i % 1000 == 0:
        print(i)
    input = one_round_part_2(input)

print(len(input))
index = input.index(1)
print(input[index + 1] * input[index + 2])
