"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "../ui/button";

interface FormErrors {
  [key: string]: string;
}

interface FormData {
  [key: string]: string | number;
}

const form_inputs = [
  {
    name: "age",
    label: "Age",
    placeholder: "in years",
    description: "Enter your age between 15 to 100",
    required: true,
    min: 15,
    max: 100,
  },
  {
    name: "trestbps",
    label: "Resting BP",
    placeholder: "in mm Hg",
    description: "Enter Resting BP between 50 to 200",
    required: true,
    min: 50,
    max: 200,
  },
  {
    name: "chol",
    label: "Cholesterol",
    placeholder: "in mg/dl",
    description: "Enter cholesterol level between 50 to 1000",
    required: true,
    min: 50,
    max: 1000,
  },
  {
    name: "thalach",
    label: "Maximum Heart Rate",
    placeholder: "in bpm",
    description: "Enter max heart rate between 60 to 220",
    required: true,
    min: 60,
    max: 220,
  },
  {
    name: "oldpeak",
    label: "ST Depression",
    placeholder: "in mm",
    description: "Enter ST depression between 0 to 10",
    required: true,
    min: 0,
    max: 10,
  },
  {
    name: "sex",
    label: "Sex",
    select: ["male", "female"],
    placeholder: "Select sex",
    required: true,
    value: [0, 1],
  },
  {
    name: "cp",
    label: "Chest Pain Type",
    select: [
      "typical angina",
      "atypical angina",
      "non-anginal pain",
      "asymptomatic",
    ],
    placeholder: "Select chest pain type",
    required: true,
    Value: [0, 1, 2, 3],
  },
  {
    name: "fbs",
    label: "Fasting Blood Sugar",
    select: ["less than 120mg/dl", "greater than 120mg/dl"],
    placeholder: "Select fasting blood sugar",
    required: true,
    value: [0, 1],
  },
  {
    name: "restecg",
    label: "Resting ECG",
    select: ["normal", "ST-T wave abnormality", "left ventricular hypertrophy"],
    placeholder: "Select resting ecg",
    required: true,
    value: [0, 1, 2],
  },
  {
    name: "exang",
    label: "Exercise Induced Angina",
    select: ["yes", "no"],
    placeholder: "Select exercise induced angina",
    required: true,
    value: [0, 1],
  },
  {
    name: "slope",
    label: "Slope of ST Segment",
    select: ["upsloping", "flat", "downsloping"],
    placeholder: "Select slope of st segment",
    required: true,
    value: [0, 1, 2],
  },
  {
    name: "ca",
    label: "Number of Vessels",
    select: ["0", "1", "2", "3"],
    placeholder: "Select number of vessels",
    required: true,
    value: [0, 1, 2, 3],
  },
  {
    name: "thal",
    label: "Thalassemia",
    select: ["normal", "fixed defect", "reversible defect"],
    placeholder: "Select thalassemia",
    required: true,
    value: [0, 1, 2],
  },
];

function HeartRiskPredictorForm() {
  const [data, setData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const handleValidation = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    form_inputs.forEach((input) => {
      const value = data[input.name];

      if (input.required && (value === undefined || value === "")) {
        isValid = false;
        newErrors[input.name] = `${input.label} is required.`;
      }

      if (
        value !== undefined &&
        typeof value === "number" &&
        (input.min !== undefined || input.max !== undefined)
      ) {
        if (input.min !== undefined && value < input.min) {
          isValid = false;
          newErrors[
            input.name
          ] = `${input.label} must be at least ${input.min}.`;
        }
        if (input.max !== undefined && value > input.max) {
          isValid = false;
          newErrors[
            input.name
          ] = `${input.label} must be at most ${input.max}.`;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("Submitted Data:", data);
    } else {
      console.log("Validation Failed:", errors);
    }
  };

  return (
    <>
      <Card className="w-[1200px] h-min">
        <CardHeader>
          <CardTitle className="text-2xl">
            🫀 Heart Disease Risk Predictor
          </CardTitle>
          <CardDescription className="text-md">
            Enter all the details properly to get more accurate result.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <form
            action=""
            className="grid grid-cols-5 gap-5"
            onSubmit={handleSubmit}
          >
            {form_inputs.map((input, index) => (
              <div key={index}>
                {input.select ? (
                  <>
                    <Label>{input.label}</Label>
                    <Select
                      onValueChange={(value) =>
                        setData({
                          ...data,
                          [input.name]: parseInt(value, 10),
                        })
                      }
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder={input.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {input.select.map((item, idx) => (
                            <SelectItem key={idx} value={String(idx)}>
                              {item.charAt(0).toUpperCase() + item.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors[input.name] && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors[input.name]}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <Label>{input.label}</Label>
                    <Input
                      type="number"
                      placeholder={input.placeholder}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setData({ ...data, [input.name]: value });
                      }}
                      className="w-[200px]"
                      required={input.required}
                    />
                    {errors[input.name] && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors[input.name]}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-cyan-300">
                      {input.description}
                    </p>
                  </>
                )}
              </div>
            ))}
            <div className="col-span-2 flex justify-center items-center space-x-5">
            <Button
              type="submit"
              variant={"secondary"}
              className=" w-40 h-10 text-lg self-end justify-self-center"
            >
              Submit
            </Button>
            <Button
              type="button"
              variant={"outline"}
              className="w-40 h-10 text-lg self-end justify-self-center"
              onClick={() => {
                setData({});
                setErrors({});
              }}
            >
              Reset
            </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </>
  );
}

export default HeartRiskPredictorForm;
