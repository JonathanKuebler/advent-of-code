def find_intersect(group):
    persons = group.split("\n")
    first_person = persons[0]
    for person in persons[1:]:
        first_person = set(first_person).intersection(person)
    return len(first_person)


with open("input", "r") as input:
    input = input.read().split("\n\n")
    sum_part_1 = sum([len(set(group.replace("\n", ""))) for group in input])
    print(f"Part_1 solution: {sum_part_1}")

    counter = 0
    for group in input:
        counter += find_intersect(group)
    print(f"Part_2 solution: {counter}")
