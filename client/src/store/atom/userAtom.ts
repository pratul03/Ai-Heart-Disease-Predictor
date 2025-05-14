import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage<{
  _id: string;
  name: string;
  email: string;
  age: number;
  sex: string;
  avatar: string;
  location: object;
  role: string;
  createdAt: string;
}>("user", {
  _id: "",
  name: "",
  email: "",
  age: 0,
  sex: "",
  avatar: "",
  location: {},
  role: "",
  createdAt: "",
});