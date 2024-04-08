import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Heading from "../../../components/Heading";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { CreateTheme } from "../../../constant/FormSchema";
import FileInput from "../../../components/FileInput";

import { createTheme, updateTheme } from "../../../redux-store/reducers/Theme";

import { THEME_ACCESS_TYPE } from "../../../constant";

import "./createTheme.css";

const initialsState = {
  themeName: "",
  description: "",
  accessType: [],
};

export default function ThemeCreate({ data }) {
  const dispatch = useDispatch();

  const [themeData, setThemeData] = useState({ ...initialsState });

  useEffect(() => {
    if (data?._id) {
      const { themeName, description, accessType } = data;
      setThemeData({
        themeName,
        description,
        accessType,
      });
    }
  }, [data]);

  return (
    <div className="shadow-md p-5 bg-white rounded-lg">
      <Formik
        enableReinitialize={true}
        initialValues={themeData}
        validationSchema={CreateTheme}
        onSubmit={(formData, { resetForm }) => {
          if (data?._id) dispatch(updateTheme({ ...formData, _id: data?._id }));
          else dispatch(createTheme({ ...formData }));
          resetForm();
        }}
      >
        {({ isValid }) => (
          <Form>
            <Field
              name="themeName"
              label="Theme Name"
              type="text"
              component={Input}
              disabled={data?._id}
            />
            <Field
              name="description"
              label="Description"
              type="text"
              component={Input}
            />
            <div role="group" aria-labelledby="checkbox-group">
              {THEME_ACCESS_TYPE.map((access) => (
                <label className="flex items-center my-2">
                  <Field
                    type="checkbox"
                    name="accessType"
                    className="mr-2"
                    value={access}
                  />
                  {access}
                </label>
              ))}
            </div>

            <Button type="submit" disabled={!isValid}>
              {data?._id ? "Update" : "Create"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
