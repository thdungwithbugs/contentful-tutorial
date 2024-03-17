"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Button from "@/app/_components/ui/Button";
import ThanksModal from "@/app/_components/ui/ThanksModal";
import Container from "@/app/_components/ui/Container";
import { isNull } from "util";

interface IMockQuestionData {
  id: number;
  label: string;
  choices: { id: string; val: string }[];
  answerAmount: number;
  answer: string[];
  hint: string;
}

const CorrectIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20px"
      height="20px"
      viewBox="0 0 117 117"
      version="1.1"
    >
      <title />
      <desc />
      <defs />
      <g
        fill="none"
        fillRule="evenodd"
        id="Page-1"
        stroke="none"
        strokeWidth="1"
      >
        <g fillRule="nonzero" id="correct">
          <path
            d="M34.5,55.1 C32.9,53.5 30.3,53.5 28.7,55.1 C27.1,56.7 27.1,59.3 28.7,60.9 L47.6,79.8 C48.4,80.6 49.4,81 50.5,81 C50.6,81 50.6,81 50.7,81 C51.8,80.9 52.9,80.4 53.7,79.5 L101,22.8 C102.4,21.1 102.2,18.5 100.5,17 C98.8,15.6 96.2,15.8 94.7,17.5 L50.2,70.8 L34.5,55.1 Z"
            fill="#17AB13"
            id="Shape"
          />

          <path
            d="M89.1,9.3 C66.1,-5.1 36.6,-1.7 17.4,17.5 C-5.2,40.1 -5.2,77 17.4,99.6 C28.7,110.9 43.6,116.6 58.4,116.6 C73.2,116.6 88.1,110.9 99.4,99.6 C118.7,80.3 122,50.7 107.5,27.7 C106.3,25.8 103.8,25.2 101.9,26.4 C100,27.6 99.4,30.1 100.6,32 C113.1,51.8 110.2,77.2 93.6,93.8 C74.2,113.2 42.5,113.2 23.1,93.8 C3.7,74.4 3.7,42.7 23.1,23.3 C39.7,6.8 65,3.9 84.8,16.2 C86.7,17.4 89.2,16.8 90.4,14.9 C91.6,13 91,10.5 89.1,9.3 Z"
            fill="#4A4A4A"
            id="Shape"
          />
        </g>
      </g>
    </svg>
  );
};

