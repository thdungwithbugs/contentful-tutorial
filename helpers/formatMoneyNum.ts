const formatMoneyNum = (value: any) => {
  if (!value) return value;
  // const number = parseFloat(value);
  // return number.toLocaleString('en-US', { minimumFractionDigits: 0 });

  const val = value?.toString()?.split(".");
  if (val?.length > 1) {
    let val2: number | string = "0." + val[1];
    val2 = +val2;

    return (
      val[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      (val2 ? "." + val2.toString().substring(2) : val2 === 0 ? "" : val2)
    );
  }

  return value
    ?.toString()
    ?.replace(/[,|\.]/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default formatMoneyNum;
