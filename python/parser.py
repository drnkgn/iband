from lexer import Context, Token, TokenKind, Lexer

__all__ = ["Parser"]

class Rule:
    contractions = [ "d", "t", "s", "m", "re", "ve", "ll" ]

    @staticmethod
    def construct(tokenlist: list[Token]) -> str:
        res = ""
        skip_next_space = False

        for idx, token in enumerate(tokenlist):
            if (token.kind == TokenKind.TEXT
                    or token.kind == TokenKind.NUMBER):
                if idx == 0 or skip_next_space: # if first token, don't prefix " "
                    res += token.content
                    skip_next_space = False
                elif token.content in Rule.contractions:
                    res = res[:len(res)]
                    res += token.content
                else:
                    res += " " + token.content

            else:
                if token.kind == TokenKind.OPEN_PAREN:
                    res += " " + token.content
                    skip_next_space = True
                else:
                    res += token.content
                    if token.content == '-':
                        skip_next_space = True

        return res

class Parser:
    def __init__(self, lexer: Lexer):
        self.lexer = lexer
        self.context = Context.UNKNOWN

    def parse(self) -> dict:
        meanings_index = 0
        stack: list[Token] = []
        entry = {
            "word": "",
            "meanings": [
                {
                    "definition": "",
                    "examples": [],
                    "synonyms": []
                }
             ]
        }

        def _write_dict(ctx: Context, clear: bool = False) -> None:
            construct = Rule.construct(stack)
            try:
                match ctx:
                    case Context.DEFINITION:
                        entry["meanings"][meanings_index]["definition"] = construct
                    case Context.EXAMPLES:
                        entry["meanings"][meanings_index]["examples"].append(construct)
                    case Context.SYNONYM:
                        entry["meanings"][meanings_index]["synonyms"].append(construct)
            except:
                print(self.context.name)
                print(construct)
                exit()

            if clear: stack.clear()

        for token in self.lexer:
            if token.kind == TokenKind.DOT:
                break
            else:
                stack.append(token)

        entry["word"] = Rule.construct(stack)
        self.context = Context.DEFINITION
        stack.clear()

        for token in self.lexer:
            match token.kind:
                case TokenKind.NUMBER:
                    stack.append(token)

                case TokenKind.COLON:
                    _write_dict(self.context, True)
                    if self.context == Context.DEFINITION:
                        self.context = Context.EXAMPLES
                    else:
                        self.context = Context.SYNONYM

                case TokenKind.SEMICOLON:
                    if self.context == Context.EXAMPLES:
                        _write_dict(self.context, True)
                    else:
                        stack.append(token)

                case TokenKind.DOT | TokenKind.EXCLAIMATION:
                    if stack[-1].kind == TokenKind.NUMBER:
                        if len(stack[-1].content) < 4:
                            stack.pop() # don't pop years
                            if stack: _write_dict(self.context, True)
                            # if it's not the first definition, don't append a
                            # new object because it has already been defined
                            if stack and stack[-1].content != "1":
                                entry["meanings"].append({
                                    "definition": "",
                                    "examples": [],
                                    "synonyms": []
                                })

                            meanings_index += 1
                            self.context = Context.DEFINITION
                        else:
                            stack.append(token)
                    else:
                        stack.append(token)

                case _:
                    if self.context != Context.UNKNOWN:
                        stack.append(token)

        _write_dict(self.context, True)

        return entry
