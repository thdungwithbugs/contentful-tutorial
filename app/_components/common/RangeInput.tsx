"use client";

import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { Control, UseFormSetValue, useController } from "react-hook-form";
import { formatMoneyNum, mergeClsx } from "@/helpers";
import { IMortgageCalcFieldsValue } from "@/app/_block/CalcTool";

interface IRangeInputProps {
  control: Control<IMortgageCalcFieldsValue, any, IMortgageCalcFieldsValue>;
  name: keyof IMortgageCalcFieldsValue;
  fieldData: {
    max: string | number;
    min: string | number;
    step: string | number;
    labelStart?: string;
    labelEnd?: string;
    unit: string;
    "format-data"?: string;
  };
  setValue: UseFormSetValue<IMortgageCalcFieldsValue>;
  required?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
}

function RangeInput({
  control,
  name,
  fieldData,
  setValue,
  required,
  className,
  placeholder,
  label,
}: IRangeInputProps) {
  const refRange = useRef(null);
  const refInput = useRef(null);
  const { max, min, step = 1, labelStart, labelEnd, unit } = fieldData;
  function getBackgroundSize() {
    const value = +field?.value;
    const size = ((value - _min) / (_max - _min)) * 100;
    return size;
  }
  let formattedNumber = labelEnd
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const _min = +min;
  const _max = +max;
  const rules = {
    required: { value: required, message: "Trường bắt buộc" },
    max: { value: _max, message: `Tối đa ${_max}` },
    min: { value: _min, message: `Tối thiểu ${_min}` },
  } as any;

  const { field, fieldState, formState } = useController({
    control,
    name,
    rules,
  });

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const caret = e.target.selectionStart;
      const element = e.target;
      window.requestAnimationFrame(() => {
        element.selectionStart = caret;
        element.selectionEnd = caret;
      });
      const val = e.target.value;
      if (val) {
        const num = +val.replace(/[^0-9]/g, "");
        setValue(name, Math.min(Math.max(num, _min), _max));
      } else {
        setValue(name, _min);
      }
    },
    [_max, _min, name, setValue]
  );

  const handleBlur = useCallback(() => {
    const value = +field?.value;
    if (_min && value < _min) {
      setValue(name, _min);
      return;
    }
    if (_max && value > _max) {
      setValue(name, _max);
      return;
    }
  }, [_max, _min, field?.value, name, setValue]);

  useEffect(() => {
    const input = refRange.current as HTMLElement | null;
    function setBackgroundSize() {
      if (input) {
        input.style.setProperty("--background-size", `${getBackgroundSize()}%`);
      }
    }
    setBackgroundSize();
    input && input.addEventListener("input", () => setBackgroundSize());
    return () => input?.removeEventListener("input", () => setBackgroundSize());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field?.value]);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-white">{label}</span>
      <div className="relative">
        <div className="relative">
          <input
            {...field}
            ref={refInput}
            id={name}
            className={mergeClsx(
              "bg-[#EEF8FFB2] text-[15px] text-black/70 font-semibold rounded-lg border-none ring-0 focus:ring-0 py-3 w-full pl-1",
              className
            )}
            placeholder={placeholder}
            value={formatMoneyNum(field?.value)}
            onBlur={handleBlur}
            onChange={onChange}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 top-0 flex items-center pr-3">
            <span className="text-black/70 text-[15px] font-semibold">
              {unit}
            </span>
          </div>
        </div>
        <input
          {...field}
          type="range"
          min={_min}
          max={_max}
          step={+step}
          className="w-[99%] h-3 rounded-full appearance-none cursor-pointer mx-auto bg-transparent"
          ref={refRange}
        />
        <div className="flex justify-between">
          <span className="text-sm text-white">
            {labelStart || formatMoneyNum(min)}
          </span>
          <span className="text-sm text-white">
            {formattedNumber || formatMoneyNum(max)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RangeInput;
