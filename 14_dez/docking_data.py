def mask_adress_decoder(memory_adress, mask, memory_dict, index):
    if index == len(mask):
        new = ""
        for char in memory_adress:
            new += char
        memory_dict[int(new, 2)] = "".zfill(36)
        return memory_dict
    if mask[index] == "1":
        memory_adress[index] = "1"
        memory_dict = mask_adress_decoder(memory_adress, mask, memory_dict, index + 1)
    if mask[index] == "0":
        memory_dict = mask_adress_decoder(memory_adress, mask, memory_dict, index + 1)
    if mask[index] == "X":
        memory_adress[index] = "1"
        memory_dict = mask_adress_decoder(memory_adress, mask, memory_dict, index + 1)
        memory_adress[index] = "0"
        memory_dict = mask_adress_decoder(memory_adress, mask, memory_dict, index + 1)
    return memory_dict


def solution_1(commands):
    memory = {}
    for command in commands:
        if "mask" in command[0]:
            mask = command[1]
        if "mem" in command[0]:
            resulting_bits = command[1]
            memory_adress = list("{0:b}".format(int(command[0][4:-1])).zfill(36))
            new_entries = mask_adress_decoder(memory_adress, list(mask), {}, 0)
            for entrie in new_entries.keys():
                memory[entrie] = resulting_bits
    sum = 0
    for mem in memory.values():
        sum += int(mem, 2)
    return sum


def solution_2(commands):
    memory = {}
    for command in commands:
        if "mask" in command[0]:
            mask = command[1]
        if "mem" in command[0]:
            resulting_bits = ""
            for index, bit in enumerate(command[1]):
                if mask[index] == "X":
                    resulting_bits = resulting_bits + bit
                elif mask[index] == "0":
                    resulting_bits = resulting_bits + "0"
                elif mask[index] == "1":
                    resulting_bits = resulting_bits + "1"
            memory[command[0][4:-1]] = resulting_bits
    sum = 0
    for mem in memory.values():
        sum += int(mem, 2)
    return sum


with open("input", "r") as input:
    input = input.read().rstrip().split("\n")
    commands = []
    for line in input:
        command, param = line.split("=")
        if "mem" in command:
            param = "{0:b}".format(int(param)).zfill(36)
            param = param
        commands.append([command.strip(), param.strip()])
    print(solution_1(commands))
    print(solution_2(commands))
