


#### Install the serverless framework 
```
npm install -g serverless
```

#### Create package.json
```
npm init
```

#### Create serverless.yaml and handler.js
```
serverless create --template aws-nodejs
```

#### Install plug-in
```
npm install --save-dev serverless-step-functions

npm install --save-dev serverless-pseudo-parameters
```

#### Deploy
```
sls deploy
```

```
curl https://hwjlcbm36f.execute-api.us-east-1.amazonaws.com/dev/reports/create \
--header "Content-Type: application/json" \
--request POST \
--data @- << EOF
{
    "email": "xyz@amazon.com",
    "requester": "Bo",
    "report_location": "https://coronavirus.jhu.edu/us-map",
    "baseline_location": "s3://baseline/dat/2020/04/15/",
    "regression_location": "s3://regression/dat/2020/04/15/"
}
EOF
```


#### Create/Update an email template
```
aws ses create-template --cli-input-json file://email-templates/report-started.json --profile <aws_profile> --region us-east-1

aws ses update-template --cli-input-json file://email-templates/report-started.json --profile <aws_profile> --region us-east-1
```



