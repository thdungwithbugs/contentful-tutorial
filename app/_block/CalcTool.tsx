"use client";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import RangeInput from "../_components/common/RangeInput";
import { useForm } from "react-hook-form";
import Container from "../_components/ui/Container";
import { formatMoneyNum } from "@/helpers";
import Image from "next/image";
import ExportToExcel from "../_components/common/ExportToExcel";
import Button from "../_components/ui/Button";
import PaymentSchedule from "../_components/common/PaymentSchedule";

export interface IMonthlyPaymentSchedule {
  month: number;
  balance: number;
  payment: number;
  principalPayment: number;
  interestPayment: number;
  totalInterestPayment: number;
  totalPaymentCurrentMonth: number;
}

function roundToNearestInt(value: number) {
  return Math.round(value * 100) / 100;
}

export interface IMortgageCalcFieldsValue {
  ___purchasePrice: number;
  ___downPayment: number;
  ___repaymentTime: number;
  ___interestRate: number;
}

const calcToolInputList = [
  {
    max: 1000000,
    min: 0,
    unit: "USD",
    step: 1,
    label: "Purchase Price",
    keyName: "___purchasePrice",
  },
  {
    max: 1000000,
    min: 0,
    unit: "USD",
    step: 1,
    label: "Down Payment",
    keyName: "___downPayment",
  },
  {
    max: 30,
    min: 1,
    unit: "years",
    step: 1,
    label: "Repayment Time",
    keyName: "___repaymentTime",
  },
  {
    max: 100,
    min: 0,
    unit: "%",
    step: 0.1,
    label: "Interest Rate",
    keyName: "___interestRate",
  },
];

