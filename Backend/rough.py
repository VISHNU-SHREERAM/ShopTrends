def f():
    for i in range(2):
        yield 1
    for i in range(2):
        yield 2


z = f()
print(next(z))
print(next(z))
print(next(z))
print(next(z))
