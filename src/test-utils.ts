import { screen } from "@testing-library/react";

export const getTextField = (name: string) => {
  return screen.getByRole("textbox", { name: new RegExp(name, "i") });
};
