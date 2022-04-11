const checkEmptyFields = (receivedJson) => {
  if (!receivedJson.email || !receivedJson.password || !receivedJson.name) {
    return "please add all the fields";
  }
  return "All good";
};

exports.checkEmptyFields = checkEmptyFields;
