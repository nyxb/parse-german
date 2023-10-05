/**
 * @typedef {import('nlcst').Root} Root
 */

import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import test from 'node:test'
import {assert as nlcstTest} from 'nlcst-test'
import {ParseGerman} from 'parse-german'
import {VFile} from 'vfile'

const german = new ParseGerman()

test('ParseGerman', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('parse-german')).sort(), [
      'ParseGerman'
    ])
  })

  await t.test('should accept a vfile', async function () {
    assert.deepEqual(
      new ParseGerman(undefined, new VFile('Alpha bravo charlie')).parse(),
      german.parse('Alpha bravo charlie')
    )
  })
})

test('Deutsche Abkürzungen und Sonderzeichen', async function (t) {
  const tests = [
    {
      name: 'geschaefts-gmbh',
      doc: 'Die GmbH ist eine häufig gewählte Unternehmensform.'
    },
    {
      name: 'geschaefts-ag',
      doc: 'Die AG ist besonders bei großen Unternehmen beliebt.'
    },
    {
      name: 'geschaefts-ug',
      doc: 'Viele kleine Unternehmen wählen die UG als Unternehmensform.'
    },
    {name: 'geschaefts-ev', doc: 'Wir sind ein eingetragener Verein (e.V.).'},
    {name: 'geschaefts-zb', doc: 'Ich werde das z.B. morgen machen.'},
    {name: 'geschaefts-idr', doc: 'In der Regel (i.d.R.) macht er das nicht.'},
    {
      name: 'geschaefts-usw',
      doc: 'Es gibt viele Optionen, z.B. Äpfel, Bananen, usw.'
    },
    {
      name: 'masseinheiten-cm',
      doc: 'Das Paket ist 30 cm lang, 20 cm breit und 10 cm hoch.'
    },
    {name: 'masseinheiten-km', doc: 'Die Strecke beträgt etwa 5 km.'},
    {
      name: 'masseinheiten-ml',
      doc: 'Dieses Getränk enthält 500 ml Flüssigkeit.'
    },
    {name: 'masseinheiten-c', doc: 'Die Temperatur beträgt 20 °C.'},
    {name: 'zeit-sek', doc: 'Bitte warten Sie 5 Sekunden (sek).'},
    {name: 'zeit-min', doc: 'Der Workshop dauert 60 Minuten (min).'},
    {name: 'zeit-mo', doc: 'Das Geschäft ist von Mo bis Fr geöffnet.'},
    {name: 'zeit-jan', doc: 'Ich bin im Jan geboren.'},
    {name: 'bundeslaender-by', doc: 'Ich wohne in Bayern (BY).'},
    {
      name: 'bundeslaender-be',
      doc: 'Berlin (BE) ist die Hauptstadt Deutschlands.'
    },
    {name: 'bundeslaender-he', doc: 'Hessen (HE) hat viele schöne Städte.'},
    {name: 'titel-dr', doc: 'Dr. Müller wird die Vorlesung halten.'},
    {
      name: 'titel-prof',
      doc: 'Prof. Schmidt ist ein renommierter Wissenschaftler.'
    },
    {name: 'titel-ing', doc: 'Ing. Huber hat das Projekt entwickelt.'},
    {name: 'sonderzeichen-ae', doc: 'Die Äpfel sind süß.'},
    {name: 'sonderzeichen-baeume', doc: 'Es gibt viele Bäume im Park.'},
    {name: 'sonderzeichen-gruesse', doc: 'Grüße an alle.'}
  ]

  for (const testItem of tests) {
    await t.test(`should work with ${testItem.name}`, async function () {
      await describeFixture(testItem.name, testItem.doc)
    })
  }
})

/**
 * Utility to test if a given document is both a valid node, and matches a
 * fixture.
 *
 * @param {string} name
 * @param {string} doc
 * @returns {Promise<undefined>}
 */
async function describeFixture(name, doc) {
  const nlcstA = german.parse(doc)
  /** @type {Root} */
  const fixture = JSON.parse(
    String(await fs.readFile(new URL(`fixture/${name}.json`, import.meta.url)))
  )

  nlcstTest(nlcstA)
  assert.deepEqual(nlcstA, fixture)
}
