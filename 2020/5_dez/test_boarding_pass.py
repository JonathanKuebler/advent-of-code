from boarding_pass import find_row, find_column

test_pass_0 = "FBFBBFFRLR"
test_pass_1 = "BFFFBBFRRR"
test_pass_2 = "FFFBBBFRRR"
test_pass_3 = "BBFFBBFRLL"


def test_find_row():
    assert find_row(test_pass_0[:7], 0, 127) == 44
    assert find_row(test_pass_1[:7], 0, 127) == 70
    assert find_row(test_pass_2[:7], 0, 127) == 14
    assert find_row(test_pass_3[:7], 0, 127) == 102


def test_find_column():
    assert find_column(test_pass_0[7:], 0, 7) == 5
    assert find_column(test_pass_1[7:], 0, 7) == 7
    assert find_column(test_pass_2[7:], 0, 7) == 7
    assert find_column(test_pass_3[7:], 0, 7) == 4
