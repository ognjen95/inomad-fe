import { atom } from "jotai";
import { IconType } from "ui-components";

export type ContentModel = {
  id: string;
  name: string;
  count: number;
  url: string;
  iconType: IconType;
};

export const addedContentAtom = atom<Array<ContentModel>>([]);

export const disableEditingAtom = atom<boolean>(false);