function Quiz({ mockQuestionData }: { mockQuestionData: IMockQuestionData[] }) {
  const [curIndex, setCurIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState<"nothing" | boolean>(
    "nothing"
  );
  const [resultModal, setResultModal] = useState<boolean>(false);
  const [showHint, setShowHint] = useState(false);
  const curAnswer = mockQuestionData[curIndex];

  const FormSchema = z.object({
    items: z
      .array(z.string())
      .refine((value) => value.length === curAnswer?.answerAmount, {
        message: `You must choose ${curAnswer.answerAmount} answer${
          curAnswer.answerAmount > 1 ? "s" : ""
        } .`,
      }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // reValidateMode: "onSubmit",
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      const sortedData = [...data.items].sort();
      setShowNextButton(
        () => sortedData.sort().join(",") === curAnswer?.answer.sort().join(",")
      );
    },
    [curAnswer?.answer]
  );

  const handleNextQuestion = useCallback(() => {
    setShowHint(false);
    if (curIndex + 1 < mockQuestionData.length) {
      setCurIndex(curIndex + 1);
      setShowNextButton("nothing");
      form.reset({
        items: [],
      });
    } else {
      setShowNextButton("nothing");
    }
  }, [curIndex, form, mockQuestionData.length]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: true,
    });
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Im not sure that func will right in every broswer behavior cases
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    return (e.returnValue = "");
  };

  const handleCheckboxChange = useCallback(
    (
      field: ControllerRenderProps<
        {
          items: string[];
        },
        "items"
      >,
      item: {
        id: string;
        val: string;
      }
    ) => {
      const currentValue = field.value || [];
      const index = currentValue.indexOf(item.id);
      if (index !== -1) {
        currentValue.splice(index, 1);
      } else {
        if (curAnswer?.answerAmount === 1) {
          currentValue.length = 0;
        } else if (curAnswer?.answerAmount === 2) {
          if (currentValue.length === curAnswer?.answerAmount) {
            currentValue.shift();
          }
        } else {
          if (currentValue.length === curAnswer?.answerAmount) {
            currentValue.shift();
          }
        }
        currentValue.push(item.id);
      }
      field.onChange(currentValue);
    },
    [curAnswer?.answerAmount]
  );

  return (
    <div className="bg-black isolate relative">
      <Image
        priority={true}
        src="/images/quizBg.jpg"
        alt="hero background"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right"
        quality={90}
        width={1920}
        height={720}
      />
      <Container className="h-[80vh] flex items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 px-8 py-6 rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition-all max-w-[500px] bg-white"
          >
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">
                      Question {curAnswer?.id}: {curAnswer?.label}
                    </h2>
                    <FormDescription>
                      Choose {curAnswer?.answerAmount} answer below
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-1 gap-6 py-4">
                    {curAnswer?.choices?.map((item, index) => (
                      <FormField
                        key={index}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-center space-x-3 space-y-0 px-4 py-2 border border-gray-300 shadow-xl"
                            >
                              <FormControl>
                                <Checkbox
                                  disabled={showNextButton === true}
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    console.log(
                                      "🚀 ~ Quiz ~ checked:",
                                      checked
                                    );
                                    handleCheckboxChange(field, item);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal flex-1 cursor-pointer">
                                {item.val}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showHint && (
              <div className="text-white bg-[#8D3B72] text-xs font-semibold text-center rounded-md shadow-md p-3">
                Hint : {curAnswer?.hint}
              </div>
            )}
            <div
              className={twMerge(
                "text-base font-bold",
                showNextButton === true
                  ? "text-green-600"
                  : showNextButton === false
                  ? "text-red-500"
                  : ""
              )}
            >
              {showNextButton === true
                ? "Thats right, congratulation !!!"
                : showNextButton === false
                ? "Wrong, choose again..."
                : null}
            </div>

            <div className="flex items-center gap-6">
              {showNextButton === true ? (
                curIndex + 1 < mockQuestionData.length && (
                  <Button onClick={handleNextQuestion} key={"btn_next"}>
                    Next question
                  </Button>
                )
              ) : (
                <Button htmlType={"submit"} key={"btn_submit"}>
                  Submit answer
                </Button>
              )}
              <span
                onClick={() => setShowHint((prev) => !prev)}
                key={"btn_show_hint"}
                className="underline text-blue-600 cursor-pointer inline-block italic text-sm"
              >
                {showHint ? "Hide hint" : "Show hint"}
              </span>
            </div>
            {curIndex + 1 === mockQuestionData.length &&
              showNextButton === true && (
                <>
                  <div className="flex gap-2 items-center justify-center">
                    <Image
                      src="/images/done.png"
                      alt="done"
                      height={30}
                      width={50}
                      className="object-contain"
                    />
                    <span className="text-sm">
                      You have completed the quiz !
                    </span>
                  </div>
                  <Button
                    className="!mt-0"
                    onClick={() => setResultModal(true)}
                  >
                    See all answer
                  </Button>
                </>
              )}
          </form>
        </Form>
      </Container>
      <ThanksModal
        onClose={() => {
          setResultModal(false);
        }}
        open={resultModal}
        modalCls="max-w-[1000px]"
        successText={
          <>
            <h3 className="mb-4 text-center leading-normal text-2xl text-blue-600 font-bold bg-blue-200 px-2 rounded-md">
              Thank you for playing quiz. Lets view correct answers.
            </h3>
            <section className="flex flex-col gap-3">
              {mockQuestionData?.map((item, index) => (
                <div key={item?.id}>
                  <h5 className="font-bold text-gray-700 text-xl">
                    Question {item?.id} : {item?.label}
                  </h5>
                  <div className="flex items-center gap-2">
                    {" "}
                    <CorrectIcon />{" "}
                    <span className="text-green-600 font-semibold">
                      Correct answer(s) :
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {item?.choices
                      ?.filter((c) => item?.answer?.includes(c?.id))
                      ?.map((i) => (
                        <div
                          key={i?.id}
                          className="px-3 py-2 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-fit font-semibold"
                        >
                          {i?.val}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </section>
          </>
        }
      />
    </div>
  );
}

export default memo(Quiz);
