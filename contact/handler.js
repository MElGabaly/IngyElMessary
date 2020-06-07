"use strict";
const AWS = require("aws-sdk");
const SES = new AWS.SES();
// module.exports.staticSiteMailer = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: "Go Serverless v1.0! Your function executed successfully!",
//         input: event
//       },
//       null,
//       2
//     )
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
function sendEmail(formData, callback) {
  const emailParams = {
    Source: "ingyg@aucegypt.edu", // SES SENDING EMAIL
    ReplyToAddresses: [formData.reply_to],
    Destination: {
      ToAddresses: ["ingyg@aucegypt.edu"] // SES RECEIVING EMAIL
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `${formData.message}\n\nName: ${formData.name}\nEmail: ${formData.reply_to}`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "New message from your_site.com"
      }
    }
  };

  SES.sendEmail(emailParams, callback);
}

module.exports.staticSiteMailer = (event, context, callback) => {
  const formData = JSON.parse(event.body);

  sendEmail(formData, function(err, data) {
    const response = {
      statusCode: err ? 500 : 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://ingyelmessary.com"
      },
      body: JSON.stringify({
        message: err ? err.message : data
      })
    };

    callback(null, response);
  });
};
