import re
from collections.abc import Iterable


def flatten(new_l, l):
    for item in l:
        if isinstance(item, list):
            flatten(new_l, item)
        else:
            new_l.append(item)
    return new_l


def rule_replace(rule, rules):
    print(rule)
    print(flatten([], rule))
    if re.findall(r"\d", "".join(flatten([], rule[1]))) == []:
        new_rule = []
        for nbrs in rule[1]:
            new_nbrs = []
            for nbr in nbrs:
                new_nbrs.append("".join(flatten([], nbr)))
            new_rule.append(new_nbrs)
        return new_rule
    for index, nbrs in enumerate(rule[1]):
        new_nbrs = []
        for nbr in nbrs:
            new_nbrs.append(rule_replace(rules[int(nbr)], rules))
        rule[1][index] = flatten([], new_nbrs)
    return rule


with open("input", "r") as input:
    rules, input = input.read().rstrip().split("\n\n")
    rules = rules.split("\n")
    rules = [rule.split(":") for rule in rules]

    for rule in rules:
        rule[0] = int(rule[0])
        rule[1] = rule[1].split("|")
        rule[1] = [subrule.strip() for subrule in rule[1]]
        rule[1] = [subrule.replace('"', "") for subrule in rule[1]]
        rule[1] = [subrule.split(" ") for subrule in rule[1]]

    rules.sort(key=lambda x: x[0])

    print(rule_replace(rules[0], rules))
