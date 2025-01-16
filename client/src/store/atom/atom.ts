import { atom } from 'recoil';

export const userAtom = atom({
    key : "userAtom",
    default :<{name: string; email: string; age: number; sex: string; avatar: string}> {}
})