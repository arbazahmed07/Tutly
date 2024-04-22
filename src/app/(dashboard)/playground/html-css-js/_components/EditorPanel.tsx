"use client";

import MonacoEditor from '@monaco-editor/react';
import { useContext } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { editorOptions } from './config';
import { Context } from './context';
import * as monaco from 'monaco-editor';
import PreviewPanel from './PreviewPanel';


const EditorPanel = () => {
  const { state, dispatch, currentTabIndex, setCurrentTabIndex, theme } = useContext(Context);
  const value = currentTabIndex === 0 ? state.html : currentTabIndex === 1 ? state.css : state.js;
  const language = currentTabIndex === 0 ? 'html' : currentTabIndex === 1 ? 'css' : 'javascript';
  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;

    const newState = {
      ...state,
      [currentTabIndex === 0 ? 'html' : currentTabIndex === 1 ? 'css' : 'js']: value,
    };

    dispatch(newState);
  }

  // enable auto closing tags ref:https://github.com/microsoft/monaco-editor/issues/221#issuecomment-1625456462 
  const handleAutoClosingTags = (event: any, editor: monaco.editor.IStandaloneCodeEditor) => {
    const enabledLanguages: string[] = ["html", "markdown", "javascript", "typescript"]; // enable js & ts for jsx & tsx

    const model = editor.getModel();
    if (!enabledLanguages.includes(model!.getLanguageId()!)) {
      return;
    }

    const isSelfClosing = (tag: string) =>
      [
        "area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link",
        "meta", "param", "source", "track", "wbr", "circle", "ellipse", "line", "path", "polygon",
        "polyline", "rect", "stop", "use",
      ].includes(tag);

    // when the user enters '>'
    if (event.browserEvent.key === ">") {


      const currentSelections = editor.getSelections();

      const edits: monaco.editor.IIdentifiedSingleEditOperation[] = [];
      const newSelections: monaco.Selection[] = [];
      // potentially insert the ending tag at each of the selections
      for (const selection of currentSelections!) {
        // shift the selection over by one to account for the new character
        newSelections.push(
          new monaco.Selection(
            selection.selectionStartLineNumber,
            selection.selectionStartColumn + 1,
            selection.endLineNumber,
            selection.endColumn + 1,
          ),
        );
        // grab the content before the cursor
        const contentBeforeChange = model!.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: selection.endLineNumber,
          endColumn: selection.endColumn,
        })!;

        // if ends with a HTML tag we are currently closing
        const match = contentBeforeChange.match(/<([\w-]+)(?![^>]*\/>)[^>]*$/);
        if (!match) {
          continue;
        }

        const [fullMatch, tag] = match;

        // skip self-closing tags like <br> or <img>
        if (isSelfClosing(tag) || fullMatch.trim().endsWith("/")) {
          continue;
        }

        // add in the closing tag
        edits.push({
          range: {
            startLineNumber: selection.endLineNumber,
            startColumn: selection.endColumn + 1, // add 1 to offset for the inserting '>' character
            endLineNumber: selection.endLineNumber,
            endColumn: selection.endColumn + 1,
          },
          text: `</${tag}>`,
        });
      }

      // wait for next tick to avoid it being an invalid operation
      setTimeout(() => {
        return editor.executeEdits(JSON.stringify(edits), newSelections as any);
      }, 0);
    }
  }

  return (
    <div className="shadow-xl">
      <ThemeSwitcher />
      <div className="flex p-3">
        <h1 className={`rounded px-1 md:px-4 cursor-pointer text-sm font-semibold ${currentTabIndex === 0 ? 'text-primary-500' : ''}`}
          onClick={() => setCurrentTabIndex(0)}
        >
          HTML
        </h1>
        <h1 className={`rounded px-1 md:px-4 cursor-pointer text-sm font-semibold ${currentTabIndex === 1 ? 'text-primary-500' : ''}`}
          onClick={() => setCurrentTabIndex(1)}
        >
          CSS
        </h1>
        <h1 className={`rounded px-1 md:px-4 cursor-pointer text-sm font-semibold ${currentTabIndex === 2 ? 'text-primary-500' : ''}`}
          onClick={() => setCurrentTabIndex(2)}
        >
          JS
        </h1>
        <div className="md:hidden">
          <PreviewPanel/>
        </div>
      </div>
      <div className="flex-1 h-full absolute w-full">
        <MonacoEditor
          options={editorOptions}
          theme={theme === 'dark' ? 'vs-dark' : ''}
          height="100%"
          defaultLanguage="html"
          language={language}
          value={value}
          onChange={(value) => handleEditorChange(value)}
          onMount={(editor, monaco) => {
            editor.onKeyDown((event) => {
              handleAutoClosingTags(event, editor);
            });
          }
          }
        />
      </div>
    </div>
  );
};

export default EditorPanel;