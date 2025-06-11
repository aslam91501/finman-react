import { atom } from "jotai";
import type { UserData } from "./models";

export const AuthStore = atom<UserData | null>(null)