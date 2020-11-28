<template>
  <div class="editor">
    <editor-menu-bar v-slot="{commands, isActive, getMarkAttrs }" :editor="editor">
       <div class="menubar flex flex-wrap items-center mb-2">
        <div class="menubar__group">
          <button
            :class="{ 'is-active': isActive.bold() }"
            class="menubar__button"
            @click="commands.bold"
          >
            <b>B</b>
          </button>
          <button
            :class="{ 'is-active': isActive.italic() }"
            class="menubar__button"
            @click="commands.italic"
          >
            <i>I</i>
          </button>
          <button
            :class="{ 'is-active': isActive.strike() }"
            class="menubar__button"
            @click="commands.strike"
          >
            <s>S</s>
          </button>
          <button
            :class="{ 'is-active': isActive.underline() }"
            class="menubar__button"
            @click="commands.underline"
          >
          <u>U</u>
          </button>
          <button
            :class="{ 'is-active': isActive.code() }"
            class="menubar__button"
            @click="commands.code"
          >
           <span> code </span>
          </button>
        </div>
        <div class="menubar__group">
            <button
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            class="menubar__button"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>
          <button
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            class="menubar__button"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>
          <button
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            class="menubar__button"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

        </div>
        <div class="menubar__group">
          <button
            :class="{ 'is-active': isActive.bullet_list() }"
            class="menubar__button"
            @click="commands.bullet_list"
          >
            <span>ul</span>
          </button>
          <button
            :class="{ 'is-active': isActive.ordered_list() }"
            class="menubar__button"
            @click="commands.ordered_list"
          >
            <span>ol</span>
          </button>
        </div>
        <div class="menubar__group">
          <button
            :class="{ 'is-active': isActive.link() }"
            class="menubar__button"
            @click="showLinkPrompt(commands.link, getMarkAttrs('link'))"
          >
            🔗
          </button>
          <button
            :disabled="!isActive.link()"
            :class="{ 'is-disabled': !isActive.link() }"
            class="menubar__button"
            @click="removeLink(commands.link)"
          >
          </button>
          <button
            class="menubar__button"
            @click="showImagePrompt(commands.image)"
          >
            □
          </button>
          <button
            :class="{ 'is-active': isActive.blockquote() }"
            class="menubar__button"
            @click="commands.blockquote"
          >
            <span>❝❞</span>
          </button>
          <button
            :class="{ 'is-active': isActive.code_block() }"
            class="menubar__button"
            @click="commands.code_block"
          >
            <span> code </span>
          </button>
          <button
            class="menubar__button"
            @click="commands.horizontal_rule"
          >
            <span>—</span>
          </button>
        </div>
        <div class="menubar__group">
          <button
            class="menubar__button"
            @click="commands.undo"
          >
            <span>⟲</span>
          </button>
          <button
            class="menubar__button"
            @click="commands.redo"
          >
          <span>⟳</span>
          </button>
        </div>
      </div> 
    </editor-menu-bar>
    <editor-content :editor="editor" class="editor__content content" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

export default {
  name: 'Editor',
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    value: {
      handler (data) {
        console.log("Editor watch", data)
      },
      immediate: true
    }
  },
  data () {
    return {
      editor: null,
      linkUrl: null,
      linkMenuIsActive: false,
      html: ''
    }
  },
  async mounted () {
      this.html = this.value
      // for whatever reason it breaks if you remove this line. 
      // https://github.com/ueberdosis/tiptap/issues/577
      // https://github.com/ueberdosis/tiptap/pull/897
      this.editor = new Editor()
      this.editor = new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: this.html,
        onUpdate: ({ getHTML }) => {
            this.html = getHTML()
            this.$emit('input', this.html)
            console.log(this.value)
        },
      }),
      console.log("editor mounted", this.editor)
  },
  beforeDestroy () {
    console.log("destroy",this.editor)
    this.editor.destroy()
  },
  methods: {
    showImagePrompt (command) {
      // eslint-disable-next-line no-alert
      const src = prompt('Enter the URL of the image')
      if (src !== null) {
        command({ src })
      }
    },
    showLinkPrompt (command, attrs) {
      // eslint-disable-next-line no-alert
      const href = prompt('Enter the URL', attrs.href)
      if (href !== null) {
        command({ href })
      }
    },
    removeLink (command) {
      command({ href: null })
    }
  }
}
</script>

<style>
.editor {
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.menubar {
  flex: 0 1 auto;
}

.edtor__content {
  flex: 1 1 auto;
  overflow: auto;
  cursor: text;
}
.editor__content:focus, 
.editor__content *:focus {
    border: none;
    outline: none;
}

.menubar__button {
  @apply p-2 mb-2 bg-gray-400 text-black font-bold rounded;
  min-width: 40px;
}

.menubar__button:focus {
  outline: none;
}


.menubar__button.is-active,
.menubar__button:hover {
  @apply bg-gray-400;
}


.menubar__button.is-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.menubar__button.is-disabled:hover {
  @apply bg-gray-300 opacity-50;
}

.menubar__icon {
  @apply w-6 h-6;
}

.menubar__group {
  display: inline-flex;
}

.menubar__group .menubar__button {
  @apply rounded-none;
}

.menubar__group .menubar__button:first-child {
  @apply rounded-l;
}

.menubar__group .menubar__button:last-child {
  @apply rounded-r mr-2;
}


.editor__content * {
    caret-color: currentColor;
}

.editor__content blockquote {
    border-left: 3px solid rgb(171 171 171 / 28%);;
    padding-left: .8rem;
    font-style: italic;
}

.editor__content ol, 
.editor__content ul {
    padding-left: 1rem;
}
</style>
