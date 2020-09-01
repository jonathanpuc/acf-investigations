import React from "react";

import { NextSeo } from "next-seo";
import Select from "~/src/components/Select";
import { Field } from "formik";
import { FormikStepper, FormikStep } from "~/src/components/FormikStepper";
import MyInput from "~/src/components/Input";
import Textarea from "~/src/components/Textarea";

interface ComponentProps {
  onSubmit: (values) => void;
  tasks: any;
  initialValues: any;
}

const Form = ({ onSubmit, tasks, initialValues }: ComponentProps) => {
  const mapTaskFields = (field: any) => {
    const { name, type, options, optional, validation } = field;
    const fieldTypes = {
      select: Select,
      text: MyInput,
      textarea: Textarea,
    };
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

// validationSchema={object({
//   impacted_flora: array().of(
//     object()
//       .shape({
//         label: string(),
//         value: string(),
//       })
//       .required()
//   ),
// })}
