from Hangman import Hangman
from WordGenerator import WordGenerator


class HangmanGame:
    def __init__(self) -> None:
        self.total_points = 0
        self.word_generator = WordGenerator()
        self.hangman = Hangman()
        self.word = ''
        self.incorrect_guess_count = 0
        self.word_display = []
        self.guesses = []
        self.status = ''

    def start_game(self) -> None:
        self.__set_word(self.word_generator.get_next_word())
        self.__set_status()
        self.word_display = ['_' for _ in self.word]
        print("Welcome to hangman")
        print(self.get_position())

        game_over = (self.get_status() == 'won' or self.get_status() == 'lost')

        # Take input till game is not over
        while not game_over:
            self.guess_letter()
            print(self.get_hangman())
            print(self.get_position())
            game_over = (self.get_status() == 'won' or self.get_status() == 'lost')

        if self.get_status() == 'won':
            print('Congratulations! You guessed the word correctly.')
        else:
            print(f'The word is: {self.get_word()}')
            print('I am sure you will do better next time. :)')

        want_to_restart = (input("To restart, enter Yes: (case insensitive) ")).lower()
        if want_to_restart == "yes":
            self.__init__()
            self.start_game()
        print('\nThanks for playing!')

    def __set_word(self, word: str) -> None:
        self.word = word

    def get_word(self) -> str:
        return self.word

    def get_hangman(self) -> str:
        if self.get_status() == 'won':
            return self.hangman.hangman_on_win()
        else:
            return self.hangman.get_hangman()

    def get_position(self) -> str:
        position_string = f'\t {" ".join(self.word_display)}\n'
        if len(self.guesses) != 0:
            position_string += f'Letters guessed: {", ".join(self.guesses)}'
        
        return position_string

    def __set_status(self) -> None:
        if self.incorrect_guess_count >= self.hangman.get_hangman_length():
            self.status = 'lost'
        elif self.word == ''.join(self.word_display):
            self.status = 'won'
        else:
            self.status = 'guessing'

    def get_status(self) -> str:
        return self.status

    def guess_letter(self) -> None:
        guess = self.get_valid_guess()
        self.guesses.append(guess)

        if guess in self.word:
            self.update_word_display(guess)
        else:
            self.incorrect_guess_count += 1
            self.hangman.on_incorrect_guess()
        self.__set_status()

    def get_valid_guess(self) -> str:
        is_valid = False
        is_new_guess = False
        guess = ''

        while not is_valid or not is_new_guess:
            guess = input('Input a letter: ').strip().upper()

            # Check if the input is a single character and an alphabet.
            is_valid = (len(guess) == 1 and guess.isalpha())

            # Check if the alphabet is already guessed.
            is_new_guess = (guess not in self.guesses)

            if not is_valid:
                print(
                    f'"{guess}" is not a valid input. Please enter a '
                    f'single alphabet.')
            elif not is_new_guess:
                print(
                    f'"{guess}" has already been input before. Please enter '
                    f'a letter not guessed already.')

        return guess

    # update the word to display by replacing _ with correct letter guessed
    def update_word_display(self, guess: str) -> None:
        for index, character in enumerate(list(self.word)):
            if guess == character:
                self.word_display[index] = character


hangmanGame = HangmanGame()
hangmanGame.start_game()

