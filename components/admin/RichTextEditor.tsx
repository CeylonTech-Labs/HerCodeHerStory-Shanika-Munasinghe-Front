"use client";

import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Eraser,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            }
          }
        }
      }
    ];
  }
});

const fonts = ["Inter", "Poppins", "Playfair Display", "Roboto", "Lora", "Montserrat", "Merriweather", "Dancing Script"];
const sizes = ["12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px", "48px"];

export function RichTextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      FontFamily,
      FontSize,
      TextAlign.configure({ types: ["heading", "paragraph"] })
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "content-rich min-h-[360px] rounded-b-lg border border-t-0 bg-background p-5 focus:outline-none"
      }
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML())
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "");
  }, [editor, value]);

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Enter link URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="rounded-lg">
      <div className="flex flex-wrap gap-2 rounded-t-lg border bg-muted/40 p-3">
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></Button>
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></Button>
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="h-4 w-4" /></Button>
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="h-4 w-4" /></Button>
        {[1, 2, 3].map((level) => (
          <Button key={level} type="button" size="sm" variant="outline" onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run()}>H{level}</Button>
        ))}
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().setParagraph().run()}><Pilcrow className="h-4 w-4" /></Button>
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></Button>
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></Button>
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></Button>
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code2 className="h-4 w-4" /></Button>
        <Button type="button" size="icon" variant="outline" onClick={addLink}><LinkIcon className="h-4 w-4" /></Button>
        <Button type="button" size="icon" variant="outline" onClick={addImage}><ImageIcon className="h-4 w-4" /></Button>
        <Input type="color" className="h-10 w-12 p-1" onChange={(event) => editor.chain().focus().setColor(event.target.value).run()} title="Text color" />
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()}><Highlighter className="h-4 w-4" /></Button>
        {(["left", "center", "right", "justify"] as const).map((align) => (
          <Button key={align} type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().setTextAlign(align).run()}>
            {align === "left" ? <AlignLeft className="h-4 w-4" /> : align === "center" ? <AlignCenter className="h-4 w-4" /> : align === "right" ? <AlignRight className="h-4 w-4" /> : <AlignJustify className="h-4 w-4" />}
          </Button>
        ))}
        <select className="h-10 rounded-lg border bg-background px-2 text-sm" onChange={(event) => editor.chain().focus().setFontFamily(event.target.value).run()}>
          <option value="">Font</option>
          {fonts.map((font) => <option key={font} value={font}>{font}</option>)}
        </select>
        <select className="h-10 rounded-lg border bg-background px-2 text-sm" onChange={(event) => editor.chain().focus().setMark("textStyle", { fontSize: event.target.value }).run()}>
          <option value="">Size</option>
          {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
        </select>
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().undo().run()}><Undo2 className="h-4 w-4" /></Button>
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().redo().run()}><Redo2 className="h-4 w-4" /></Button>
        <Button type="button" size="icon" variant="outline" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}><Eraser className="h-4 w-4" /></Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
