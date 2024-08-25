"use client"

import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { EditorTheme } from './config';
import { LanguageMeta } from '@/components/editor/Languages';

export interface IState {
  filePath : string;
  code: string;
  language: LanguageMeta;
}

export interface IContext {
  
  files: IState[];
  setFiles: (files: IState[]) => void;

  currentFileIndex: number;
  setCurrentFileIndex: (index: number) => void;
  
  theme: EditorTheme;
  setTheme: Dispatch<SetStateAction<EditorTheme>>;
}

export const PlaygroundContext = createContext<IContext | undefined>(undefined);

export default PlaygroundContext