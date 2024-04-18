"use client"

import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { EditorTheme } from './config';

export interface IState {
  html: string;
  css: string;
  js: string;
}

export interface IContext {
  state: IState;
  dispatch: Dispatch<SetStateAction<IState>>;
  currentTabIndex: number;
  setCurrentTabIndex: Dispatch<SetStateAction<number>>;
  theme: EditorTheme;
  setTheme: Dispatch<SetStateAction<EditorTheme>>;
}

export const Context = createContext<IContext>(null as any);
