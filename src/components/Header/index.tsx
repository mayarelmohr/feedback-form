import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./logo.svg";
import styles from "./style.module.css";

const cx = classNames.bind(styles);
const Header = () => {
  return (
    <header className={cx("header")}>
      <Link to="/">
        <h1 className={cx("wrapper")}>
          <span className={cx("hidden")}>Checkout</span>
          <Logo className={cx("logo")} />
        </h1>
      </Link>
    </header>
  );
};

export default Header;
