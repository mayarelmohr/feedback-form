import { FC, InputHTMLAttributes } from "react";
import classNames from "classnames/bind";
import { ReactComponent as Star } from "./star.svg";
import styles from "./style.module.css";
import { InputWrapper, InputWrapperProps } from "components/InputWrapper";
import { MAX_RATING } from "utils/constants";

const cx = classNames.bind(styles);
type Rate = { rate: number };

type RatingRadioProps = InputWrapperProps &
  InputHTMLAttributes<HTMLInputElement> &
  Rate;

const Rating: FC<RatingRadioProps> = ({ label, rate, error, ...rest }) => {
  return (
    <InputWrapper label={label} error={error}>
      <fieldset className={cx("wrapper")}>
        {[...Array(MAX_RATING)].map((_, index) => {
          const currentRate = index + 1;
          const shouldBeFilled = currentRate <= rate;
          return (
            <label key={currentRate} className={cx("radio")}>
              <input
                type="radio"
                className={cx("input")}
                value={currentRate}
                name={currentRate.toString()}
                checked={rate === currentRate}
                {...rest}
              />
              <span className={cx("sr-only")}>{currentRate} stars</span>
              <span
                aria-hidden="true"
                role="img"
                data-testid={`${currentRate}-stars`}
              >
                <Star
                  className={cx("rating", shouldBeFilled ? "filled" : "")}
                />
              </span>
            </label>
          );
        })}
      </fieldset>
    </InputWrapper>
  );
};

export default Rating;
