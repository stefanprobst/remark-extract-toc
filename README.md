# remark-extract-toc

This is a [`remark`](https://github.com/remarkjs/remark) plugin which attaches a
document's table of contents to the VFile.

## How to install

```sh
yarn add @stefanprobst/remark-extract-toc
```

## How to use

```js
import { remark } from 'remark'
import withSlugs from 'remark-slug'
import withToc from '@stefanprobst/remark-extract-toc'

const processor = remark().use(withSlugs).use(withToc)

const { data, contents } = processor.processSync(doc)

console.dir(data.toc, { depth: null })
```

The table of contents will be attached to the resulting VFile's `data.toc`
property. It has the following shape:

```ts
interface TocEntry {
  value: string
  depth: number
  id?: string
  children?: Array<TocEntry>
}

type Toc = Array<TocEntry>
```

Note that this plugin does _not_ generate any ids, you will probably want to
combine it with `remark-slug`.

How you render the table of contents is up to you.

## How to use with MDX

When transforming MDX documents, you can expose the table of contents as a named
export, which defaults to `tableOfContents`.

```js
import { compile } from '@mdx-js/mdx'
import withSlugs from 'remark-slug'
import withToc from '@stefanprobst/remark-extract-toc'
import withTocExport from '@stefanprobst/remark-extract-toc/mdx'

async function run() {
  const file = await compile(doc, {
    remarkPlugins: [
      withSlugs,
      withToc,
      withTocExport,
      /** Optionally, provide a custom name for the export. */
      // [withTocExport, { name: 'toc' }],
    ],
  })

  console.log(String(file))
}

run()
```

If you are using TypeScript, you can add typings with:

```js
/** mdx.d.ts (should be referenced in `tsconfig.json#include`) */
declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'
  import type { Toc } from '@stefanprobst/remark-extract-toc'

  export const tableOfContents: Toc
  export default function MDXContent(props: MDXProps): JSX.Element
}
```
