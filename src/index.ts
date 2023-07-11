import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

import {completeFromList} from "@codemirror/autocomplete"

export const Z80Language = LRLanguage.define({
    parser: parser.configure({
        props: [
            styleTags({
                Eti: t.name,
                Cad: t.string,
                Mnemo: t.keyword,
                Num: t.number,
                Com: t.lineComment,
                Paren: t.paren,	    
            })
       ]
    }),
    languageData: {
        commentTokens: {line: ";"}
    }
});

export const Z80Completion = Z80Language.data.of({
    autocomplete: completeFromList([
	{label: "adc", type: "keyword"},
	{label: "add", type: "keyword"},
	{label: "and", type: "keyword"},
	{label: "cpu", type: "function"},
	{label: "db", type: "function"},
	{label: "end", type: "function"},
	{label: "hof", type: "function"},
	{label: "org", type: "function"}
    ])
})

export function Z80() {
    return new LanguageSupport(Z80Language, [Z80Completion])
}
