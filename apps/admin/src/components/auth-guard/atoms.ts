import { atom, useAtom, useAtomValue } from "jotai";
import { UserRoles } from "src/common/enums";

export type UserInfo = {
  userRole: UserRoles | null;
};

export const userInfoAtom = atom<UserInfo>({
  userRole: null,
});

export const useUserInfoAtom = () => useAtom(userInfoAtom);
export const useUserInfoAtomValue = () => useAtomValue(userInfoAtom);
