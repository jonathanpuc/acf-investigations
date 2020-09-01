import React from "react";

import { ANALYST_TASKS } from "~/src/data/tasks";
import Form from "~/src/components/Form";

interface ComponentProps {
  onSubmit: (values) => void;
}
const AnalystForm = ({ onSubmit }: ComponentProps) => {
  return (
    <Form
      tasks={ANALYST_TASKS}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      initialValues={{
        offset_condition: "",
        rehabilitation_area_exists: null,
        rehabilitation_offset_conditions: "",
      }}
    />
  );
};
export default AnalystForm;

// interface CollectorFields {
//   holder_action: string;
//   impacted_flora?: Array<string>;
//   impacted_animals?: Array<string>;
//   impacted_protected_matter?: Array<string>;
//   impacted_communities?: Array<string>;
// }

// const COLLECTOR_FIELDS: CollectorFields = {
//   holder_action: "Lorem ipsum hello man",
//   impacted_flora: ["myrtle", "teatree"],
//   impacted_animals: ["woodland snail"],
//   impacted_protected_matter: null,
//   impacted_communities: null,
// };

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
