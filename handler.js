'use strict';

const aws = require('aws-sdk')
const ses = new aws.SES()
const myEmail = process.env.EMAIL
const myDomain = process.env.DOMAIN

module.exports.generateRawDiffReport = async event => {
  try {
    const emailParams = generateReportStartedEmail(event)
    const data = await ses.sendTemplatedEmail(emailParams).promise()
    return generateResponse(200, event)
  } catch (err) {
    return generateError(500, err)
  }
}

module.exports.generateSummaryReport = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'A raw diff report has been generated!',
        input: event,
      },
      null,
      2
    )
  }
}

function generateResponse(code, payload) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': myDomain,
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(payload)
  }
}

function generateError(code, err) {
  console.log(err)
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': myDomain,
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(err.message)
  }
}

function generateReportStartedEmail(body) {
  const { email, requester, report_location, baseline_location, regression_location } = body
  console.log(email, requester, report_location, baseline_location, regression_location)
  if (!(email && requester && report_location && baseline_location && regression_location)) {
    throw new Error('Missing parameters! Make sure to add parameters \'email\', \'requester\', \'baseline_location\', \'regression_location\'.')
  }

  return {
    Source: myEmail,
    Destination: { ToAddresses: [email] },
    Template: 'ReportStartedTemplate',
    TemplateData: JSON.stringify({
      Requester: requester,
      BaselineLocation: baseline_location,
      RegressionLocation: regression_location,
      ReportLocation: report_location
    })
  }
}
