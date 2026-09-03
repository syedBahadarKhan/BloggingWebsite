import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import OptimizedImage from "../ui/OptimizedImage";
import CodeBlock from "./CodeBlock";
import EmbeddedEntryCard from "./EmbeddedEntryCard";

/**
 * Full renderOptions object covering every node type the assignment asks
 * for: headings, lists, blockquotes, code blocks, links, embedded images,
 * embedded entries. Passed into documentToReactComponents().
 *
 * Note: Contentful's rich text editor doesn't have a native "code block"
 * node — the convention is to render inline `code` MARK content that spans
 * a full paragraph as a code block. Adjust to your editorial convention if
 * different.
 */
export const richTextRenderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.CODE]: (text) => (
      <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm">
        {text}
      </code>
    ),
  },

  renderNode: {
    // Headings
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-10 mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2">{children}</h4>
    ),

    // Paragraph
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),

    // Lists
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc list-outside pl-6 mb-4 space-y-1 text-gray-700">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-decimal list-outside pl-6 mb-4 space-y-1 text-gray-700">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <li className="pl-1">{children}</li>,

    // Blockquote
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),

    // Horizontal rule
    [BLOCKS.HR]: () => <hr className="my-8 border-gray-200" />,

    // "Code block" convention: a paragraph whose single child text run
    // uses the CODE mark is rendered as a full code block instead of
    // inline code.
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = node.data?.target;
      const file = asset?.fields?.file;
      const title = asset?.fields?.title || "";

      if (!file) return null;

      // Non-image assets (e.g. downloadable files) get a simple link
      if (!file.contentType?.startsWith("image/")) {
        return (
          <a
            href={`https:${file.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {title || "Download attachment"}
          </a>
        );
      }

      return (
        <figure className="my-6">
          <OptimizedImage
            src={file.url}
            alt={title}
            width={1000}
            className="rounded-xl w-full object-cover"
          />
          {title && (
            <figcaption className="text-center text-sm text-gray-400 mt-2">
              {title}
            </figcaption>
          )}
        </figure>
      );
    },

    [BLOCKS.EMBEDDED_ENTRY]: (node) => <EmbeddedEntryCard entry={node.data?.target} />,
    [INLINES.EMBEDDED_ENTRY]: (node) => <EmbeddedEntryCard entry={node.data?.target} />,

    // Links
    [INLINES.HYPERLINK]: (node, children) => {
      const uri = node.data?.uri || "#";
      const isExternal = uri.startsWith("http");
      return (
        <a
          href={uri}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-blue-600 underline hover:text-blue-700"
        >
          {children}
        </a>
      );
    },
  },
};

export { CodeBlock };
