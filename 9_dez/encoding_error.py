import itertools


def find_part_1(xmas):
    for index in range(0, len(xmas[25:])):
        numbers = set(xmas[index : index + 25])
        result = [
            seq
            for seq in itertools.combinations(numbers, 2)
            if sum(seq) == xmas[index + 25]
        ]
        if len(result) == 0:
            return xmas[index + 25]
    return False


def find_part_2(xmas, invalid_number):
    for start_index in range(len(xmas)):
        summ = 0
        end_index = start_index + 1
        while summ <= invalid_number:
            summ = sum(xmas[start_index:end_index])
            if summ == invalid_number:
                return max(xmas[start_index:end_index]) + min(
                    xmas[start_index:end_index]
                )
            else:
                end_index += 1
    return False


with open("input", "r") as input:
    xmas = input.read().rstrip().split()
    xmas = [int(i) for i in xmas]

    invalid_number = find_part_1(xmas)
    print(invalid_number)
    print(find_part_2(xmas, invalid_number))
