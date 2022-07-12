class HangmanGame:
    def __init__(self, hangman: object, word_generator: object) -> None:
        """
        constructor for class HangmanGame. It initializes all the attributes of HangmanGame class
        """
        self.total_points: int = 0
        self.word_generator = word_generator
        self.hangman = hangman
        self.word: str = ''
        self.incorrect_guess_count: int = 0
        self.word_display: list = []
        self.guesses: list = []
        self.status: str = ''

    def __initialize_game(self) -> None:
        """
        Initialize self.word by getting a random word from the wordGenerator and similarly setting word_display and status accordingly.
        """
        self.__set_word(self.word_generator.get_next_word())
        self.set_status()
        self.word_display = ['_' for _ in self.word]

    def start_game(self) -> None:
        """
        function to start the game. Initialize everything and run the game.
        """
        self.__initialize_game()
        print("Welcome to hangman")
        print(self.get_position())
        self.run_game()

    def run_game(self) -> None:
        """
        function to run the game that takes inputs until game is over or word is guessed correctly.
        """
        game_over = (self.status == 'won' or self.status == 'lost')
        # Take input till game is not over
        while not game_over:
            self.guess_letter()
            print(self.get_hangman())
            print(self.get_position())
            game_over = (self.status == 'won' or self.status == 'lost')

        self.end_game()

        print('\nThanks for playing!')

    def end_game(self) -> None:
        """
        Function to end the game if user does not want to restart
        """
        if self.status == 'won':
            print('Congratulations! You guessed the word correctly.')
        else:
            print(f'The word is: {self.get_word()}')
            print('I am sure you will do better next time. :)')

        want_to_restart = (input("To restart, enter Yes: (case insensitive) ")).lower()
        if want_to_restart == "yes":
            self.restart_game()

    def restart_game(self) -> None:
        """
        function to restart the game once the game is over. It initializes everything and then calls self.start_game()
        """
        # if user want to restart, initialize everything and start the game again
        self.total_points = 0
        self.hangman.reset_hangman()
        self.word = ''
        self.incorrect_guess_count = 0
        self.word_display = []
        self.guesses = []
        self.status = ''
        self.start_game()

    def __set_word(self, word: str) -> None:
        """
        setter for self.word
        :param word
        """
        self.word = word

    def get_word(self) -> str:
        """
        getter for self.word
        """
        return self.word

    def get_hangman(self) -> str:
        """
        getter for the view of hangman. if status if won then get hangman on win view
        """
        if self.status == 'won':
            return self.hangman.hangman_on_win()
        else:
            return self.hangman.get_hangman()

    def get_position(self) -> str:
        """
        getter for current position of game
        """
        position_string = f'\t {" ".join(self.word_display)}\n'
        if len(self.guesses) != 0:
            position_string += f'Letters guessed: {", ".join(self.guesses)}'
        
        return position_string

    def set_status(self) -> None:
        """
        setter for self.status
        """
        if self.incorrect_guess_count >= self.hangman.get_hangman_length():
            self.status = 'lost'
        elif self.word == ''.join(self.word_display):
            self.status = 'won'
        else:
            self.status = 'guessing'

    def guess_letter(self) -> None:
        guess = self.get_valid_guess()
        self.guesses.append(guess)

        if guess in self.word:
            self.update_word_display(guess)
        else:
            self.incorrect_guess_count += 1
            self.hangman.on_incorrect_guess()
        self.set_status()

    def get_valid_guess(self) -> str:
        """
        function to get valid guess until
        """
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

    def update_word_display(self, guess: str) -> None:
        """
        update the word to display by replacing _ with correct letter guessed
        :param guess: string
        """
        for index, character in enumerate(list(self.word)):
            if guess == character:
                self.word_display[index] = character
