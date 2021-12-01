class Food:
    def __init__(self, ingridients, allergenes):
        self.ingridients = ingridients
        self.allergenes = allergenes


def flatten(new_l, l):
    for item in l:
        if isinstance(item, list):
            flatten(new_l, item)
        else:
            new_l.append(item)
    return new_l


with open("input", "r") as input:
    lines = input.read().rstrip().split("\n")

    food_list = []
    allergen_list = []

    for line in lines:
        ingridients, allergenes = line.split(" (")
        allergenes = allergenes.split(")")[0].split(" ")[1:]
        allergenes = [allergen.replace(",", "") for allergen in allergenes]
        for allergen in allergenes:
            allergen_list.append(allergen)
        ingridients = ingridients.split(" ")
        food_list.append(Food(ingridients, allergenes))

    allergen_list = set(allergen_list)

    should_belong = {}

    for allergene in allergen_list:
        found_list = []
        for food in food_list:
            if allergene in food.allergenes:
                found_list.append(food.ingridients)
        rest = found_list[0]
        for found in found_list:
            rest = list(set(found) & set(rest))
        should_belong[allergene] = rest

    meaning_clear = set(flatten([], should_belong.values()))

    counter = 0

    for food in food_list:
        for item in food.ingridients:
            if item not in meaning_clear:
                counter += 1
    print(counter)

    found = {}
    while len(should_belong) != len(found):
        for key in should_belong:
            if len(should_belong[key]) == 1:
                found[key] = should_belong[key]
                for other in should_belong:
                    if key != other:
                        if found[key][0] in should_belong[other]:
                            should_belong[other].remove(found[key][0])

    output = ""
    for key in sorted(found):
        output += found[key][0] + ","

    print(output[:-1])