const CalcTool = () => {
  const { control, setValue, watch } = useForm({
    defaultValues: {
      ___purchasePrice: 450000,
      ___downPayment: 135000,
      ___repaymentTime: 25,
      ___interestRate: 3,
    },
    reValidateMode: "onBlur",
    mode: "onChange",
  });

  const [monthlyPaymentSchedule, setMonthlyPaymentSchedule] = useState<
    IMonthlyPaymentSchedule[]
  >([]);

  const watchedPurchasePrice = +watch("___purchasePrice");
  const watchedDownPayment = +watch("___downPayment");
  const watchedRepaymentTime = +watch("___repaymentTime");
  const watchedInterestRate = +watch("___interestRate");

  const loanAmountVal = useMemo(() => {
    return watchedPurchasePrice - watchedDownPayment;
  }, [watchedDownPayment, watchedPurchasePrice]);

  const monthlyMortgagePayment = useMemo(() => {
    const monthlyRealInterestRate = watchedInterestRate / 100 / 12;
    const combinedInterestRate =
      (1 + monthlyRealInterestRate) ** (watchedRepaymentTime * 12);
    const result =
      (loanAmountVal * (monthlyRealInterestRate * combinedInterestRate)) /
      (combinedInterestRate - 1);
    if (isNaN(result)) {
      return "Chưa có công thức";
    }

    return result;
  }, [loanAmountVal, watchedInterestRate, watchedRepaymentTime]);

  const createPaymentMonths = useCallback(
    (
      totalLoanAmount: number,
      loanTermInMonths: number,
      annualInterestRate: number
    ) => {
      const monthlyInterestRate = +annualInterestRate / 100 / 12;
      const monthlyPayment = +totalLoanAmount / +loanTermInMonths;

      const payments = Array.from({ length: +loanTermInMonths + 1 }).reduce<
        IMonthlyPaymentSchedule[]
      >((acc, _, i) => {
        const previousPayment = acc[i - 1]?.balance
          ? acc[i - 1]
          : { balance: totalLoanAmount };
        const interestPayment =
          i > 0 ? previousPayment.balance * monthlyInterestRate : 0;
        const principalPayment = monthlyPayment - interestPayment;
        const totalPaymentCurrentMonth =
          i > 0 ? monthlyPayment + interestPayment : 0;
        const balance =
          i > 0 ? previousPayment.balance - monthlyPayment : totalLoanAmount;

        return [
          ...acc,
          {
            month: i,
            balance: roundToNearestInt(balance),
            payment: roundToNearestInt(i > 0 ? monthlyPayment : 0),
            principalPayment: roundToNearestInt(principalPayment),
            interestPayment: roundToNearestInt(interestPayment),
            totalInterestPayment: roundToNearestInt(
              (acc[i - 1]?.totalInterestPayment || 0) + interestPayment
            ),
            totalPaymentCurrentMonth: roundToNearestInt(
              totalPaymentCurrentMonth
            ),
          },
        ];
      }, []);

      return payments;
    },
    []
  );

  const handleShowDetail = () => {
    setMonthlyPaymentSchedule(
      createPaymentMonths(
        watchedPurchasePrice - watchedDownPayment,
        watchedRepaymentTime * 12,
        watchedInterestRate
      )
    );
  };

  useEffect(() => {
    if (monthlyPaymentSchedule?.length > 0) {
      const tableElement = document.querySelector(".list-result");
      tableElement?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [monthlyPaymentSchedule]);

  useEffect(() => {
    setMonthlyPaymentSchedule([]);
  }, [
    watchedDownPayment,
    watchedInterestRate,
    watchedPurchasePrice,
    watchedRepaymentTime,
  ]);

  return (
    <>
      <Container className="flex flex-col md:flex-row gap-5 mb-10">
        <div className="flex-1 flex flex-col gap-4 max-w-[455px] mt-0 md:mt-10">
          <span className="text-3xl md:text-40 font-semibold inline-block">
            Try our awesome Calculator
          </span>
          <span className="!text-gray">
            Adjust the purchase price, down payment, and interest rate to fit
            your budget.
          </span>
          <Button data-ripple-light="true">Register</Button>
        </div>
        <div className="flex-1 bg-primary p-3 md:p-10 flex flex-col relative rounded-lg">
          <span className="text-2xl md:text-40 font-semibold inline-block mb-2 text-white">
            Mortgage Calculator
          </span>
          <span className="inline-block mb-10 md:mb-16 text-white">
            Take control with a plan set in stone.
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calcToolInputList.map(
              ({ keyName, label, max, min, step, unit }, index) => (
                <RangeInput
                  key={keyName}
                  control={control}
                  fieldData={{
                    max,
                    min,
                    unit,
                    step,
                  }}
                  label={label}
                  name={keyName as keyof IMortgageCalcFieldsValue}
                  setValue={setValue}
                />
              )
            )}
          </div>
          <div className="mt-10 md:mt-16">
            <div className="mb-4 flex flex-col md:flex-row gap-1">
              <span className="text-white">Loan amount: </span>
              <span className="text-xl">${formatMoneyNum(loanAmountVal)}</span>
            </div>
            <div className="flex flex-col md:flex-row gap-1">
              <span className="text-white">
                Estimated repayment per month:{" "}
              </span>
              <span className="text-xl">
                {typeof monthlyMortgagePayment === "string"
                  ? monthlyMortgagePayment
                  : `$${formatMoneyNum(
                      monthlyMortgagePayment.toFixed(2)
                    )}`}{" "}
              </span>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            {typeof monthlyMortgagePayment === "number" && (
              <Button onClick={handleShowDetail} className="bg-white text-dark">
                Xem lịch trình
              </Button>
            )}
          </div>
          <Image
            height={40}
            width={40}
            alt="logo"
            src="/images/mney.webp"
            className="object-contain h-[30px] w-[30px] absolute bottom-4 right-4"
          />
        </div>
      </Container>
      {monthlyPaymentSchedule?.length > 0 && (
        <PaymentSchedule
          monthlyPaymentSchedule={monthlyPaymentSchedule}
          watchedHeaderVals={{
            watchedPurchasePrice,
            watchedDownPayment,
            watchedRepaymentTime,
            watchedInterestRate,
            loanAmountVal,
            monthlyMortgagePayment,
          }}
        />
      )}
    </>
  );
};

export default memo(CalcTool);
