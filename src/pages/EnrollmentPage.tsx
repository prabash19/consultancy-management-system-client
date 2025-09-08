import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addYears } from "date-fns";

// Calculate the latest date allowed for DOB (16 years ago)
const sixteenYearsAgo = addYears(new Date(), -16);
// Define types
interface FormData {
  name: string;
  email: string;
  dob: any;
  address: string;
  education: string;
  files: File[];
}

// Yup validation schemas per step

export const fullSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dob: yup.date().nullable().defined().required("Date of Birth is required"),
  address: yup.string().required("Address is required"),
  education: yup.string().required("Education is required"),
  files: yup
    .array()
    .of(yup.mixed<File>().required())
    .required("At least one file is required")
    .min(1, "At least one file is required"),
});

const steps = ["Personal Info", "Education", "Upload Files"];

function StepperFormWithYup() {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      dob: null,
      address: "",
      education: "",
      files: [],
    },
    resolver: yupResolver(fullSchema),
  });

  const selectedFiles = watch("files");

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    if (currentStep === 0) fieldsToValidate = ["name", "email", "dob"];
    if (currentStep === 1) fieldsToValidate = ["address", "education"];
    if (currentStep === 2) fieldsToValidate = ["files"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setCurrentStep((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("dob", data.dob ? data.dob.toISOString() : "");
    formData.append("address", data.address);
    formData.append("education", data.education);
    data.files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        body: formData,
      });
      if (response.ok) alert("Form submitted successfully!");
      else alert("Submission failed");
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Multi-Step Form</h2>

      {/* Stepper */}
      <div className="flex justify-between mb-6">
        {steps.map((label, index) => (
          <div key={index} className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                index <= currentStep
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  index < currentStep ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1 */}
        {currentStep === 0 && (
          <div className="mb-4">
            <label className="block mb-2">Name:</label>
            <input {...register("name")} className="border p-2 w-full" />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}

            <label className="block mb-2 mt-4">Email:</label>
            <input {...register("email")} className="border p-2 w-full" />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}

            <label className="block mb-2 mt-4">Date of Birth:</label>
            <Controller
              control={control}
              name="dob"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select your date of birth"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="border p-2 w-full"
                  maxDate={sixteenYearsAgo} // prevents selecting a date less than 16 years ago
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              )}
            />
            {errors.dob && (
              <span className="text-red-500">
                Please enter your date of birth
              </span>
            )}
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 1 && (
          <div className="mb-4">
            <label className="block mb-2">Address:</label>
            <input {...register("address")} className="border p-2 w-full" />
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}

            <label className="block mb-2 mt-4">Education:</label>
            <input {...register("education")} className="border p-2 w-full" />
            {errors.education && (
              <span className="text-red-500">{errors.education.message}</span>
            )}
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 2 && (
          <div className="mb-4">
            <label className="block mb-2">Upload Files (Images or PDFs):</label>
            <Controller
              control={control}
              name="files"
              render={({ field }) => (
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) field.onChange(Array.from(files));
                  }}
                  className="border p-2 w-full"
                />
              )}
            />
            {errors.files && (
              <span className="text-red-500">{errors.files.message}</span>
            )}
            <ul className="mt-2">
              {selectedFiles?.map((file: File, idx: number) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Back
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StepperFormWithYup;
