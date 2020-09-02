import React, { useRef, useEffect } from "react";

import { NextSeo } from "next-seo";
import Select from "~/src/components/Select";
import { Field, FormikValues } from "formik";
import { FormikStepper, FormikStep } from "~/src/components/FormikStepper";
import MyInput from "~/src/components/Input";
import Textarea from "~/src/components/Textarea";
import RadioInput from "~/src/components/RadioInput";

interface ComponentProps {
  onSubmit: (values) => void;
  tasks: any;
  initialValues: any;
}

const Form = ({ onSubmit, tasks, initialValues }: ComponentProps) => {
  const mapTaskFields = (field: any) => {
    const { name, type, options, optional, validation, fields } = field;
    const fieldTypes = {
      select: Select,
      text: MyInput,
      textarea: Textarea,
      conditional: RadioInput,
    };

    if (type !== "conditional")
      return (
        <FormikStep validationSchema={validation} key={name}>
          <Field
            name={name}
            component={fieldTypes[type]}
            options={type === "select" ? options : null}
            optional={optional}
          />
        </FormikStep>
      );
    return (
      <FormikStep key={name}>
        <Field
          name={name}
          component={RadioInput}
          conditional={type === "conditional"}
          options={options}
        />
        {fields.map((childField) => (
          <Field
            name={childField.name}
            dependencyParent={childField.dependencyParent}
            dependencyCondition={childField.dependencyCondition}
            dependencyValue={childField.dependencyValue}
            component={Textarea}
            key={childField.name}
          />
        ))}
      </FormikStep>
    );
  };
  const mapTaskInfo = ({ title, description }: any) => {
    return {
      title,
      description,
    };
  };
  return (
    <div>
      <NextSeo title="Collector | ACF" />
      <main>
        <FormikStepper
          formConfig={{
            initialValues,

            onSubmit: (values, helpers) => {
              onSubmit(values);
            },
          }}
          taskInfo={tasks.map(mapTaskInfo)}
        >
          {tasks.map(mapTaskFields)}
        </FormikStepper>
      </main>
    </div>
  );
};
export default Form;
