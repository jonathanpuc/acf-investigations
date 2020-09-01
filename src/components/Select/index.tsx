import { FieldProps } from "formik";
import React, { useEffect, useState } from "react";
import Select, { ReactSelectProps } from "react-select";

export const SelectField: React.SFC<ReactSelectProps & FieldProps> = ({
  options,
  field,
  form,
}) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (field.value && field.value.length) {
      setValue(field.value);
    }
  }, []);

  return (
    <div>
      <Select
        options={options}
        name={field.name}
        value={value}
        onChange={(value) => {
          form.setFieldValue(field.name, value);
          setValue(value);
        }}
        onBlur={field.onBlur}
        isMulti
      />
    </div>
  );
};

export default SelectField;
