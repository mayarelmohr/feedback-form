import { ChangeEvent, FormEvent, useState, FocusEvent } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { useFeedbackListContext } from "store/context/feedbackProvider";
import { addFeedback } from "store/reducer/feedbackReducer";
import { FeedbackItem } from "store/types";
import Input from "components/Input";
import TextArea from "components/TextArea";
import Rating from "components/Rating/input";
import { validationSchema, ValidationSchemaType } from "./validationSchema";
import styles from "./style.module.css";

const cx = classNames.bind(styles);

type FeedbackItemKeys = keyof FeedbackItem;

type FormErrors = {
  name: string;
  email: string;
  comment: string;
  rating: string;
};

const initialErrors: FormErrors = {
  name: "",
  email: "",
  comment: "",
  rating: "",
};

const initialFormData: FeedbackItem = {
  name: "",
  email: "",
  comment: "",
  rating: 0,
};

const Form = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const navigate = useNavigate();
  const { dispatch } = useFeedbackListContext();

  const validateAllFields = (
    formData: FeedbackItem,
    validationSchema: ValidationSchemaType
  ) => {
    let newErrors: FormErrors = initialErrors;
    (Object.keys(formData) as Array<FeedbackItemKeys>).forEach((fieldName) => {
      newErrors[fieldName] = validateField(
        fieldName,
        formData,
        validationSchema
      );
    });
    return newErrors;
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const newErrors = validateAllFields(formData, validationSchema);
    setErrors({ ...newErrors });
    const hasFormErrors = Object.values(newErrors).some(
      (value) => value !== ""
    );
    if (hasFormErrors) {
      return;
    }
    dispatch(addFeedback(formData));
    navigate("/results");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateField = (
    fieldName: FeedbackItemKeys,
    formData: FeedbackItem,
    validationSchema: ValidationSchemaType
  ) => {
    const validationRule = validationSchema[fieldName];
    const fieldValue = formData[fieldName];
    if (validationRule.required && !fieldValue) {
      return `Please add your ${fieldName}.`;
    }
    if (
      validationRule.validator &&
      !new RegExp(validationRule.validator.regex).test(fieldValue as string)
    ) {
      return validationRule.validator.error;
    }
    return "";
  };

  const validateOnBlur = (
    ev: FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = ev.target.name as FeedbackItemKeys;
    const error = validateField(fieldName, formData, validationSchema);
    setErrors({ ...errors, ...{ [fieldName]: error } });
  };

  return (
    <form className={cx("layout")} onSubmit={handleSubmit}>
      <h2 className={cx("title")}>Add your feedback here</h2>
      <div className={cx("wrapper")}>
        <div className={cx("flex")}>
          <Input
            label="Name"
            placeholder="Add your name here"
            value={formData.name}
            name="name"
            onChange={handleChange}
            error={errors?.name}
            onBlur={validateOnBlur}
          />
          <Input
            label="Email"
            placeholder="Add your email here"
            type="email"
            name="email"
            value={formData.email}
            error={errors?.email}
            onChange={handleChange}
            onBlur={validateOnBlur}
          />
          <Rating
            label="Rating"
            rate={formData.rating}
            name="rating"
            onChange={handleChange}
            error={errors?.rating}
          />
        </div>
        <TextArea
          label="Comment"
          placeholder="Add your comment here"
          name="comment"
          value={formData.comment}
          error={errors?.comment}
          onChange={handleChange}
          onBlur={validateOnBlur}
        />
      </div>
      <button type="submit" className={cx("button")}>
        Submit Feedback
      </button>
    </form>
  );
};

export default Form;
