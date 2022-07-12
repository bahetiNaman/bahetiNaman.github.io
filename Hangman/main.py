from Hangman import Hangman
from HangmanGame import HangmanGame
from WordGenerator import WordGenerator

if __name__ == '__main__':
    game = HangmanGame(hangman=Hangman(), word_generator=WordGenerator("sowpods.txt"))
    game.start_game()
