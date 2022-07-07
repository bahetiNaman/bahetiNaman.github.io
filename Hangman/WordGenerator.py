import random


class WordGenerator:
    def __init__(self) -> None:
        self.filename = 'sowpods.txt'

    def get_next_word(self):
        all_lines = open(self.filename).read().splitlines()
        return random.choice(all_lines)
