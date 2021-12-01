door_public_key = 13316116
card_public_key = 13651422

door_loop_size = 0
card_loop_size = 0
loop = 1
value = 1
while door_loop_size == 0 or card_loop_size == 0:
    value = value * 7
    value = value % 20201227
    if value == door_public_key:
        door_loop_size = loop
    elif value == card_public_key:
        card_loop_size = loop
    loop += 1

print(door_loop_size, card_loop_size)

value = 1
for i in range(door_loop_size):
    value = value * card_public_key
    value = value % 20201227
print(value)
