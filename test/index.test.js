const fs = require('fs')
const path = require('path')
const fromMarkdown = require('remark-parse')
const withSlugs = require('remark-slug')
const toMarkdown = require('remark-stringify')
const unified = require('unified')
const withToc = require('../src')

const fixture = fs.readFileSync(path.join(__dirname, 'fixtures/test.md'), {
  encoding: 'utf-8',
})

const processor = unified()
  .use(fromMarkdown)
  .use(withSlugs)
  .use(withToc)
  .use(toMarkdown)

it('should attach table of contents to vfile data', async () => {
  const { data } = await processor.process(fixture)

  expect(data.toc).toMatchInlineSnapshot(`
    Array [
      Object {
        "children": Array [
          Object {
            "children": Array [
              Object {
                "children": Array [
                  Object {
                    "depth": 4,
                    "id": "heading-111",
                    "value": "Heading 1.1.1",
                  },
                ],
                "depth": 3,
                "id": "heading-11",
                "value": "Heading 1.1",
              },
              Object {
                "depth": 3,
                "id": "heading-12",
                "value": "Heading 1.2",
              },
              Object {
                "children": Array [
                  Object {
                    "depth": 4,
                    "id": "heading-131",
                    "value": "Heading 1.3.1",
                  },
                  Object {
                    "depth": 4,
                    "id": "heading-132",
                    "value": "Heading 1.3.2",
                  },
                ],
                "depth": 3,
                "id": "heading-13",
                "value": "Heading 1.3",
              },
            ],
            "depth": 2,
            "id": "heading-1",
            "value": "Heading 1",
          },
          Object {
            "children": Array [
              Object {
                "depth": 3,
                "id": "heading-21",
                "value": "Heading 2.1",
              },
              Object {
                "children": Array [
                  Object {
                    "depth": 4,
                    "id": "heading-221",
                    "value": "Heading 2.2.1",
                  },
                ],
                "depth": 3,
                "id": "heading-22",
                "value": "Heading 2.2",
              },
            ],
            "depth": 2,
            "id": "heading-2",
            "value": "Heading 2",
          },
          Object {
            "depth": 2,
            "id": "heading-3",
            "value": "Heading 3",
          },
        ],
        "depth": 1,
        "id": "title",
        "value": "Title",
      },
    ]
  `)
})