"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ThanksModal from "../_components/ui/ThanksModal";
import { REGEX_CHECK_MAIL } from "@/regex/mail";
import Button from "../_components/ui/Button";

const MailIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      className={className}
    >
      <path
        d="M3.25 0H16.75C18.483 0 19.8992 1.35645 19.9949 3.06558L20 3.25V12.75C20 14.483 18.6435 15.8992 16.9344 15.9949L16.75 16H3.25C1.51697 16 0.100754 14.6435 0.00514483 12.9344L0 12.75V3.25C0 1.51697 1.35645 0.100754 3.06558 0.0051446L3.25 0H16.75H3.25ZM18.5 5.373L10.3493 9.66369C10.1619 9.76233 9.94313 9.77642 9.74676 9.70596L9.65069 9.66369L1.5 5.374V12.75C1.5 13.6682 2.20711 14.4212 3.10647 14.4942L3.25 14.5H16.75C17.6682 14.5 18.4212 13.7929 18.4942 12.8935L18.5 12.75V5.373ZM16.75 1.5H3.25C2.33183 1.5 1.57881 2.20711 1.5058 3.10647L1.5 3.25V3.679L10 8.15246L18.5 3.678V3.25C18.5 2.33183 17.7929 1.57881 16.8935 1.5058L16.75 1.5Z"
        fill="#9A9EA6"
      />
    </svg>
  );
};

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
                message: "Email is required",
              },
              pattern: {
                value: REGEX_CHECK_MAIL,
                message: "Incorrect format",
              },
            })}
            className="peer h-full w-full bg-transparent px-3 py-2.5 pr-[180px] sm:pl-12 font-sans text-sm font-normal border-transparent text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 bg-white rounded-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] relative"
            placeholder=" "
          />
          <MailIcon className="absolute left-5 bottom-[23px] hidden sm:inline-block" />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 sm:left-9 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-transparent before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-transparent after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[5.55] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
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
