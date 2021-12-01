import copy
from collections import defaultdict


def hash_list(player):
    nbrs = ""
    for nbr in player:
        nbrs += str(nbr)
    return hash(nbrs)


player_1_hash_list = defaultdict(list)
player_2_hash_list = defaultdict(list)


def recursive_combat(player_1, player_2, round=1, game=1):
    print("--- ROUND: " + str(round) + " (Game " + str(game) + ") ---")
    print("Player 1's deck:" + str(player_1))
    print("Player 2's deck:" + str(player_2))
    hash_player_1 = hash_list(player_1)
    hash_player_2 = hash_list(player_2)
    if game not in player_1_hash_list.keys():
        player_1_hash_list[game] = []
        player_2_hash_list[game] = []
    if (
        hash_player_1 in player_1_hash_list[game]
        or hash_player_2 in player_2_hash_list[game]
    ):
        return 1
    player_1_hash_list[game].append(hash_player_1)
    player_2_hash_list[game].append(hash_player_2)
    card_player_1 = player_1.pop(0)
    card_player_2 = player_2.pop(0)
    print("Player 1 plays:" + str(card_player_1))
    print("Player 2 plays:" + str(card_player_2))
    print(len(player_2_hash_list[game]))
    winner = 0
    if card_player_1 <= len(player_1) and card_player_2 <= len(player_2):
        new_game = int(max(player_2_hash_list.keys())) + 1
        winner = recursive_combat(
            copy.deepcopy(player_1)[0:card_player_1],
            copy.deepcopy(player_2)[0:card_player_2],
            round=1,
            game=new_game,
        )
    else:
        if card_player_1 > card_player_2:
            print("Player 1 wins Round " + str(round) + " of Game " + str(game))
            winner = 1
        else:
            print("Player 2 wins Round " + str(round) + " of Game " + str(game))
            winner = 2

    if winner == 1:
        player_1.append(card_player_1)
        player_1.append(card_player_2)
    else:
        player_2.append(card_player_2)
        player_2.append(card_player_1)

    if len(player_1) == 0:
        return 2
    elif len(player_2) == 0:
        return 1
    else:
        return recursive_combat(
            player_1, player_2, round=copy.deepcopy(round) + 1, game=game
        )


with open("input", "r") as input:
    input = input.read().rstrip()
    deck_1, deck_2 = input.split("\n\n")
    deck_1 = deck_1.split("\n")
    deck_2 = deck_2.split("\n")

    player_1 = []
    player_2 = []

    for nbr in deck_1[1:]:
        player_1.append(int(nbr))

    for nbr in deck_2[1:]:
        player_2.append(int(nbr))

    # while len(player_1) != 0 and len(player_2) != 0:
    #     if player_1[0] > player_2[0]:
    #         player_1.append(player_1.pop(0))
    #         player_1.append(player_2.pop(0))
    #     else:
    #         player_2.append(player_2.pop(0))
    #         player_2.append(player_1.pop(0))

    # sum = 0
    # if len(player_1) != 0:
    #     for index in range(0, len(player_1)):
    #         sum += player_1[index] * (len(player_1) - index)
    # else:
    #     for index in range(0, len(player_2)):
    #         sum += player_2[index] * (len(player_2) - index)
    # print(sum)

    print(recursive_combat(player_1, player_2))

    sum = 0
    if len(player_1) != 0:
        for index in range(0, len(player_1)):
            sum += player_1[index] * (len(player_1) - index)
    else:
        for index in range(0, len(player_2)):
            sum += player_2[index] * (len(player_2) - index)
    print(sum)
