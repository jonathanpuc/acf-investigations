import React, { useState } from "react";
import { Form, Formik, FormikConfig, FormikValues } from "formik";

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  children;
}
export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  formConfig,
  taskInfo,
  ...props
}: {
  formConfig: FormikConfig<FormikValues>;
  children;
  taskInfo: Array<{ title: string; description: string }>;
}) {
  const childrenArray = React.Children.toArray(children) as React.ElementType<
    FormikStepProps
  >[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step] as React.ElementType<
    FormikStepProps
  >;

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const currentTaskInfo = taskInfo[step];

  // @ts-ignore
  const optional = currentChild.props.children.props.optional;

  const handleSkip = () => {
    if (isLastStep()) {
      // submit and go to mission page
    } else {
      console.log(formConfig);
      setStep((s) => s + 1);
    }
  };
  return (
    <div>
      {step > 0 ? (
        <button onClick={() => setStep((s) => s - 1)}> back</button>
      ) : null}
      <h1>{currentTaskInfo.title}</h1>
      <p>{currentTaskInfo.description}</p>
      <Formik
        {...formConfig}
        // @ts-ignore
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
            await formConfig.onSubmit(values, helpers);
          } else {
            setStep((s) => s + 1);
          }
        }}
      >
        {(props) => (
          <Form autoComplete="off">
            {React.cloneElement(
              // @ts-ignore
              currentChild,
              { values: props.values }
            )}
            <button type="submit">{isLastStep() ? "Submit" : "Next"}</button>
            {optional && (
              <button
                type="button"
                onClick={() => {
                  props.setFieldValue(
                    // @ts-ignore

                    currentChild.props.children.props.name,
                    null
                  );
                  handleSkip();
                }}
              >
                Skip
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
