import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

const mergeClsx = (...classNames: ClassValue[]) => twMerge(clsx(classNames));
export default mergeClsx;
