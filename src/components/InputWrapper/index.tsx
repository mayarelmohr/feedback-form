import { ReactNode, FC } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.css";

const cx = classNames.bind(styles);

export interface InputWrapperProps {
  label: string;
  error?: string;
}

export const InputWrapper: FC<InputWrapperProps & { children: ReactNode }> = ({
  label,
  error,
  children,
}) => {
  return (
    <div className={cx("wrapper")}>
      <label>
        <span className={cx("label")}>
          {label} {error ? <span className={cx("required")}>*</span> : ""}
        </span>
        {children}
      </label>
      {error ? <p className={cx("error-message")}>{error}</p> : null}
    </div>
  );
};
