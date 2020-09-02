import React from "react";

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      {props.options.map((opt) => (
        <>
          <input
            name={name}
            id={opt}
            type="radio"
            value={opt} // could be something else for output?
            checked={opt === value}
            onChange={onChange}
            onBlur={onBlur}
            {...props}
          />
          <label htmlFor={id}>{opt}</label>
        </>
      ))}
    </div>
  );
};

export default RadioButton;
