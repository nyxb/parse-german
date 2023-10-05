/**
 * @typedef {import('nlcst').Paragraph} Paragraph
 * @typedef {import('nlcst').Sentence} Sentence
 */

import {toString} from 'nlcst-to-string'
import {ParseLatin} from 'parse-latin'
import {modifyChildren} from 'unist-util-modify-children'
import {
  abbreviationsInsensitive,
  abbreviationsSensitive,
  specialCharacters
} from './regex.js'

/**
 * Create a new parser.
 *
 * `ParseGerman` extends `ParseLatin`.
 * See `parse-latin` for API docs.
 */
export class ParseGerman extends ParseLatin {}

/**
 * List of transforms handling a sentence.
 */
ParseGerman.prototype.tokenizeSentencePlugins = [
  ...ParseLatin.prototype.tokenizeSentencePlugins
]

/**
 * List of transforms handling a paragraph.
 */
ParseGerman.prototype.tokenizeParagraphPlugins = [
  modifyChildren(mergeGermanPrefixExceptions),
  ...ParseLatin.prototype.tokenizeParagraphPlugins
]

/**
 * Merge a sentence into its next sentence, when the sentence ends with a
 * certain word.
 *
 * @type {import('unist-util-modify-children').Modifier<Paragraph>}
 */
function mergeGermanPrefixExceptions(sentence, index, paragraph) {
  if ('children' in sentence && sentence.children) {
    const period = sentence.children[sentence.children.length - 1]
    const word = sentence.children[sentence.children.length - 2]

    if (
      period &&
      period.type === 'PunctuationNode' &&
      toString(period) === '.' &&
      word &&
      word.type === 'WordNode'
    ) {
      const value = toString(word)

      if (
        abbreviationsInsensitive.test(value.toLowerCase()) ||
        abbreviationsSensitive.test(value) ||
        specialCharacters.test(value)
      ) {
        // Merge period into abbreviation.
        word.children.push(period)
        sentence.children.pop()

        if (period.position && word.position) {
          word.position.end = period.position.end
        }

        // Merge sentences.
        const next = paragraph.children[index + 1]

        if (next && next.type === 'SentenceNode') {
          sentence.children.push(...next.children)
          paragraph.children.splice(index + 1, 1)

          // Update position.
          if (next.position && sentence.position) {
            sentence.position.end = next.position.end
          }

          // Next, iterate over the current node again.
          return index - 1
        }
      }
    }
  }
}
