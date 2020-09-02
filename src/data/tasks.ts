import animals from "~/src/data/animals";
import flora from "~/src/data/flora";
import communities from "~/src/data/communities";
import matters from "~/src/data/matters";

import { object, mixed, number, string, array } from "yup";

export const COLLECTOR_TASKS = [
  {
    name: "holder_action",
    type: "textarea",
    title: "Approved holder actions",
    description:
      "Look through the highlighted document Copy + paste or write the Approval Holders action so that it’s clear what they have has been approved to do. (e.g. build a wind farm)",
    validation: object({
      holder_action: string().required(
        "We need to know the information surrounding holder action"
      ),
    }),
  },
  {
    name: "impacted_flora",
    title: "Impacted plants and flora",
    description:
      "Look through the highlighted document Copy + paste or write the Approval Holders action so that it’s clear what they have has been approved to do. (e.g. build a wind farm)",
    type: "select",

    options: flora,
    optional: true,
  },
  {
    name: "impacted_animals",
    title: "Impacted animals",
    description:
      "Look through the highlighted document Copy + paste or write the Approval Holders action so that it’s clear what they have has been approved to do. (e.g. build a wind farm)",
    type: "select",
    options: animals,
    optional: true,
  },
  {
    name: "impacted_protected_matter",
    title: "Protected matter",
    description:
      "Look through the highlighted document Copy + paste or write the Approval Holders action so that it’s clear what they have has been approved to do. (e.g. build a wind farm)",
    type: "select",

    options: matters,
    optional: true,
  },
  {
    name: "impacted_communities",
    title: "Ecological communities",
    description:
      "Look through the highlighted document Copy + paste or write the Approval Holders action so that it’s clear what they have has been approved to do. (e.g. build a wind farm)",
    type: "select",

    options: communities,
    optional: true,
  },
];

export const ANALYST_TASKS = [
  {
    name: "offset_condition",
    type: "textarea",
    title: "Is there an environmental offset?",
    description:
      "Look through the highlighted document Copy + paste or write the environmental offset conditions so that it’s there’s transparency around the approval holder’s Commitment.",
    validation: object({
      offset_condition: string().required(
        "We need to know the information surrounding the offset condition"
      ),
    }),
  },
  {
    name: "rehabilitation_area_exists",
    type: "conditional",
    condition: "Yes",
    title: "Is there a rehabilitation area?",
    description:
      "Look through the highlighted document, copy + paste or write the rehabilitation offset conditions so that it’s there’s transparency around the approval holder’s Commitment.",
    options: ["yes", "no", "unsure"],
    fields: [
      {
        name: "rehabilitation_offset_conditions",
        type: "textarea",
        dependencyParent: "rehabilitation_area_exists",
        dependencyCondition: "equals",
        dependencyValue: "yes",
      },
    ],
  },
  {
    name: "exclusion_area_exists",
    type: "conditional",
    condition: "Yes",
    title: "Is there an exclusion area?",
    description:
      "Look through the highlighted document, copy + paste or write the exclusion area conditions so that it’s there’s transparency around the approval holder’s Commitment.",
    options: ["yes", "no", "unsure"],
    fields: [
      {
        name: "exclusion_area_conditions",
        type: "textarea",
        dependencyParent: "exclusion_area_exists",
        dependencyCondition: "equals",
        dependencyValue: "yes",
      },
    ],
  },
  {
    name: "compliance_reporting_exists",
    type: "conditional",
    condition: "Yes",
    title: "Is there a condition for compliance reporting? ",
    description:
      "Look through the highlighted document, copy + paste or write any compliance reporting conditions that the approval holder needs to adhere to.",
    options: ["yes", "no", "unsure"],
    fields: [
      {
        name: "compliance_reporting_conditions",
        type: "textarea",
        dependencyParent: "compliance_reporting_exists",
        dependencyCondition: "equals",
        dependencyValue: "yes",
      },
    ],
  },
];
