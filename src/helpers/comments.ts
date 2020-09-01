export const formatComments = (data) => {
  if (!data) {
    return [];
  } else {
    return Object.keys(data).length
      ? Object.keys(data)
          .map((key: string) => ({
            text: data[key].text,
            timestamp: data[key].timestamp,
            user_uuid: data[key].user_uuid,
            author: data[key].author,
          }))
          .sort((a, b) => b.timestamp - a.timestamp)
      : [];
  }
};
