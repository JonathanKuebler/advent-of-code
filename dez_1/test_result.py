from result import find_product_2, check_includes, find_product_3

def test_check_includes_index():
    assert check_includes(34,[10,40,80,34]) == 3

def test_check_includes_false():
    assert check_includes(32,[10,40,80,34]) == False

def test_find_product_2_working():
    assert find_product_2([1721, 979, 366, 299, 675, 1456]) == 514579

def test_find_product_2_fail():
    assert find_product_2([1721, 979, 366, 1, 675, 1456]) == False

def test_find_product_3_working():
    assert find_product_3([1721, 979, 366, 299, 675, 1456]) == 241861950

def test_find_product_3_fail():
    assert find_product_3([1721, 1, 366, 299, 675, 1456]) == False
