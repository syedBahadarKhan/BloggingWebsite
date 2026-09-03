import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextRenderOptions } from "./renderOption";

/**
 * Renders a Contentful Rich Text `Document` field using the official
 * @contentful/rich-text-react-renderer with our custom render options.
 * Wrapped in Tailwind's `prose` class for solid default typography that
 * our custom overrides then refine further.
 */
export default function RichTextRenderer({ document }) {
  if (!document) return null;

  return (
    <div className="prose prose-slate max-w-none">
      {documentToReactComponents(document, richTextRenderOptions)}
    </div>
  );
}
