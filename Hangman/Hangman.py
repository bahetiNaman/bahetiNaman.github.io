class Hangman:

    def __init__(self) -> None:
        self.no_of_incorrect_guesses = 0
        # Hangman's body parts
        self.hangman_body = {
            'head': '', 'stomach': '', 'right_hand': ' ', 'left_hand': '', 'right_leg': '', 'left_leg': ''
        }
        # Symbols to complete hangman's body
        self.hangman_parts = ['O', '|', '/', '\\', '/', '\\']
        self.hangman_parts_on_win = ['O', '|', '\\', '/', '/', '\\']
    
    def on_incorrect_guess(self) -> None:
        self.no_of_incorrect_guesses += 1
        self.update_hangman()

    def update_hangman(self) -> None:
        index_of_part_to_hang = self.no_of_incorrect_guesses - 1
        updated_hangman = {list(self.hangman_body.keys())[
            index_of_part_to_hang]: self.hangman_parts[index_of_part_to_hang]}
        self.hangman_body.update(updated_hangman)

    def get_hangman(self) -> str:
        hangman_pole = """
          +---+
          |   |
          |   {head}
          |  {right_hand}{stomach}{left_hand}
          |  {right_leg} {left_leg}
          |
        =========
        """
        return hangman_pole.format(**self.hangman_body)

    def hangman_on_win(self) -> str:
        hangman_pole = """
          +---+
          |   
          |   
          |  {right_hand}{head}{left_hand}
          |   {stomach}
          |  {right_leg} {left_leg}
        =========
        """

        updated_hangman = {}
        for index, key in enumerate(self.hangman_body):
            updated_hangman[key] = self.hangman_parts_on_win[index]

        return hangman_pole.format(**updated_hangman)

    def get_hangman_length(self) -> int:
        return len(self.hangman_body)
