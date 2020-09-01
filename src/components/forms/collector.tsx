import React from "react";

import { COLLECTOR_TASKS } from "~/src/data/tasks";
import Form from "~/src/components/Form";

interface ComponentProps {
  onSubmit: (values) => void;
}
const CollectorForm = ({ onSubmit }: ComponentProps) => {
  return (
    <Form
      tasks={COLLECTOR_TASKS}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      initialValues={{
        holder_action: "",
        impacted_flora: [],
        impacted_animals: [],
        impacted_protected_matter: [],
        impacted_communities: [],
      }}
    />
  );
};
export default CollectorForm;

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
