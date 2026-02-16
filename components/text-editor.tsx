"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from '@tiptap/extension-text-align'

import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignStart,
  TextAlignJustify,
  Heading3,
  Heading4,
} from "lucide-react";
import { useEffect } from "react";

type Props = {
  content: string;
  onChange: (html: string) => void;
};

export default function TextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[200px]",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `rounded p-2 transition ${
      active ? "bg-black text-white" : "hover:bg-gray-100"
    }`;

  return (
    <div className="space-y-2 rounded-md border border-gray-300 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 bg-gray-100 border-b border-gray-300 p-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={btn(editor.isActive("heading", { level: 1 }))}
        >
          <Heading1 size={18} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={btn(editor.isActive("heading", { level: 2 }))}
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={btn(editor.isActive("heading", { level: 3 }))}
        >
          <Heading3 size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className={btn(editor.isActive("heading", { level: 4 }))}
        >
          <Heading4 size={18} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={btn(editor.isActive("bold"))}
        >
          <Bold size={18} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={btn(editor.isActive("italic"))}
        >
          <Italic size={18} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={btn(editor.isActive("strike"))}
        >
          <Strikethrough size={18} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={btn(editor.isActive("bulletList"))}
        >
          <List size={18} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={btn(editor.isActive("orderedList"))}
        >
          <ListOrdered size={18} />
        </button>

        <div className="flex items-center px-4 gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              editor.chain().focus().setTextAlign('right').run();
            }}
            className={btn(editor.isActive({ textAlign: 'right' }))}
          >
            <TextAlignEnd size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              editor.chain().focus().setTextAlign('center').run();
            }}
            className={btn(editor.isActive({ textAlign: 'center' }))}
          >
            <TextAlignCenter size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              editor.chain().focus().setTextAlign('left').run();
            }}
            className={btn(editor.isActive({ textAlign: 'left' }))}
          >
            <TextAlignStart size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              editor.chain().focus().setTextAlign('justify').run();
            }}
            className={btn(editor.isActive({ textAlign: 'justify' }))}
          >
            <TextAlignJustify size={18} />
          </button>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={btn(editor.isActive("blockquote"))}
        >
          <Quote size={18} />
        </button>

        <button
          onClick={() => {
            const url = prompt("Image URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="rounded p-2 hover:bg-gray-100"
        >
          <ImageIcon size={18} />
        </button>

        <button
          onClick={() => {
            const url = prompt("Link URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={btn(editor.isActive("link"))}
        >
          <LinkIcon size={18} />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="p-3" />
    </div>
  );
}
