"use client";
import { useEffect, useState } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { editorOptions } from './config';
import * as monaco from 'monaco-editor';
import dynamic from 'next/dynamic';
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });
import PreviewPanel from './PreviewPanel';
import usePlaygroundContext from '@/hooks/usePlaygroundContext';
import { Languages } from '@/components/editor/Languages';

const EditorPanel = () => {

  const { files, setFiles, currentFileIndex, setCurrentFileIndex, theme } = usePlaygroundContext();
  const { code, language } = files[currentFileIndex];
  const [value, setValue] = useState(code);

  useEffect(() => {
    if (files.length === 0) {
      setFiles([
        { filePath: 'index.html', code: '', language: Languages[0] },
        { filePath: 'styles.css', code: '', language: Languages[1] },
        { filePath: 'script.js', code: '', language: Languages[2] },
      ]);
    }
  }, []);

  useEffect(() => {
    setValue(files[currentFileIndex].code);
  }, [currentFileIndex]);

  const handleEditorChange = (value: string) => {
    setValue(value);
    const newFiles = [...files];
    newFiles[currentFileIndex].code = value;
    setFiles(newFiles);
  };

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
        "polyline", "rect", "stop", "use", "h1", "h2", "h3", "h4", "h5", "h6", "input",
        "img", "link", "meta", "area", "base", "col", "command", "embed"
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
        <h1 className={`rounded px-1 md:px-4 cursor-pointer text-sm font-semibold ${currentFileIndex === 0 ? 'text-primary-500' : ''}`}
          onClick={() => setCurrentFileIndex(0)}
        >
          HTML
        </h1>
        <h1 className={`rounded px-1 md:px-4 cursor-pointer text-sm font-semibold ${currentFileIndex === 1 ? 'text-primary-500' : ''}`}
          onClick={() => setCurrentFileIndex(1)}
        >
          CSS
        </h1>
        <h1 className={`rounded px-1 md:px-4 cursor-pointer text-sm font-semibold ${currentFileIndex === 2 ? 'text-primary-500' : ''}`}
          onClick={() => setCurrentFileIndex(2)}
        >
          JS
        </h1>
        <div className="md:hidden">
          <PreviewPanel />
        </div>
      </div>
      <div className="flex-1 h-full absolute w-full">
        <MonacoEditor
          options={editorOptions}
          theme={theme === 'dark' ? 'vs-dark' : ''}
          height="100%"
          defaultLanguage="html"
          language={language.value}
          path={files[currentFileIndex].filePath}
          value={value}
          onChange={(value) => handleEditorChange(value || '')}
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