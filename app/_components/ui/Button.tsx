"use client";
import { mergeClsx } from "@/helpers";
import clsx from "clsx";

import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useRef,
  useEffect,
  useMemo,
  useState,
  forwardRef,
} from "react";

const ButtonHTMLTypes = ["submit", "button", "reset"] as const;
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number];

export interface BaseButtonProps {
  icon?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: ReactNode;
  [key: `data-${string}`]: string;
  classNames?: { icon: string };
  styles?: { icon: CSSProperties };
  color?: string;
  noIcon?: boolean;
}

type MergedHTMLAttributes = Omit<
  HTMLAttributes<HTMLElement> &
    ButtonHTMLAttributes<HTMLElement> &
    AnchorHTMLAttributes<HTMLElement>,
  "type"
>;

type LoadingConfigType = {
  loading: boolean;
  delay: number;
};

export interface ButtonProps extends BaseButtonProps, MergedHTMLAttributes {
  href?: string;
  htmlType?: ButtonHTMLType;
  rounded?: boolean;
  bordered?: boolean;
}

function getLoadingConfig(
  loading: BaseButtonProps["loading"]
): LoadingConfigType {
  if (typeof loading === "object" && loading) {
    const delay = loading?.delay;
    const isDelay = !Number.isNaN(delay) && typeof delay === "number";
    return {
      loading: false,
      delay: isDelay ? delay : 0,
    };
  }

  return {
    loading: !!loading,
    delay: 0,
  };
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      loading = false,
      danger,
      styles,
      disabled,
      className,
      rootClassName,
      children,
      icon,
      iconRight: customIconRight = null,
      ghost = false,
      block = false,
      htmlType = "button",
      classNames: customClassNames,
      style = {},
      color,
      rounded = true,
      bordered = false,
      noIcon = true,
      ...rest
    },
    outerRef
  ) => {
    const linkButtonRestProps = rest;

    const internalRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(
      null
    );
    const buttonRef = outerRef ?? internalRef;

    const loadingOrDelay = useMemo<LoadingConfigType>(
      () => getLoadingConfig(loading),
      [loading]
    );

    const [innerLoading, setLoading] = useState<boolean>(
      loadingOrDelay.loading
    );

    const classes = mergeClsx(
      "py-4 px-6 bg-primary text-center align-middle font-sans text-md text-white max-w-[184px] shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none font-medium rounded-full flex items-center gap-3 group relative overflow-hidden justify-center",
      rounded ? "rounded-full" : "rounded-none",
      bordered ? "border border-[#D3D3D3]" : "bordered-none",
      className
    );
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
    ) => {
      const { onClick } = rest;
      if (innerLoading || disabled) {
        e.preventDefault();
        return;
      }
      (
        onClick as React.MouseEventHandler<
          HTMLButtonElement | HTMLAnchorElement
        >
      )?.(e);
    };

    const iconNode = icon && !innerLoading && <span>{icon}</span>;

    const iconRight = <span className="inline-flex">{/* icon svg  */}</span>;

    useEffect(() => {
      let delayTimer: ReturnType<typeof setTimeout> | null = null;
      if (loadingOrDelay.delay > 0) {
        delayTimer = setTimeout(() => {
          delayTimer = null;
          setLoading(true);
        }, loadingOrDelay.delay);
      } else {
        setLoading(loadingOrDelay.loading);
      }

      function cleanupTimer() {
        if (delayTimer) {
          clearTimeout(delayTimer);
          delayTimer = null;
        }
      }

      return cleanupTimer;
    }, [loadingOrDelay]);

    if (linkButtonRestProps.href !== undefined) {
      return (
        <a
          {...linkButtonRestProps}
          className={classes}
          style={{ ...style, color }}
          onClick={handleClick}
          ref={buttonRef as React.Ref<HTMLAnchorElement>}
        >
          <div className="absolute inset-0 w-0 bg-primary transition-all duration-[300ms] ease-out group-hover:w-full"></div>
          <div className="relative group-hover:text-white flex items-center gap-2">
            {iconNode}
            {children}
            {!noIcon && iconRight}
          </div>
        </a>
      );
    }

    return (
      <button
        {...rest}
        type={htmlType}
        className={classes}
        style={style}
        onClick={handleClick}
        disabled={disabled}
        ref={buttonRef as React.Ref<HTMLButtonElement>}
      >
        <div className="absolute inset-0 w-0 bg-gray transition-all duration-[300ms] ease-out group-hover:w-full"></div>
        <div className="relative group-hover:text-white flex items-center gap-2">
          {iconNode}
          {children}
          {!noIcon && iconRight && iconRight}
        </div>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
