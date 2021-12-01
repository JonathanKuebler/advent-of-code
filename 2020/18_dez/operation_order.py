import re


def compute_part1(expression):
    expression = expression.split(" ")
    sol = int(expression[0])
    for i in range(0, len(expression) - 1, 2):
        if expression[i + 1] == "*":
            sol *= int(expression[i + 2])
        else:
            sol += int(expression[i + 2])
    return sol


def compute_part2(expression):
    expression = expression.split(" ")
    sol = 0
    found = True
    while found:
        found = False
        index = 0
        if "+" in expression:
            index = expression.index("+")
            found = True
            expression[index] = int(expression[index - 1]) + int(expression[index + 1])
            del expression[index - 1]
            del expression[index]
        elif "*" in expression:
            index = expression.index("*")
            found = True
            expression[index] = int(expression[index - 1]) * int(expression[index + 1])
            del expression[index - 1]
            del expression[index]
    print(expression)
    return int(expression[0])


with open("input", "r") as input:
    expressions = input.read().rstrip().split("\n")
    sum_of_all = 0
    for expression in expressions:
        found = True
        while found:
            found = False
            brakets = re.findall(r"(?<=\()(.*?)(?=\))", expression)
            for braket in brakets:
                found = True
                tmp = braket.split("(")
                sol = compute_part1(tmp[-1])
                expression = expression.replace("(" + tmp[-1] + ")", str(sol))
        expression = compute_part1(expression)
        sum_of_all += expression
    print(sum_of_all)

    sum_of_all = 0
    for expression in expressions:
        found = True
        while found:
            found = False
            brakets = re.findall(r"(?<=\()(.*?)(?=\))", expression)
            print(expression)
            for braket in brakets:
                found = True
                tmp = braket.split("(")
                sol = compute_part2(tmp[-1])
                expression = expression.replace("(" + tmp[-1] + ")", str(sol))
            print(expression)
        expression = compute_part2(expression)
        sum_of_all += expression
    print(sum_of_all)
