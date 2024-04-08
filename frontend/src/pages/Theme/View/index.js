import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ThemeCreate from "../Create";

import { getAllTheme } from "../../../redux-store/reducers/Theme";
import "./view.css";

export default function ViewTheme() {
  const dispatch = useDispatch();

  const themes = useSelector((state) => state.theme.themes);

  useEffect(() => {
    dispatch(getAllTheme());
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5  gap-8">
      <ThemeCreate />
      {themes?.length
        ? themes.map((theme) => <ThemeCreate data={theme} />)
        : null}
    </div>
  );
}
