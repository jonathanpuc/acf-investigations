import { useState } from "react";
import CollectorForm from "~/src/components/forms/collector";
import { database } from "~/src/services/firebase/client";
import { useRouter } from "next/router";
const MISSION_TYPE = "collector";

const CollectorMission = (props) => {
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
        <CollectorForm onSubmit={handleSubmission} />
      ) : (
        <button onClick={() => setMissionStarted(true)}>start des</button>
      )}
    </div>
  );
};

export default CollectorMission;
