import { FC } from "react";
import classNames from "classnames/bind";
import { MAX_RATING } from "utils/constants";
import { ReactComponent as Star } from "./star.svg";
import styles from "./style.module.css";

const cx = classNames.bind(styles);
type RateProps = { rate: number };

const Rating: FC<RateProps> = ({ rate }) => {
  return (
    <div
      aria-label={`Rating: ${rate} out of 5 stars`}
      role="img"
      data-testid={`rating-${rate}-stars`}
    >
      {[...Array(MAX_RATING)].map((item, index) => {
        const currentRate = index + 1;
        const shouldBeFilled = currentRate <= rate;
        return (
          <span key={currentRate} aria-hidden="true">
            <Star
              className={cx(
                "rating",
                "rating-wrapper",
                shouldBeFilled ? "filled" : ""
              )}
            />
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
