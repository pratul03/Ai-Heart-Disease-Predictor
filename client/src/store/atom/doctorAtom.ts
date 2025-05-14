import { atomWithStorage } from "jotai/utils";

export const doctorAtom = atomWithStorage<{
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
  }>("doctor", {
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
  });