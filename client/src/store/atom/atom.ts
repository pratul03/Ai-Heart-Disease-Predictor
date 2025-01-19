import { atom } from 'recoil';

export const userAtom = atom({
    key : "userAtom",
    default :<{name: string; email: string; age: number; sex: string; avatar: string}> {}
})

export const doctorAtom = atom({
    key : "doctorAtom",
    default :<{name: string; email: string; age: number}>
    {}
})

export const predictionResultAtom = atom({
    key : "predictionResultAtom",
    default :<{result: string; probability: number}> {}
})