import './styles.css'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import cn from 'classnames'
import Focus from '@tiptap/extension-focus'
import Placeholder from '@tiptap/extension-placeholder'
import { useCurrentEditor } from "@tiptap/react";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaStrikethrough } from "react-icons/fa";
import { TbBlockquote } from "react-icons/tb";
import { FaListOl } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { useEffect } from 'react'


export const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Focus.configure({
    className: 'has-focus',
    mode: 'all',
  }),
  Placeholder.configure({
    emptyEditorClass: 'Write Content',
    placeholder: 'Write Content'
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
  useEffect(() => {
    if (!editor) {
      return;
    }
    const updateDescriptionContent = () => {
      const html = editor.getHTML();
      setDescriptionContent(html);
    };
    updateDescriptionContent();
    editor.on('update', updateDescriptionContent);

    return () => {
      editor.off('update', updateDescriptionContent);
    };
  }, [editor, setDescriptionContent]);
  if (!editor) {
    return null;
  }
  return (
    <div className="flex gap-3 p-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FaBold/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FaItalic/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <FaStrikethrough/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <TbBlockquote/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <FaListUl/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <FaListOl/>
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