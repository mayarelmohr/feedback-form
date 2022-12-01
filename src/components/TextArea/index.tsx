import { TextareaHTMLAttributes, FC } from "react";
import { InputWrapper, InputWrapperProps } from "components/InputWrapper";
import classNames from "classnames/bind";
import styles from "./style.module.css";

const cx = classNames.bind(styles);

type TextAreaProps = InputWrapperProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: FC<TextAreaProps> = ({ label, error, ...rest }) => {
  return (
    <InputWrapper label={label} error={error}>
      <textarea
        className={cx("textarea", error ? "error-input" : "")}
        {...rest}
      />
    </InputWrapper>
  );
};

export default TextArea;
