import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export type EditorTheme = 'light' | 'dark';

export const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions =
  {
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: "on",
    accessibilitySupport: "auto",
    autoClosingBrackets: "always",
    autoIndent: "full",
    automaticLayout: true,
    bracketPairColorization: {
      enabled: true,
    },
    codeLens: true,
    colorDecorators: true,
    contextmenu: true,
    cursorBlinking: "blink",
    cursorSmoothCaretAnimation: "off",
    cursorStyle: "line",
    disableLayerHinting: false,
    disableMonospaceOptimizations: false,
    dragAndDrop: false,
    fixedOverflowWidgets: false,
    folding: true,
    foldingStrategy: "auto",
    fontLigatures: false,
    formatOnPaste: false,
    formatOnType: false,
    hideCursorInOverviewRuler: false,
    links: true,
    mouseWheelZoom: false,
    multiCursorMergeOverlapping: true,
    multiCursorModifier: "alt",
    overviewRulerBorder: true,
    overviewRulerLanes: 2,
    quickSuggestions: true,
    quickSuggestionsDelay: 100,
    readOnly: false,
    renderControlCharacters: false,
    renderFinalNewline: "on",
    renderLineHighlight: "all",
    renderWhitespace: "none",
    revealHorizontalRightPadding: 30,
    roundedSelection: true,
    rulers: [],
    scrollBeyondLastColumn: 5,
    scrollBeyondLastLine: true,
    selectOnLineNumbers: true,
    selectionClipboard: true,
    selectionHighlight: true,
    showFoldingControls: "mouseover",
    smoothScrolling: false,
    suggestOnTriggerCharacters: true,
    wordBasedSuggestions: "allDocuments",
    wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
    wordWrap: "on",
    wordWrapBreakAfterCharacters: "\t})]?|&,;",
    wordWrapBreakBeforeCharacters: "{([+",
    wordWrapColumn: 80,
    wrappingIndent: "none",
  };

  const htmlDefaultTemplate: string = `<!DOCTYPE html>
<html>

<head>
  <title>Document</title>
</head>

<body>
  <h1>Hello World</h1>
  <p>Start coding!</p>
</body>

</html>
`;

const cssDefaultTemplate: string = `h1 {
  color: green;
}
`;

const jsDefaultTemplate: string = `console.log('Hello World');
`;

export const defaultState = {
  html: htmlDefaultTemplate,
  css: cssDefaultTemplate,
  js: jsDefaultTemplate,
};
