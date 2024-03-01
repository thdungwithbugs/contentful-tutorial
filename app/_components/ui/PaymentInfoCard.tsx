import { IMonthlyPaymentSchedule } from "@/app/_block/CalcTool";
import { formatMoneyNum } from "@/helpers";
import React from "react";

const MonthlyPaymentCard = ({ item }: { item: IMonthlyPaymentSchedule }) => {
  return (
    <div
      key={item.month}
      className="result-item gap-8 p-4 bg-gray-300 rounded-md grid grid-cols-5 grid-rows-2"
    >
      <div className="col-start-1 col-end-2 row-start-1 row-end-3">
        <div className="text-primary font-semibold pr-2 text-sm md:text-md">
          Month index {item.month}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-1 col-start-2 col-end-4">
        <div className="text-xs">The remaining loan</div>
        <div className="val">
          <span className="number text-primary">
            {formatMoneyNum(item.balance)}
          </span>{" "}
          USD
        </div>
      </div>
      <div className="flex flex-col gap-1 col-start-4 col-end-6 justify-between">
        <div className="text-xs">Monthly principal amount</div>
        <div className="val">
          <span className="number text-primary">
            {formatMoneyNum(item.payment)}
          </span>{" "}
          USD
        </div>
      </div>
      <div className="flex flex-col gap-1 col-start-2 col-end-4 justify-between">
        <div className="text-xs">Monthly interest payment amount</div>
        <div className="val">
          <span className="number text-primary">
            {formatMoneyNum(item.interestPayment)}
          </span>{" "}
          USD
        </div>
      </div>
      <div className="flex flex-col gap-1 col-start-4 col-end-6 justify-between">
        <div className="text-xs">Total payment</div>
        <div className="val">
          <span className="number text-primary">
            {formatMoneyNum(item.totalPaymentCurrentMonth)}
          </span>{" "}
          USD
        </div>
      </div>
    </div>
  );
};

export default MonthlyPaymentCard;
