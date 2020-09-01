/** @jsx jsx */
import { jsx } from "theme-ui";

import { NextSeo } from "next-seo";
import { database } from "~/src/services/firebase/client";

interface AnalystFields {
  environmental_offset_conditions: string;
  rehabilitation_offset_conditions?: string;
  exclusion_offset_conditions?: string;
  compliance_reporting_conditions?: string;
}

const ANALYST_FIELDS: AnalystFields = {
  environmental_offset_conditions: "Yeah totally, theres an offset condition.",
  rehabilitation_offset_conditions: null,
  exclusion_offset_conditions: "N/A",
  compliance_reporting_conditions: "Yeah totally is one",
};

enum CoordinateTypes {
  LONGLAT,
  UTM,
}

interface DetectiveFields {
  assignment_has_map: boolean;
  has_map_address: boolean;
  map_address?: {
    street_num: number;
    street_name: string;
    suburb: string;
    postcode: number;
  };
  coordinate_type?: CoordinateTypes;
  longlat?: {
    long: number;
    lat: number;
  };
  utm?: number;
}

const DETECTIVE_FIELDS: DetectiveFields = {
  assignment_has_map: true,
  has_map_address: true,
  map_address: {
    street_num: 21,
    street_name: "Jonathan St",
    suburb: "Brunswick",
    postcode: 3056,
  },
  coordinate_type: CoordinateTypes.LONGLAT,
  longlat: {
    long: 31,
    lat: 23,
  },
  utm: null,
};

const Home = () => {
  const createAssignment = async () => {
    console.log(database.ref("assignments/" + "ref123"));
    await database.ref("assignments/" + "ref123").set({
      id: "ref123",
      name: "RES AUSTRALIA PTY LTD/Energy Generation and Supply",
      industry: "Energy",
    });
  };
  const createSubmission = async () => {
    // @ts-ignore
    const submissionsRef = database
      .ref("submissions")
      .child("ref123")
      .child("collector");
    var newPostRef = submissionsRef.push();
    newPostRef.set({
      referral_id: "ref123",
      title: "Announcing COBOL, a New Programming Language",
    });
  };

  return (
    <div>
      <NextSeo title="Home | MedLitGo" />
      <main>
        <section
          sx={{
            bg: "lightYellow",
            position: "relative",
          }}
        >
          <button onClick={createAssignment}>Create assignment</button>
          <button onClick={createSubmission}>Create submission</button>
        </section>
      </main>
    </div>
  );
};
export default Home;
