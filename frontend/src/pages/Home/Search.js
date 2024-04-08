import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Heading from "../../components/Heading";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { CreateTheme } from "../../constant/FormSchema";
import FileInput from "../../components/FileInput";

import { getAllContent } from "../../redux-store/reducers/Content";

import { THEME_ACCESS_TYPE } from "../../constant";

export default function Search() {
  const dispatch = useDispatch();

  return (
    <div className="shadow-md p-5 bg-white rounded-lg">
      <Formik
        enableReinitialize={true}
        initialValues={{ name: "" }}
        onSubmit={(formData, { resetForm }) => {
          dispatch(getAllContent({ ...formData }));
          //   resetForm();
        }}
      >
        {({ isValid }) => (
          <Form>
            <div className="flex justify-between">
              <Field
                name="name"
                placeholder="Search"
                type="text"
                component={Input}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
