import { isUndefined } from "lodash";
import * as Yup from "yup";

export const handleErrorFromYup = (error: any) => {
  if (error instanceof Yup.ValidationError) {
    const errors = error.inner.map((err) => {
      if (!isUndefined(err.path) && !isUndefined(err.message)) {
        return { [err.path]: err.message };
      }
    });

    return {
      status: "error",
      message: error.message,
      errors,
    };
  } else {
    return {
      status: "error",
      message: error.message,
    };
  }
};
