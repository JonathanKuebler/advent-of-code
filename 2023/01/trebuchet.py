
numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

with open("input", "r") as inpt:
    lines = inpt.read().split("\n")
    sum = 0
    for line in lines:

        value = ""
        string_line = ""
        reversed_line = ""
        done = False
        for el in line:
            string_line += el
            for number in numbers:
                if number in string_line:
                    value = str(numbers.index(number)+1)
                    done = True
            if done == True:
                break
            if el.isdigit():
                value = el
                break
        done = False
        for el in reversed(line):
            reversed_line = el + reversed_line
            for number in numbers:
                if number in reversed_line:
                    value += str(numbers.index(number)+1)
                    done = True
            if done == True:
                break
            if el.isdigit():
                value += el
                break
        print(line)
        print(value)
        sum += int(value)

    print(sum)