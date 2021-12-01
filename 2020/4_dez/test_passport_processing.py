from passport_processing import processing, get_fields_and_values

passport_true_part1 = (
    "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\nbyr:1937 iyr:2017 cid:147 hgt:183cm"
)

passport_false_part1 = (
    "pid:860033327\neyr:2020\nhcl:#fffffd\nbyr:1937 iyr:2017 cid:147 hgt:183cm"
)

passport_true_part2 = (
    "pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\nhcl:#623a2f"
)

passport_false_part2 = (
    "hcl:dab227 iyr:2012\necl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277"
)


def test_fields_all():
    assert get_fields_and_values(passport_true_part1) == [
        "ecl",
        "pid",
        "eyr",
        "hcl",
        "byr",
        "iyr",
        "cid",
        "hgt",
    ]


def test_fields_some():
    assert get_fields_and_values(passport_false_part1) == [
        "pid",
        "eyr",
        "hcl",
        "byr",
        "iyr",
        "cid",
        "hgt",
    ]


def test_processing_1():
    assert processing(passport_true_part1) == 1


def test_processing_0():
    assert processing(passport_false_part1) == 0
