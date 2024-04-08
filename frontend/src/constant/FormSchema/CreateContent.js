import * as Yup from "yup";

export default Yup.object().shape({
  videoLinks: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Enter valid URL"
  ),

  txtDoc: Yup.string(),
  title: Yup.string(),
});
