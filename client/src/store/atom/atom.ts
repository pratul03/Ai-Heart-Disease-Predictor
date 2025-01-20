import { atom } from "recoil";

export const userAtom = atom<{
    _id: string;
    name: string;
    email: string;
    age: number;
    sex: string;
    avatar: string;
    location: object;
    role: string;
    createdAt: string;
  }>({
    key: "userAtom",
    default: {
      _id: "",
      name: "",
      email: "",
      age: 0,
      sex: "",
      avatar: "",
      location: {},
      role: "",
      createdAt: "",
    },
  });


  export const doctorAtom = atom<{
    _id: string;
    name: string;
    email: string;
    age: number;
    gender: string;
    image: string;
    specialization: string;
    role: string;
    contact_info: object;
    fees: number;
    chamber: object;
    hospital_visits: object;
    qualifications: object;
    overall_experience: number;
    rating: number;
    reviews: Array<object>;
    createdAt: string;
  }>({
    key: "doctorAtom",
    default: {
      _id: "",
      name: "",
      email: "",
      age: 0,
      gender: "",
      image: "",
      specialization: "",
      role: "",
      contact_info: {},
      fees: 0,
      chamber: {},
      hospital_visits: {},
      qualifications: {},
      overall_experience: 0,
      rating: 0,
      reviews: [],
      createdAt: "",
    },
  });

export const predictionResultAtom = atom({
  key: "predictionResultAtom",
  default: <{ result: string; probability: number }>{},
});
