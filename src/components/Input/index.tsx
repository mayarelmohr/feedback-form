import { InputHTMLAttributes, FC } from "react";
import { InputWrapper, InputWrapperProps } from "components/InputWrapper";
import classNames from "classnames/bind";
import styles from "./style.module.css";

const cx = classNames.bind(styles);

type InputProps = InputWrapperProps & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ label, type = "text", error, ...rest }) => {
  return (
    <InputWrapper label={label} error={error}>
      <input className={cx("input", error ? "error-input" : "")} {...rest} />
    </InputWrapper>
  );
};

export default Input;
