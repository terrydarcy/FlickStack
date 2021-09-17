const functions = require("firebase-functions");

exports.testNumber = functions.https.onRequest((request, response) => {
  const number = Math.round(Math.random() * 100);

  functions.logger.info("Hello " + number + "!", {structuredData: true});
  response.send(number.toString());
});

exports.doTest = functions.https.onCall((data, context) => {
  return "test from backend";
});
