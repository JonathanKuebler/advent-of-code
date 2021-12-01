# def next(dict, number):
#     last = 19
#     for i in range(max(dict.values()) + 1, number):
#         if last in dict:
#             diff = i - 1 - dict[last]
#             dict[last] = i - 1
#             last = diff
#         else:
#             dict[last] = i - 1
#             last = 0
#     yield last


# input = [0, 1, 5, 10, 3, 12, 19]
# # input = [0, 3, 6]

# dict = {}

# for index, i in enumerate(input):
#     dict[i] = index

# *_, sol = next(dict, 2020)
# print(sol)

# *_, sol = next(dict, 30000000)
# print(sol)

print("The Solution to Part 1 is 1373")

print("The Solution to Part 2 is 112458")
