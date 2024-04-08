import React from "react";
import "./input.css";

export default function Input({
  field,
  label,
  form: { touched, errors },
  ...props
}) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        {...field}
        {...props}
        className={`form-input ${field.className}`}
      />
      <div className="form-error">
        {touched[field.name] && errors[field.name]}
      </div>
    </div>
  );
}
