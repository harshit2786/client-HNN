import './styles.css'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import cn from 'classnames'
import Focus from '@tiptap/extension-focus'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import italic from "../../Images/Icons/italic.svg";
import bold from "../../Images/Icons/bold.svg";
import code from "../../Images/Icons/code.svg";
import list from "../../Images/Icons/list.svg";
import strike from "../../Images/Icons/strike.svg";
import quote from "../../Images/Icons/quote.svg";
import numberlist from "../../Images/Icons/numberlist.svg";
export const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Focus.configure({
    className: 'has-focus',
    mode: 'all',
  }),
  Placeholder.configure({
    emptyEditorClass: 'Add Description',
    placeholder: 'Add Description'
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as false becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as false becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]
export const MenuBar = ({descriptionContent,setDescriptionContent}) => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  const html = editor.getHTML();
  setDescriptionContent(html);
  console.log(descriptionContent);
  return (
    <div className="flex gap-3 p-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <img src={bold} style={{ widhth: "15px", height: "15px" }} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <img src={italic} style={{ widhth: "15px", height: "15px" }} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <img src={strike} style={{ widhth: "15px", height: "15px" }} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <img src={code} style={{ widhth: "15px", height: "15px" }} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <img src={quote} style={{ widhth: "15px", height: "15px" }} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <img src={list} style={{ widhth: "15px", height: "15px" }} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <img src={numberlist} style={{ widhth: "15px", height: "15px" }} />
      </button>
    </div>
  );
};
export const props = {
  attributes: {
    class: cn(
      'prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc text-xs',
    ),
  }
};