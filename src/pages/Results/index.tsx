import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./style.module.css";
import { useFeedbackListContext } from "store/context/feedbackProvider";
import Chart from "components/Chart";
import Rating from "components/Rating";

const cx = classNames.bind(styles);

const Results = () => {
  const navigate = useNavigate();
  const {
    state: { feedbackList },
  } = useFeedbackListContext();

  return (
    <div className={cx("layout")}>
      <div className={cx("header")}>
        <h2 className={cx("title")}>Feedback results</h2>
        <button onClick={() => navigate(-1)} className={cx("button")}>
          Go back
        </button>
      </div>
      <div className={cx("chart")}>
        <Chart />
      </div>
      <h3>User Reviews</h3>
      {feedbackList.length < 1 ? (
        <p>There are no results</p>
      ) : (
        <ul className={cx("list")}>
          {feedbackList.map((item) => (
            <li className={cx("list-item")} key={item.email}>
              <div className={cx("review")}>
                <div>
                  <p className={cx("review-heading")}>{item.name}</p>
                  <p className={cx("review-subheading")}>{item.email}</p>
                </div>
                <Rating rate={item.rating} />
              </div>
              <p>{item.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;
