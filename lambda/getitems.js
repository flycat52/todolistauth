const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = (event, context) => {
  console.log('Request received:\n', JSON.stringify(event));
  console.log('Context received:\n', JSON.stringify(context));

  let params = {
    TableName: 'todo',
    FilterExpression: 'item_status = :item_status and userid = :userid',
    ExpressionAttributeValues: {
      ':item_status': event.item_status,
      ':userid': event.userid
    },
    ScanIndexForward: false
  };

  docClient.scan(params, (err, data) => {
    if (err) {
      context.done(null, { success: 0, error: err });
    } else {
      context.succeed({ success: 1, data: data });
    }
  });
};
