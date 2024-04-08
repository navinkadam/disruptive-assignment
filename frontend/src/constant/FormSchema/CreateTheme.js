import * as Yup from "yup";

export default Yup.object().shape({
  themeName: Yup.string()
    .min(5, "Too short.")
    .max(50, "Too Long.")
    .required("Theme name required."),
  accessType: Yup.array().min(1, "The error message if length === 0 | 1"),
});
