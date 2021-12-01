import re


def flatten(new_l, l):
    for item in l:
        if isinstance(item, list):
            flatten(new_l, item)
        else:
            new_l.append(item)
    return new_l


def combine(rule1, rule2):
    cobs = []
    for ruls2 in rule2:
        for ruls1 in rule1:
            if isinstance(ruls2, list):
                if isinstance(ruls1, list):
                    for rul2 in ruls2:
                        for rul1 in ruls1:
                            cobs.append(rul1 + rul2)
                else:
                    for rul2 in ruls2:
                        cobs.append(ruls1 + rul2)
            else:
                if isinstance(ruls1, list):
                    for rul1 in ruls1:
                        cobs.append(rul1 + ruls2)
                else:
                    cobs.append(ruls1 + ruls2)
    cobs = list(dict.fromkeys(cobs))
    return cobs


def get_rule(rule):
    if rule.data is not None:
        return rule.data
    data = []
    if rule.child1 is not None:
        data.append(get_rule(rule.child1))
    if rule.child2 is not None:
        data.append(get_rule(rule.child2))
    if rule.child3 is not None:
        data.append(get_rule(rule.child3))
    if rule.child4 is not None:
        data.append(get_rule(rule.child4))
    real_data = []
    if rule.child2 is not None:
        real_data.append(combine(data[0], data[1]))
    else:
        real_data.append(data[0])
    if rule.child3 is not None:
        if rule.child4 is not None:
            real_data.append(combine(data[-2], data[-1]))
        else:
            real_data.append(data[-1])
    rl_dt = []
    for rl in real_data:
        if isinstance(rl[0], list):
            for r in rl:
                r = list(dict.fromkeys(r))
                rl_dt.append(r)
        else:
            rl = list(dict.fromkeys(rl))
            rl_dt.append(rl)
    rule.data = rl_dt
    return rule.data


class Rule:
    def __init__(self, number):
        self.number = number

        self.child1 = None
        self.child2 = None
        self.child3 = None
        self.child4 = None
        self.data = None

    # def __str__(self):
    #     return f"Nbr: {self.number} Data: {self.data} Children {self.child1}{self.child2}{self.child3}{self.child4}"


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
    rul = []
    for rule in rules:
        rul.append(Rule(rule[0]))

    for index, rule in enumerate(rules):
        if len(re.findall(r"\d", "".join(flatten([], rule[1])))) == 0:
            rul[index].data = flatten([], rule[1])

    for index, rule in enumerate(rules):
        if rul[index].data is not None:
            pass
        elif len(rule[1]) > 1:
            if len(rule[1][0]) > 1:
                rul[index].child1 = rul[int(rule[1][0][0])]
                rul[index].child2 = rul[int(rule[1][0][1])]
            else:
                rul[index].child1 = rul[int(rule[1][0][0])]
            if len(rule[1][0]) > 1:
                rul[index].child3 = rul[int(rule[1][1][0])]
                rul[index].child4 = rul[int(rule[1][1][1])]
            else:
                rul[index].child3 = rul[int(rule[1][1][0])]
        else:
            rul[index].child1 = rul[int(rule[1][0][0])]
            if len(rule[1][0]) >= 2:
                rul[index].child2 = rul[int(rule[1][0][1])]

    di = get_rule(rul[0])
    die = flatten([], di)
    input = input.split("\n")
    sum = 0
    indx = []
    for index, i in enumerate(input):
        for d in die:
            if i == d:
                indx.append(index)
                sum += 1
                break
    print(sum)
    print(rul[42].data)

    output = []
    for index, i in enumerate(input):
        if index not in indx:
            output.append(i)

    indx = []
    for index, i in enumerate(output):
        for d in die:
            for s in flatten([], rul[42].data):
                print(s +)
                if i == s + d:
                    indx.append(index)
                    sum += 1
                    break

    print(sum)

    for i in sorted(indx, reverse=True):
        output.pop(0)

    print(len(output))

    # 0: (8 11)
    # 11: (42 31 | 42 11 31)
    # 8: (42 | 42 8)
