from solver import split_line, check_password_part_1, check_password_part_2

def test_split_line():
    assert split_line("1-3 a: abcde") == (1, 3, "a", "abcde")
    assert split_line("2-9 c: ccccccccc") == (2, 9, "c", "ccccccccc")

def test_check_password_part_1_return_1():
    assert check_password_part_1("1-3 a: abcde") == 1
    assert check_password_part_1("2-9 c: ccccccccc") == 1

def test_check_password__part_1_return_0():
    assert check_password_part_1("1-3 b: cdefg") == 0

def test_check_password_part_2_return_1():
    assert check_password_part_2("1-3 a: abcde") == 1

def test_check_password__part_2_return_0():
    assert check_password_part_2("1-3 b: cdefg") == 0
    assert check_password_part_2("2-9 c: ccccccccc") == 0
