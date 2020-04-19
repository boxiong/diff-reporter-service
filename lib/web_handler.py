from datetime import datetime
import http.client
import json

def greet(event, context):

  # GET from the /time endpoint
  connection = http.client.HTTPSConnection('worldtimeapi.org')
  connection.request("GET", "/api/timezone/America/Los_Angeles")
  response = json.loads(connection.getresponse().read().decode())

  return {
    "statusCode": 200,
    "body": "<html><body><p>Hello! It is now {0}.</p></body></html>".format(response['datetime']),
    "headers": {
      "Content-Type": "text/html"
    }
  }
