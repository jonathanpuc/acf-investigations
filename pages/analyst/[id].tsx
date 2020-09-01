import { useState } from "react";
import AnalystForm from "~/src/components/forms/analyst";
import { database } from "~/src/services/firebase/client";
import { useRouter } from "next/router";
const MISSION_TYPE = "analyst";

const AnalystMission = (props) => {
  const [missionStarted, setMissionStarted] = useState(false);
  const [missionEnded, setMissionEnded] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const handleSubmission = (values) => {
    const submissionsRef = database
      .ref("submissions")
      // @ts-ignore
      .child(id)
      .child(MISSION_TYPE);
    var newPostRef = submissionsRef.push();
    newPostRef.set({
      ...values,
    });
    setMissionStarted(false);
    setMissionEnded(true);
  };

  return (
    <div>
      {missionEnded ? (
        <div>
          <h2>THANK YOU.</h2>
        </div>
      ) : missionStarted ? (
        <AnalystForm onSubmit={handleSubmission} />
      ) : (
        <button onClick={() => setMissionStarted(true)}>start des</button>
      )}
    </div>
  );
};

export default AnalystMission;
