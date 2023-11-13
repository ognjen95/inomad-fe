import { atom } from "jotai";
import { IconType } from "ui-components";

import { QuestionEntity } from "~graphql-api";

export type ContentModel = {
  id: string;
  name: string;
  count: number;
  url: string;
  iconType: IconType;
};

export const addedContentAtom = atom<Array<ContentModel>>([]);

export const disableEditingAtom = atom<boolean>(false);
