"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ThanksModal from "../_components/ui/ThanksModal";
import { REGEX_CHECK_MAIL } from "@/regex/mail";
import Button from "../_components/ui/Button";

const EmailAccessForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const [resultModal, setResultModal] = useState<{
    open: boolean;
    type: "success" | "failed";
  }>({
    open: false,
    type: "success",
  });

  const onSubmit = (formData: FieldValues) => {
    try {
      console.log("formData", formData["email"]);

      reset();
      setResultModal({
        open: true,
        type: "success",
      });
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      setResultModal({
        open: true,
        type: "failed",
      });
    }
  };
  return (
    <>
      <form
        className="relative flex w-full max-w-[24rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative flex h-16 w-full min-w-[200px] max-w-[24rem]">
          <Button
            className="!absolute right-1.5 top-2 z-10 select-none py-4 px-6 bg-primary text-center align-middle font-sans text-xs font-bold text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none rounded-full"
            htmlType="submit"
            data-ripple-light="true"
          >
            Get Early Access
          </Button>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Hãy điền email của bạn",
              },
              pattern: {
                value: REGEX_CHECK_MAIL,
                message: "Email không đúng định dạng",
              },
            })}
            className="peer h-full w-full bg-transparent px-3 py-2.5 pr-[180px] font-sans text-sm font-normal border-transparent text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 bg-white rounded-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            placeholder=" "
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-transparent before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-transparent after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[5.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Email Address
          </label>
        </div>
      </form>
      {errors && errors?.["email"]?.message && (
        <span className="text-red-500 text-xs font-medium">
          {(errors?.["email"]?.message as string) ?? ""}
        </span>
      )}
      <ThanksModal
        onClose={() => {
          setResultModal({
            open: false,
            type: "success",
          });
        }}
        open={resultModal.open}
        type={resultModal.type}
      />
    </>
  );
};

export default EmailAccessForm;
