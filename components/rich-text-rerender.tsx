import { Node, JSONContent } from "@tiptap/react";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
  TypographyBlockquote,
} from "@/components/ui/typography";

type Props = {
  content: JSONContent;
};

export function RichTextRenderer({ content }: Props) {
  return (
    <RenderNode node={content} />
  );
}

function RenderNode({ node }: { node: JSONContent }) {
  if (!node) return null;

  switch (node.type) {
    case "doc":
      return (
        <>
          {node.content?.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </>
      );


    case "heading":
      if (node.attrs?.level === 1) {
        return (
          <TypographyH1>
            {node.content?.map((child, i) => (
              <RenderNode key={i} node={child} />
            ))}
          </TypographyH1>
        );
      }

      if (node.attrs?.level === 2) {
        return (
          <TypographyH2>
            {node.content?.map((child, i) => (
              <RenderNode key={i} node={child} />
            ))}
          </TypographyH2>
        );
      }
      return null;

    case "blockquote":
      return (
        <TypographyBlockquote>
          {node.content?.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </TypographyBlockquote>
      );

    case "text":
      return node.text;

    default:
      return null;
  }
}
