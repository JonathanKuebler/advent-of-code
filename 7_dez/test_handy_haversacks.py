import re
from handy_haversacks import count_gold_bags, find_bags_in_bag, Bag

with open("test_input", "r") as input:
    rules = input.read().rstrip().split("\n")
    rules = [re.sub(r"(\d+)", "\n\\1", rule) for rule in rules]

    rules = [re.sub(r"contain", "", rule) for rule in rules]
    rules = [rule.replace(",", "") for rule in rules]
    rules = [rule.replace(".", "") for rule in rules]
    rules = [rule.replace("bags", "bag") for rule in rules]
    rules = [rule.split("\n") for rule in rules]

    for rule in rules:
        rule = [bag.strip(" ") for bag in rule]

    list_of_bags_1 = []
    for rule in rules:
        can_hold = []
        amount = []
        for bag in rule[1:]:
            can_hold.append(bag[2:].strip())
            amount.append(int(bag[:2].strip()))
        list_of_bags_1.append(Bag(rule[0].strip(), can_hold, amount))

with open("test_input_2", "r") as input:
    rules = input.read().rstrip().split("\n")
    rules = [re.sub(r"(\d+)", "\n\\1", rule) for rule in rules]

    rules = [re.sub(r"contain", "", rule) for rule in rules]
    rules = [rule.replace(",", "") for rule in rules]
    rules = [rule.replace(".", "") for rule in rules]
    rules = [rule.replace("bags", "bag") for rule in rules]
    rules = [rule.split("\n") for rule in rules]

    for rule in rules:
        rule = [bag.strip(" ") for bag in rule]

    list_of_bags_2 = []
    for rule in rules:
        can_hold = []
        amount = []
        for bag in rule[1:]:
            can_hold.append(bag[2:].strip())
            amount.append(int(bag[:2].strip()))
        list_of_bags_2.append(Bag(rule[0].strip(), can_hold, amount))


def test_find_gold_bag():
    assert count_gold_bags(list_of_bags_1, 0, "shiny gold bag") == 4


def test_find_number_of_bags():
    assert find_bags_in_bag(list_of_bags_2, 0, "shiny gold bag", 1) == 126
    assert find_bags_in_bag(list_of_bags_1, 0, "shiny gold bag", 1) == 32
