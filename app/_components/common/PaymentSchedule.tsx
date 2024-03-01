import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { formatMoneyNum } from "@/helpers";
import { IMonthlyPaymentSchedule } from "@/app/_block/CalcTool";
import MonthlyPaymentCard from "../ui/PaymentInfoCard";
import Container from "../ui/Container";
import ExportToExcel from "./ExportToExcel";

interface IPaymentScheduleProps {
  monthlyPaymentSchedule: IMonthlyPaymentSchedule[];
  watchedHeaderVals: {
    watchedPurchasePrice: number;
    watchedDownPayment: number;
    watchedRepaymentTime: number;
    watchedInterestRate: number;
    loanAmountVal: number;
    monthlyMortgagePayment: number | string;
  };
}

const defaultMaxAmountEleToShowMore = 13;

const PaymentSchedule = ({
  monthlyPaymentSchedule,
  watchedHeaderVals,
}: IPaymentScheduleProps) => {
  const [numMonthsToShow, setNumMonthsToShow] = useState(
    defaultMaxAmountEleToShowMore
  );
  const [loadingDownExcel, setLoadingDownExcel] = useState(false);

  const mount = useRef(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const initFunction = useCallback(async () => {
    if (!mount.current) {
      mount.current = true;
    }
  }, [mount]);

  useEffect(() => {
    initFunction();
  }, [initFunction]);

  useEffect(() => {
    setNumMonthsToShow(defaultMaxAmountEleToShowMore);
  }, [monthlyPaymentSchedule]);

  const handleScrollIntoView = () => {
    const tableElement = document.querySelector(".list-result");
    const elementToScrollTo =
      tableElement?.children[+defaultMaxAmountEleToShowMore - 2];
    if (tableElement && elementToScrollTo) {
      elementToScrollTo.scrollIntoView();
    }
  };

  const handleShowMore = useCallback(() => {
    if (numMonthsToShow < monthlyPaymentSchedule?.length) {
      setNumMonthsToShow((prev) => prev + defaultMaxAmountEleToShowMore);
      handleScrollIntoView();
    }
  }, [monthlyPaymentSchedule?.length, numMonthsToShow]);

  const handleShowLess = useCallback(() => {
    if (numMonthsToShow > defaultMaxAmountEleToShowMore) {
      setNumMonthsToShow((prev) => prev - defaultMaxAmountEleToShowMore);
      handleScrollIntoView();
    }
  }, [numMonthsToShow]);

  return (
    <Container className="list-result my-10">
      <div className="table-heading mb-4">
        <div className="divtext">
          <h5>Payment schedule detail</h5>
          <span className="desc text-sm text-primary italic">
            The list is for reference calculation
          </span>
        </div>
        <ExportToExcel
          fileName={"Mortgage_Calculator"}
          headExcelInfo={watchedHeaderVals}
          rawCsvData={monthlyPaymentSchedule}
          setLoading={setLoadingDownExcel}
          isLoading={loadingDownExcel}
        >
          {loadingDownExcel ? "Downloading..." : "Download excel record"}
        </ExportToExcel>
        <span className="text-red-600 text-xs">
          *Requires Excel file reader
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {monthlyPaymentSchedule.slice(0, numMonthsToShow).map((item, index) => (
          <MonthlyPaymentCard key={index} item={item} />
        ))}
      </div>
      {monthlyPaymentSchedule.length > defaultMaxAmountEleToShowMore && (
        <div className="flex flex-wrap justify-between">
          {numMonthsToShow < monthlyPaymentSchedule.length ? (
            <span
              className="text-md text-primary underline inline-block mt-3 cursor-pointer hover:italic"
              onClick={handleShowMore}
            >
              Show more
            </span>
          ) : null}
          {defaultMaxAmountEleToShowMore < numMonthsToShow ? (
            <span
              className="text-md text-primary underline inline-block mt-3 cursor-pointer hover:italic"
              onClick={handleShowLess}
            >
              Show less
            </span>
          ) : null}
        </div>
      )}
    </Container>
  );
};

export default memo(PaymentSchedule);
