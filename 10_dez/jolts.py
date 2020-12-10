def part_1(adapters):
    adapters.sort()
    adapters.insert(0, 0)
    occurence_1 = 0
    occurence_3 = 0
    diff_list = []
    for i in range(0, len(adapters) - 1):
        diff = adapters[i + 1] - adapters[i]
        diff_list.append(diff)
        if diff == 1:
            occurence_1 += 1
        else:
            occurence_3 += 1
    product = occurence_1 * (occurence_3 + 1)
    return product, diff_list


def part_2(diff_list):
    multiplier = 1
    diff_lists = []
    last_index = 0

    for index, diff in enumerate(diff_list):
        if diff == 3:
            diff_lists.append(diff_list[last_index:index])
            last_index = index + 1
    diff_lists.append(diff_list[last_index:])

    diff_lists = [diff_list for diff_list in diff_lists if len(diff_list) > 1]
    multiplier = 1

    ##As I couldn't find a better solution I just wrote down the number of
    # possible permutations..
    for diff_list in diff_lists:
        if len(diff_list) == 4:
            multiplier *= 7
        if len(diff_list) == 3:
            multiplier *= 4
        if len(diff_list) == 2:
            multiplier *= 2
    return multiplier


with open("input", "r") as input:
    adapters = input.read().rstrip().split("\n")
    adapters = [int(adapter) for adapter in adapters]

    product, diff_list = part_1(adapters)
    print(f"The Solution to part one is {product}")

    multiplier = part_2(diff_list)
    print(f"The Solution to part two is {multiplier}")
