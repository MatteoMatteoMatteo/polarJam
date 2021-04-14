import React, { useState } from "react";
import "./InputForm.css";

const InputForm = ({ genre, addSongs, auth: { user }, inputArray }) => {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
  });

  const { field1, field2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const inputs = inputArray.map((input) =>
    input.type == "text" ? (
      <input
        key={input.id}
        name={input.name}
        type="text"
        value={field1}
        onChange={(e) => onChange(e)}
        placeholder={input.placeholder}
        required
      ></input>
    ) : (
      <textarea
        onChange={(e) => onChange(e)}
        value={field2}
        key={input.id}
        name={input.name}
        className={"feedback-input"}
        placeholder={input.placeholder}
      ></textarea>
    )
  );

  return (
    <form className={"formHolder"} onSubmit={(e) => onSubmit(e)}>
      {inputs}
      <input type="submit" value="Save" />
    </form>
  );
};

export default InputForm;
