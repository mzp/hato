# Hato
Hato is programmable notification for [esa.io](https://esa.io) and [Slack](http://slack.com) using [Lambda](https://aws.amazon.com/lambda/) and [API Gateway](https://aws.amazon.com/api-gateway/).

![](https://raw.githubusercontent.com/mzp/hato/master/hato.png)

## Setup
### 1. AWS Setup
Go to [AWS Console](https://console.aws.amazon.com) and create a new IAM role that has `AWSLambdaBasicExecutionRole`.

And wrote `.env`:

```
AWS_ENVIRONMENT=development
AWS_PROFILE=
AWS_SESSION_TOKEN=
AWS_REGION=ap-northeast-1
AWS_FUNCTION_NAME=hato
AWS_HANDLER=index.handler
AWS_MEMORY_SIZE=128
AWS_TIMEOUT=60
AWS_DESCRIPTION=
AWS_RUNTIME=nodejs4.3
AWS_VPC_SUBNETS=
AWS_VPC_SECURITY_GROUPS=
EXCLUDE_GLOBS="event.json"
PACKAGE_DIRECTORY=build

AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_ROLE_ARN=aws_role
```

### 2. Setup webhook
Go to [Slack settings page](https://standfirm.slack.com/apps) and create "Incoming WebHooks".

And wrote `deploy.env`:

```
SLACK_WEBHOOK=webhook_url
```

### 3. Write dispatch rule
Write `rule.js`:

```js
smodule.exports = [
  { pattern: 'Users/mzp', channel: '#current_mzp' },

  // fallback rule
  { pattern: '', channel: '#notification' }
]
```

### 4. Deployment

```
docker-compose build
docker-compose up
```

## Author
mzp
