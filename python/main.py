from parser import Lexer, Parser
from _lexer import parse
from pprint import pprint
import json

# if __name__ == "__main__":
#     with (open("wordlist/a.txt", "r") as input,
#           open("index/a.json", "w") as out):
#         entries = []
#         for line in input:
#             entries.append(Parser(Lexer(line)).parse())
# 
#         out.write(json.dumps(entries))

if __name__ == "__main__":
    # s = "abang. 1. Title of M. men (women, Dayang) whose ancestors were migrants from Sumatra (Mengkabau)', (Br.) awang, pengiran. 2. M. Administrative Officer in Sarawak Civil Service. In 1840, local rulers were A. and they formed most of the Service until 1941. 3. Indai A., Indai Ulup, celestial manang (and mythical ancestress of the M.?) 4. (in Bugau) Term of endearment used to a boy. 5. Betapan a., support someone in distress; cf. gusong."
    # s = "abah. 1. Cut made in a tree for felling, under-cut: a. nuan enda' manah, you haven't cut it properly; ia ngabah-ka dulu' legi' aku nimbal, he first makes a cut on his side, then I make one on my side. 2. Wedge-shaped chips from a felling cut."
    s = "abak. For ABAH, undercut.";
    # s = "ayu. 1. (Skr., 'life, vitality') Shade or image of the living, reflecting gen. state of body and soul, with no independent existence as the SEMENGAT (soul) has and distinct from SUKAT (life span) and SEBAYAN (the dead) which have no a. The a. are like bamboo or banana and grow in clumps at Bangkit on a broad ridge, Bukit Menebong Jawa, where they are tended by Menyayan, chief of the celestial manang, esp. in rites for the sick (SAUT). If evil spirits (antu) attack the a. (they cut it down and burn it for their farming) the body sickens: when the soul leaves the body in dreams or sickness, the a. also sickens and wilts. It withers and dies altogether when the soul departs this world at death. Menyayan transplants (nusup) the a. from (family) clump to clump (kampong genturong) as necessary and clears away those that are dead. 2. Health and strength, high (or low) spirits, in good (or bad) form: alah a., short lived; sabang a., sabang planted to mark recovery from illness; bulu tuai, in poor spirits or health (refers to the falling of dead leaves from the a. without real or lasting harm being done). 3. Meaning of dream or omen: ngayu, warn, foreshadow; manyi' mansa' umai ngayu-ka bulih padi, (a swarm of) bees passing the farm means a good harvest. 4. (in Bugau) No, not, nadai, enda'. 5. Vatu A., ancestor of some of the people of the Padeh (Saribas) about 400 years ago."
    # s = "A, a. Represents sound of a in 'car'. The a in 'cat' is not used. The sound in 'cake' is rare, but usu. in Swk.M. for final -ai: written ei. Iban has no article, definite or indefinite, but uses num. cl. where necessary; e.g. batang, buah, igi', iko', iti'."
    p = Parser(Lexer(s))
    pprint(p.parse())

# if __name__ == "__main__":
#     # s = "abup. Fool: o! a. nuan tu’! you fool!"
#     # s = "adang. 1. Expect, watch, look out for, sadang: sida’ ngadang bala munsoh, they are expecting the enemy; aku ngadang(-ka) nuan datai, 1 expect you to come; ia di-a.(-ka) aku datai pagila’, I am expecting him to come tomorrow. 2. (M.) Ngadang! get ready!; sida’ ngadang-ka munsoh, they are preparing to meet the enemy; ngadang-ka diri’, guard oneself; sigi’ ngadang-ka ternuai (or, nemuai), only getting ready for visitors (or, to go on a visit). ADING."
#     s = "A, a. Represents sound of a in 'car'. The a in 'cat' is not used. The sound in 'cake' is rare, but usu. in Swk.M. for final -ai: written ei. Iban has no article, definite or indefinite, but uses num. cl. where necessary; e.g. batang, buah, igi', iko', iti'."
#     print(s)
#     pprint(parse(s))
