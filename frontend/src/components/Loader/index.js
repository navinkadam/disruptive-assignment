import React from "react";
import { useSelector } from "react-redux";
import "./loader.css";

export default function Loader() {
  const isLoading = useSelector(
    ({ user, content, theme }) =>
      user.loading || content?.loading || theme.loading
  );
  return isLoading ? (
    <div className="overlay">
      <div className="lds-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
}
