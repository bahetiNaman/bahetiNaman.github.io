from unittest import TestCase, mock
from HangmanGame import HangmanGame
from Hangman import Hangman
from WordGenerator import WordGenerator


class TestHangmanGame(TestCase):

    def setUp(self) -> None:
        self.game = HangmanGame(Hangman(), WordGenerator('sowpods.txt'))

    def test_start_game(self):
        self.assertEqual(self.game.word, '')
        self.assertEqual(self.game.status, '')
        self.assertEqual(self.game.total_points, 0)
        self.assertEqual(self.game.guesses, [])
        self.assertEqual(self.game.incorrect_guess_count, 0)
        self.game.start_game()
        self.assertNotEqual(self.game.word, '')
        self.assertEqual(self.game.total_points, 0)

    def test_get_word(self):
        self.game.word = "RIPPLING"
        self.assertEqual(self.game.get_word(), "RIPPLING")

    def test_guess_letter(self):
        self.fail()

    def test_get_valid_guess(self):
        self.game.guesses = ['A', 'B', 'C', 'Z']
        inputs: list = ['A', 'C', 'DE', 'D']
        self.fail()

    def test_update_word_display(self):
        self.game.word = "RIPPLING"
        self.game.word_display = ['_' for _ in self.game.word]
        self.game.update_word_display('P')
        self.assertEqual("".join(self.game.word_display), '__PP____')
