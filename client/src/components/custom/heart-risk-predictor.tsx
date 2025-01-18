"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  age: z.number().min(1, { message: "Age must be at least 1." }),
  sex: z.number().min(0).max(1, { message: "Sex must be 0 or 1." }),
  cp: z.number().min(0, { message: "Chest pain type must be at least 0." }),
  trestbps: z.number().min(0, { message: "Resting BP must be at least 0." }),
  chol: z.number().min(0, { message: "Cholesterol must be at least 0." }),
  fbs: z
    .number()
    .min(0)
    .max(1, { message: "Fasting blood sugar must be 0 or 1." }),
  restecg: z.number().min(0, { message: "Resting ECG must be at least 0." }),
  thalach: z.number().min(0, { message: "Max heart rate must be at least 0." }),
  exang: z
    .number()
    .min(0)
    .max(1, { message: "Exercise-induced angina must be 0 or 1." }),
  oldpeak: z.number().min(0, { message: "ST depression must be at least 0." }),
  slope: z.number().min(0, { message: "Slope must be at least 0." }),
  ca: z.number().min(0, { message: "Number of vessels must be at least 0." }),
  thal: z.number().min(0, { message: "Thalassemia must be at least 0." }),
  target: z.number().min(0).max(1, { message: "Target must be 0 or 1." }),
});

const form_inputs = [
  {
    name: "age",
    label: "Age",
    type: "text",
    placeholder: "Enter age",
    description: "Provide your age.",
  },
  {
    name: "sex",
    label: "Sex",
    type: "text",
    placeholder: "Enter sex (0 or 1)",
    description: "0 for female, 1 for male.",
  },
  {
    name: "cp",
    label: "Chest Pain Type",
    type: "text",
    placeholder: "Enter chest pain type",
    description: "0 to 3.",
  },
  {
    name: "trestbps",
    label: "Resting BP",
    type: "text",
    placeholder: "Enter resting blood pressure",
    description: "",
  },
  {
    name: "chol",
    label: "Cholesterol",
    type: "text",
    placeholder: "Enter cholesterol level",
    description: "",
  },
  {
    name: "fbs",
    label: "Fasting Blood Sugar",
    type: "text",
    placeholder: "Enter fasting blood sugar",
    description: "0 for < 120 mg/dl, 1 for > 120 mg/dl.",
  },
  {
    name: "restecg",
    label: "Resting ECG",
    type: "text",
    placeholder: "Enter resting ECG value",
    description: "",
  },
  {
    name: "thalach",
    label: "Max Heart Rate",
    type: "text",
    placeholder: "Enter max heart rate achieved",
    description: "",
  },
  {
    name: "exang",
    label: "Exercise Induced Angina",
    type: "text",
    placeholder: "Enter 0 or 1",
    description: "0 for no, 1 for yes.",
  },
  {
    name: "oldpeak",
    label: "ST Depression",
    type: "text",
    placeholder: "Enter ST depression value",
    description: "",
  },
  {
    name: "slope",
    label: "Slope of ST Segment",
    type: "text",
    placeholder: "Enter slope value",
    description: "",
  },
  {
    name: "ca",
    label: "Number of Vessels",
    type: "text",
    placeholder: "Enter number of vessels (0-4)",
    description: "",
  },
  {
    name: "thal",
    label: "Thalassemia",
    type: "text",
    placeholder: "Enter thalassemia value",
    description: "",
  },
];

function HeartRiskPredictor() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="w-full ml-8 mt-10">
      <Card className="w-[1250px] h-min">
        <CardHeader>
          <CardTitle className="text-2xl">
            🫀 Heart Disease Risk Predictor
          </CardTitle>
          <CardDescription className="text-md">
            Enter all the details properly to get more accurate result.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="gap-4 grid grid-cols-5 place-items-start"
            >
              {form_inputs
                ? form_inputs.map((input, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={input.name as keyof z.infer<typeof formSchema>}
                      render={({ field }) => (
                        <FormItem className="w-[200px]">
                          <FormLabel>{input.label}</FormLabel>
                          <FormControl>
                            <Input
                              type={input.type}
                              placeholder={input.placeholder}
                              {...field} 
                              className="placeholder-cyan-800"
                            />
                          </FormControl>
                          {input.description && (
                            <FormDescription>
                              {input.description}
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))
                : "NULL"}
              <Button type="submit" variant={"secondary"} className="col-span-2 w-40 h-10 text-lg self-center justify-self-center">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}

export default HeartRiskPredictor;
