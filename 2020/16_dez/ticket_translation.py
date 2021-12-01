from operator import itemgetter


def part_1(ranges):
    flatten = []
    for r in ranges:
        for rang in r:
            flatten.append(rang)

    flatten = sorted(flatten, key=itemgetter(0))
    while len(flatten) >= 2:
        if flatten[0][1] >= flatten[1][0] and flatten[0][1] <= flatten[1][1]:
            new = [flatten[0][0], flatten[1][1]]
            flatten.pop(0)
            flatten[0] = new
        elif flatten[0][0] <= flatten[1][0] and flatten[0][1] >= flatten[1][1]:
            flatten.pop(1)
        elif flatten[0][1] < flatten[1][1]:
            flatten.append(flatten.pop(flatten[1]))

    return flatten[0]


with open("input", "r") as input:
    rules, mine, theirs = input.read().rstrip().split("\n\n")
    rules = rules.split("\n")
    my_rules = {}
    for rule in rules:
        rule, r = rule.split(":")
        if "or" in r:
            r = r.split("or")
        r = [rang.strip().split("-") for rang in r]
        r = [[int(ran) for ran in rang] for rang in r]
        my_rules[rule] = r

    _, mine = mine.split("\n")

    mine = mine.strip().split(",")
    mine = [int(mi) for mi in mine]

    theirs = theirs.split("\n")
    theirs.pop(0)
    theirs = [their.split(",") for their in theirs]
    theirs = [[int(the) for the in their] for their in theirs]

    r = part_1(my_rules.values())
    sum = 0
    popers = []
    for index, their in enumerate(theirs):
        for single in their:
            if single < r[0] or single > r[1]:
                sum += single
                popers.append(index)
                break
    print(sum)

    for index, pop in enumerate(popers):
        theirs.pop(pop - index)

    fields = [[] for _ in range(len(theirs[0]))]

    for their in theirs:
        for index, field in enumerate(their):
            fields[index].append(field)
    names = []
    for field in fields:
        possibilies = list(my_rules.keys())
        for index, r in enumerate(my_rules.values()):
            for nbr in field:
                if nbr < r[0][0] and nbr < r[1][0] or nbr > r[0][1] and nbr > r[1][1]:
                    possibilies[index] = ""
                    break
                elif nbr > r[0][1] and nbr < r[1][0]:
                    possibilies[index] = ""
                    break
        possibilies = list(filter(None, possibilies))
        names.append(possibilies)

    stop = False
    remove = []
    while not stop:
        for name in names:
            if len(name) == 1:
                remove.append(name[0])
                stop = True
            else:
                stop = False
                for n in name:
                    if n in remove:
                        name.remove(n)
    indicies = []
    for index, name in enumerate(names):
        if "departure" in name[0]:
            indicies.append(index)

    mul = 1
    for index in indicies:
        mul *= mine[index]
    print(mul)
