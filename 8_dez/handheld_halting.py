import numpy as np


def run(commands, accumulater, used_commands, index):
    if len(used_commands) <= index:
        print(f"WORKING {accumulater}")
        return accumulater
    if used_commands[index] == 1:
        return accumulater
    elif commands[index][0] == "nop":
        used_commands[index] = 1
        index += 1
        return run(commands, accumulater, used_commands, index)
    elif commands[index][0] == "acc":
        if commands[index][1][0] == "+":
            accumulater += int(commands[index][1][1:])
        else:
            accumulater -= int(commands[index][1][1:])
        used_commands[index] = 1
        index += 1
        return run(commands, accumulater, used_commands, index)
    else:
        used_commands[index] = 1
        if commands[index][1][0] == "+":
            index += int(commands[index][1][1:])
        else:
            index -= int(commands[index][1][1:])
        return run(commands, accumulater, used_commands, index)


with open("input", "r") as input:
    input = input.read().rstrip()
    commands = input.split("\n")
    commands = [line.split(" ") for line in commands]
    used_commands = np.zeros(len(commands))
    index = 0
    accumulater = 0
    print(f"Result Part 1: {run(commands, accumulater, used_commands, index)}")

    tester = commands.copy()

    for i in range(0, len(commands)):
        index = 0
        accumulater = 0
        used_commands = np.zeros(len(commands))
        if commands[i][0] == "jmp":
            commands[i][0] = "nop"
            run(commands, accumulater, used_commands, index)
            commands[i][0] = "jmp"
        elif commands[i][0] == "nop":
            commands[i][0] = "jmp"
            run(commands, accumulater, used_commands, index)
            commands[i][0] = "nop"
