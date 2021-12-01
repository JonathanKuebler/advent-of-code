def move(cups, moves, pad):
    nex = [i + 1 for i in range(pad + 1)]
    for i, label in enumerate(cups[:-1]):
        nex[label] = cups[i + 1]
    head = cups[0]
    if pad > len(cups):
        nex[-1] = head
        nex[cups[-1]] = max(cups) + 1
    else:
        nex[cups[-1]] = head

    for i in range(moves):
        rem = nex[head]
        nex[head] = nex[nex[nex[rem]]]
        allrem = rem, nex[rem], nex[nex[rem]]

        dest = head - 1 if head > 1 else pad
        while dest in allrem:
            dest = pad if dest == 1 else dest - 1

        nex[nex[nex[rem]]] = nex[dest]
        nex[dest] = rem

        head = nex[head]

    cup = nex[1]
    while cup != 1:
        yield cup
        cup = nex[cup]


cups = list(map(int, "123487596"))
print(cups)
print(len(cups))
m = move(cups, 10000000, 1000000)
print(next(m) * next(m))
