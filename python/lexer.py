import json
from enum import Enum, auto
from typing import Callable

class TokenKind(Enum):
    UNKNOWN             = 0
    EOL                 = auto()
    TEXT                = auto()
    NUMBER              = auto()
    NEWLINE             = auto()
    COMMA               = auto()
    DOT                 = auto()
    QUOTE               = auto() # single quotes
    EXCLAIMATION        = auto()
    COLON               = auto()
    SEMICOLON           = auto()
    OPEN_PAREN          = auto()
    CLOSE_PAREN         = auto()
    PUNCT               = auto() # anything else defaults to any punctuation

class Context(Enum):
    UNKNOWN             = 0
    ENTRY_WORD          = auto()
    DEFINITION          = auto()
    EXAMPLES            = auto()
    SYNONYM             = auto()

class Token:
    def __init__(self):
        self.kind: TokenKind = TokenKind.UNKNOWN
        self.content: str = ""

    def __str__(self):
        return json.dumps({
            "token": self.kind.name,
            "content": self.content
        })

class Lexer:
    def __init__(self, content: str):
        self.content: str = content
        self.cursor: int = 0

    def _trim_left(self) -> None:
        while (self.cursor != len(self.content)
               and self.content[self.cursor].isspace()):
            self.cursor += 1

    def next(self) -> Token:
        token = Token()
        content: list[str] = []

        self._trim_left()

        def _consume(predicate: Callable[[str], bool], kind: TokenKind) -> None:
            while predicate(self.content[self.cursor]):
                content.append(self.content[self.cursor])
                self.cursor += 1

            token.kind = kind
            token.content = "".join(content)

        if self.cursor == len(self.content):
            token.kind = TokenKind.EOL

        elif self.content[self.cursor].isalpha():
            _consume(lambda x: x.isalpha(), TokenKind.TEXT)

        elif self.content[self.cursor].isnumeric():
            _consume(lambda x: x.isnumeric(), TokenKind.NUMBER)

        else:
            match self.content[self.cursor]:
                case ',':
                    token.kind = TokenKind.COMMA
                case '!':
                    token.kind = TokenKind.EXCLAIMATION
                case '.':
                    token.kind = TokenKind.DOT
                case "'":
                    token.kind = TokenKind.QUOTE
                case ':':
                    token.kind = TokenKind.COLON
                case ';':
                    token.kind = TokenKind.SEMICOLON
                case '(':
                    token.kind = TokenKind.OPEN_PAREN
                case ')':
                    token.kind = TokenKind.CLOSE_PAREN
                case _:
                    token.kind = TokenKind.PUNCT

            token.content = self.content[self.cursor]
            self.cursor += 1

        return token

    def __iter__(self):
        self.cursor = 0
        return self

    def __next__(self):
        token = self.next()
        if token.kind == TokenKind.EOL:
            raise StopIteration

        return token
