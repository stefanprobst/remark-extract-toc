import type { Plugin } from 'unified'

export interface RemarkExportTocMdxOptions {
  /**
   * The variable to export the table of contents as.
   *
   * @default 'tableOfContents'
   */
  name?: string
}

declare const withExportedTableOfContents: Plugin<[RemarkExportTocMdxOptions?]>

export default withExportedTableOfContents
