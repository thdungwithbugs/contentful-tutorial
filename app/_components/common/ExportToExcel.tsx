import React from "react";
import FileSaver from "file-saver";
import { formatMoneyNum } from "@/helpers";
import Button from "../ui/Button";
const fileExtension = ".xlsx";

interface IExportToExcelProps {
  fileName: string;
  headExcelInfo: Record<string, number | string>;
  children: React.ReactNode;
  sheetName?: string;
  title?: string;
  rawCsvData?: { [key: string]: any }[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const ExportToExcel = ({
  fileName,
  headExcelInfo,
  children,
  sheetName = "Mortgage calculator",
  title = "Mortgage Calculator Result",
  rawCsvData,
  setLoading,
  isLoading,
}: IExportToExcelProps) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const exportToCSV = async () => {
    try {
      setLoading(true);
      const { utils, write } = await import("xlsx");
      const ws = utils.json_to_sheet([]);

      utils.sheet_add_aoa(ws, [[title]], {
        origin: "B1",
      });

      utils.sheet_add_aoa(
        ws,
        [
          [
            "Purchase Price",
            formatMoneyNum(headExcelInfo.watchedPurchasePrice),
          ],
        ],
        {
          origin: "A2",
        }
      );
      utils.sheet_add_aoa(ws, [["Unit", "USD"]], {
        origin: "D2",
      });
      utils.sheet_add_aoa(
        ws,
        [["Down Payment", formatMoneyNum(headExcelInfo.watchedDownPayment)]],
        {
          origin: "A3",
        }
      );
      utils.sheet_add_aoa(
        ws,
        [["Repayment Time", `${headExcelInfo.watchedRepaymentTime} years`]],
        { origin: "A4" }
      );
      utils.sheet_add_aoa(
        ws,
        [["Interest Rate", `${headExcelInfo.watchedInterestRate} % per year`]],
        { origin: "A5" }
      );
      utils.sheet_add_aoa(ws, [["CALCULATOR RESULT"]], { origin: "A7" });
      utils.sheet_add_aoa(
        ws,
        [["Loan Amount", `${formatMoneyNum(headExcelInfo.loanAmountVal)}`]],
        { origin: "A8" }
      );
      utils.sheet_add_aoa(
        ws,
        [
          [
            "Monthly Mortgage Payment",
            `${
              typeof headExcelInfo.monthlyMortgagePayment === "string"
                ? headExcelInfo.monthlyMortgagePayment
                : formatMoneyNum(
                    headExcelInfo.monthlyMortgagePayment.toFixed(2)
                  )
            }`,
          ],
        ],
        { origin: "A9" }
      );

      if (rawCsvData && rawCsvData?.length > 0) {
        const convertData = rawCsvData.map((item) => ({
          ["Tháng"]: `Thứ ${item.month}`,
          ["Tiền vay còn lại"]: formatMoneyNum(item.balance),
          ["Số tiền gốc phải trả hàng tháng"]: formatMoneyNum(item.payment),
          ["Số tiền lãi trả hàng tháng"]: formatMoneyNum(item.interestPayment),
          ["Tổng tiền trả hàng tháng"]: formatMoneyNum(
            item.totalPaymentCurrentMonth
          ),
        }));
        utils.sheet_add_aoa(ws, [["Lịch trình thanh toán tham khảo"]], {
          origin: "B12",
        });
        utils.sheet_add_json(ws, convertData!, { origin: "A14" });
        const style = {
          font: { name: "Times New Roman", sz: 14 },
          fill: { fgColor: { rgb: "D3D3D3" } },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
          },
          alignment: { horizontal: "center" },
        };

        // for (let row = 6; row <= convertData!.length; row++) {
        //   for (let col = 1; col <= convertData!.length; col++) {
        //     const cell = utils.encode_cell({ r: row, c: col });
        //     ws[cell].s = style;
        //   }
        // }
      }

      const wb = utils.book_new();

      utils.book_append_sheet(wb, ws, sheetName);
      const excelBuffer = write(wb, {
        bookType: "xlsx",
        type: "buffer",
        cellStyles: true,
      });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    } catch (error) {
      console.log("🚀 ~ exportToCSV ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={() => exportToCSV()} disabled={isLoading}>
      {children}
    </Button>
  );
};

export default ExportToExcel;
