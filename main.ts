import { Parser } from "./src/parser";
import { Lexer } from "./src/lexer";
import { parse } from "./src/lib";
import { readFileSync, writeFileSync } from "fs";

// let lines = readFileSync("wordlist/a.txt", "utf8").split("\n");
// let entries = [];
// for (const line of lines.slice(0, lines.length - 1)) {
//     entries.push(new Parser(new Lexer(line)).parse());
// }
// writeFileSync("index/a.json", JSON.stringify(entries));

let texts = [
    "abak. For ABAH, undercut.",
    "abah. 1. Cut made in a tree for felling, under-cut: a. nuan enda' manah, you haven't cut it properly; ia ngabah-ka dulu' legi' aku nimbal, he first makes a cut on his side, then I make one on my side. 2. Wedge-shaped chips from a felling cut.",
    "A-. Represents sound of a in 'car'. The a in 'cat' is not used. The sound in 'cake' is rare, but usu. in Swk.M. for final -ai, written ei. Iban has no article, definite or indefinite, but uses num. cl. where necessary; e.g. batang, buah, igi', iko', iti'.",
    "ayu. 1. (Skr., 'life, vitality') Shade or image of the living, reflecting gen. state of body and soul, with no independent existence as the SEMENGAT (soul) has and distinct from SUKAT (life span) and SEBAYAN (the dead) which have no a. The a. are like bamboo or banana and grow in clumps at Bangkit on a broad ridge, Bukit Menebong Jawa, where they are tended by Menyayan, chief of the celestial manang, esp. in rites for the sick (SAUT). If evil spirits (antu) attack the a. (they cut it down and burn it for their farming) the body sickens: when the soul leaves the body in dreams or sickness, the a. also sickens and wilts. It withers and dies altogether when the soul departs this world at death. Menyayan transplants (nusup) the a. from (family) clump to clump (kampong genturong) as necessary and clears away those that are dead. 2. Health and strength, high (or low) spirits, in good (or bad) form: alah a., short lived; sabang a., sabang planted to mark recovery from illness; bulu tuai, in poor spirits or health (refers to the falling of dead leaves from the a. without real or lasting harm being done). 3. Meaning of dream or omen: ngayu, warn, foreshadow; manyi' mansa' umai ngayu-ka bulih padi, (a swarm of) bees passing the farm means a good harvest. 4. (in Bugau) No, not, nadai, enda'. 5. Vatu A., ancestor of some of the people of the Padeh (Saribas) about 400 years ago.",
    "ayun. 1. (M.) Swing, tayun (te-a.) WA': tu'a. anak aku, this is my child's swing; ribut ngayun-ka dan kayu' kin kitu', the wind sways the branches to and fro; ia ngayun-ka jari, he swings his arms; ia ngayun-ka wa', she pushes the swing; ia ber-a. (diri'), he sits and swings; ber-a., swing low to the ground. 2. Equivalent in plates, etc., of a money 'fine': pinggai tu' a. sa-ringgit, these plates are the equivalent of one dollar; ia ngayun-ka sa-ringgit enggau pinggai, he paid a dollar 'fine' (tunggu) with plates. 3. Indu' a. kaki, small black wasp, unid., similar to jagai."
];

parse(texts[2]);
