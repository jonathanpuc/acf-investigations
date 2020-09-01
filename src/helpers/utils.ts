export const capitalize = (s: string): string => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getJourneyColor = (s: string): string => {
  const topicBackgrounds = {
    prevention: "lightBlue",
    spread: "lightPink",
    diagnosis: "lightGrey",
    treatment: "lightYellow",
  };

  return topicBackgrounds[s];
};
