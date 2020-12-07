import re


class Bag:
    def __init__(self, color, can_hold, amount):
        self.color = color
        self.can_hold = can_hold
        self.amount = amount
        self.counted = False

    def holds(self, color):
        for bag in self.can_hold:
            if bag == color:
                return True
        return False

    def count(self):
        self.counted = not self.counted

    def __str__(self):
        return f"{self.color} Bag, Holds: {self.can_hold}, Amount: {self.amount}"


def count_gold_bags(list_of_bags, counter, next_to_find):
    found_bags = []
    for bag in list_of_bags:
        if bag.holds(next_to_find) and bag.counted != True:
            counter += 1
            bag.count()
            found_bags.append(bag)
    if len(found_bags) == 0:
        return counter
    for bag in found_bags:
        counter += count_gold_bags(list_of_bags, 0, bag.color)
    return counter


def find_bags_in_bag(list_of_bags, counter, color):
    next_bags = []
    for bag in list_of_bags:
        if bag.color == color:
            for index, next_bag in enumerate(bag.can_hold):
                next_bags.append((next_bag, bag.amount[index]))

    if len(next_bags) == 0:
        return 1

    for next_bag in next_bags:
        counter = counter + (
            next_bag[1] * find_bags_in_bag(list_of_bags, 1, next_bag[0])
        )
    return counter


def create_list_of_bags(rules):
    rules = [re.sub(r"(\d+)", "\n\\1", rule) for rule in rules]

    rules = [re.sub(r"contain", "", rule) for rule in rules]
    rules = [rule.replace(",", "") for rule in rules]
    rules = [rule.replace(".", "") for rule in rules]
    rules = [rule.replace("bags", "bag") for rule in rules]
    rules = [rule.split("\n") for rule in rules]

    list_of_bags = []
    for rule in rules:
        can_hold = []
        amount = []
        for bag in rule[1:]:
            can_hold.append(bag[2:].strip())
            amount.append(int(bag[:2].strip()))
        list_of_bags.append(Bag(rule[0].strip(), can_hold, amount))
    return list_of_bags


with open("input", "r") as input:
    rules = input.read().rstrip().split("\n")

    list_of_bags = create_list_of_bags(rules)

    print(count_gold_bags(list_of_bags, 0, "shiny gold bag"))

    list_of_bags = create_list_of_bags(rules)

    print(find_bags_in_bag(list_of_bags, 0, "shiny gold bag"))
