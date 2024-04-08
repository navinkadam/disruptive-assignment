import React, { useEffect, useState, useMemo } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Heading from "../../../components/Heading";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { CreateContent } from "../../../constant/FormSchema";
import FileInput from "../../../components/FileInput";

import { getAllTheme } from "../../../redux-store/reducers/Theme";
import { createContent } from "../../../redux-store/reducers/Content";

import "./create.css";

export default function Create({ isEdit }) {
  const dispatch = useDispatch();
  const themes = useSelector((state) => state.theme.themes);

  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState();

  const accessType = useMemo(() => {
    return themes?.find((theme) => theme._id === selectedTheme)?.accessType;
  }, [themes, selectedTheme]);

  useEffect(() => {
    dispatch(getAllTheme());
  }, []);

  const onFileUpload = (fileObj) => {
    setImages([...images, ...fileObj]);
  };

  return (
    <div className="c-product-wrapper">
      <Heading>Upload Content</Heading>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: "",
          videoLinks: "",
          txtDoc: "",
        }}
        validationSchema={CreateContent}
        onSubmit={(data) => {
          dispatch(
            createContent({
              ...data,
              images: images,
              themeId: selectedTheme,
            })
          ).then(() => {
            navigate("/");
          });
        }}
      >
        {({ isValid }) => (
          <Form>
            <Field
              label="Select theme"
              as="select"
              name="color"
              className="w-full px-2 py-4 border mb-4"
              onChange={(e) => setSelectedTheme(e.target.value)}
            >
              <option value={null}>Select theme</option>
              {themes?.length
                ? themes.map((theme) => (
                    <option key={theme._id} value={theme._id}>
                      {theme.themeName}
                    </option>
                  ))
                : null}
            </Field>
            {selectedTheme && (
              <>
                <Field
                  name="title"
                  label="Title"
                  type="text"
                  component={Input}
                />
                {accessType?.includes("video") && (
                  <Field
                    name="videoLinks"
                    label="Video"
                    type="text"
                    component={Input}
                  />
                )}
                {accessType?.includes("text-doc") && (
                  <Field
                    name="txtDoc"
                    label="Text Doc"
                    type="textarea"
                    min={0}
                    component={Input}
                  />
                )}
                {accessType?.includes("img") && (
                  <FileInput onChange={onFileUpload} />
                )}
              </>
            )}
            <Button type="submit" disabled={!isValid || !images.length}>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
