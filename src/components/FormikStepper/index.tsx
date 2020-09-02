import React, { useState } from "react";
import {
  Form,
  Formik,
  FormikConfig,
  FormikValues,
  useFormikContext,
} from "formik";

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  children;
}
export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

const validateCondition = (
  values,
  { dependencyCondition, dependencyParent, dependencyValue }
) => {
  if (dependencyCondition === "equals") {
    return (
      values[dependencyParent] && values[dependencyParent] === dependencyValue
    );
  }
};

export function WithFormikContext({ children }) {
  const { values } = useFormikContext();

  const conditional =
    children.props.children.length &&
    children.props.children[0] &&
    children.props.children[0].props.conditional
      ? true
      : false;

  if (conditional) {
    return (
      <div>
        {children.props.children[0]}
        {React.Children.map(children.props.children[1], (child) => {
          const {
            dependencyCondition,
            dependencyParent,
            dependencyValue,
          } = child.props;

          if (
            validateCondition(values, {
              dependencyCondition,
              dependencyParent,
              dependencyValue,
            })
          ) {
            return React.cloneElement(child);
          }
          return null;
        })}
      </div>
    );
  }

  return (
    <div>
      <p>{JSON.stringify(conditional)}</p>
      {children}
    </div>
  );
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
  const currentChild = childrenArray[step] as any;

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const currentTaskInfo = taskInfo[step];
  // @ts-ignore
  const optional = currentChild.props.children.length
    ? false
    : // @ts-ignore
      currentChild.props.children.props.optional;

  console.log(currentChild, "currentChild");

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
            {<WithFormikContext>{currentChild}</WithFormikContext>}
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
