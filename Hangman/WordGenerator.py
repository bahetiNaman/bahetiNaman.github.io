import random


class WordGenerator:
    def __init__(self, filename) -> None:
        self.filename: str = filename

    def get_next_word(self):
        file_containing_all_the_words = open(self.filename)
        all_lines = file_containing_all_the_words.read().splitlines()
        file_containing_all_the_words.close()
        return random.choice(all_lines)
