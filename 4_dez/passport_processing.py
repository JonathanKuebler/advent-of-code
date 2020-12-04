from schema import Schema, And, Use, Optional, Regex

REQUIRED_FIELDS = ("byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid")
OPTIONAL_FIELDS = "cid"

schema = Schema(
    {
        "byr": And(Use(int), lambda n: 1920 <= n <= 2002),
        "iyr": And(Use(int), lambda n: 2010 <= n <= 2020),
        "eyr": And(Use(int), lambda n: 2020 <= n <= 2030),
        "hgt": And(
            str,
            Regex(
                r"\b1[5-8][0-9]cm\b|\b19[0-3]cm\b|\b59in\b|\b6[0-9]in\b|\b7[0-6]in\b"
            ),
        ),
        "hcl": And(str, Regex(r"^\#[a-f0-9]{6}$")),
        "ecl": And(
            str,
            lambda e: e in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"],
        ),
        "pid": And(str, Regex(r"^[0-9]{9}$")),
        Optional("cid"): And(str),
    }
)


def get_fields_and_values(passport):
    fields_and_values = passport.split()
    fields_values = {}
    for field_and_value in fields_and_values:
        field_and_value = field_and_value.split(":")
        fields_values[field_and_value[0]] = field_and_value[1]
    return fields_values


def processing(passport):
    fields_values = get_fields_and_values(passport)
    if all(field in fields_values.keys() for field in REQUIRED_FIELDS):
        if schema.is_valid(fields_values):
            return 1, 1
        return 1, 0
    else:
        return 0, 0


with open("input") as input:
    whole_file = input.read()
    passports = whole_file.split("\n\n")
    part1 = 0
    part2 = 0
    for passport in passports:
        counter1, counter2 = processing(passport)
        part1 += counter1
        part2 += counter2
    print(part1)
    print(part2)
