from re import search
from enum import Enum, auto

class Token(Enum):
    END             = 0
    DIGIT           = auto()
    COLON           = auto()
    COMMA           = auto()
    SEMICOLON       = auto()
    FULLSTOP        = auto()
    EXCLAIMATION    = auto()

class Context(Enum):
    NONE            = 0
    DEFINITION      = auto()
    EXAMPLE         = auto()
    SYNONYM         = auto()

def tokenizer(char: str) -> Token:
    if char.isdigit():
        return Token.DIGIT
    elif char == ":":
        return Token.COLON
    elif char == ";":
        return Token.SEMICOLON
    elif char == ".":
        return Token.FULLSTOP
    elif char == "!":
        return Token.EXCLAIMATION

    return Token.END

def parse(string: str) -> dict:
    word_end = search(r"[\.\!]", string)
    word_end = word_end.start() if word_end else 0
    word = string[:word_end]
    meanings = []
    meanings_index = -1
    context = Context.DEFINITION
    stack = []

    def consume(ctx: Context, clear: bool = False) -> None:
        stream = "".join(stack).strip(" .")
        match ctx:
            case Context.DEFINITION:
                meanings[meanings_index]["definition"] = stream
            case Context.EXAMPLE:
                meanings[meanings_index]["examples"].append(stream)
            case Context.SYNONYM:
                meanings[meanings_index]["synonyms"].append(stream.lower())

        if clear: stack.clear()

    # remove the entry word since we've already parsed that out
    string = string[word_end+2:]
    # solves my headaches
    if not string[0].isdigit():
        string = "1. " + string

    for c in string:
        match tokenizer(c):
            case Token.DIGIT:
                stack.append(c)

            case Token.COLON:
                consume(context, True)
                if context == Context.DEFINITION:
                    context = Context.EXAMPLE
                else:
                    context = Context.SYNONYM

            case Token.SEMICOLON:
                if context == Context.EXAMPLE:
                    consume(context, True)
                else:
                    stack.append(c)

            case Token.FULLSTOP | Token.EXCLAIMATION:
                if tokenizer(stack[-1]) == Token.DIGIT:
                    stack.pop()
                    if stack: consume(context, True)

                    meanings.append({
                        "definition": "",
                        "examples": [],
                        "synonyms": []
                    })
                    meanings_index += 1
                    context = Context.DEFINITION
                else:
                    stack.append(c)

            case _:
                stack.append(c)

    consume(context)

    return {
        "word": word,
        "meanings": meanings
    }
