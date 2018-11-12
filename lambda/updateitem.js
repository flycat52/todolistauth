const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = (event, context) => {
  console.log('Request received:\n', JSON.stringify(event));
  console.log('Context received:\n', JSON.stringify(context));

  let params = {
    TableName: 'todo',
    Key: { taskid: event.taskid },
    UpdateExpression: 'set #item = :newitem, last_updated_date = :updated_date',
    ExpressionAttributeNames: { '#item': 'item' },
    ExpressionAttributeValues: {
      ':newitem': event.newitem,
      ':updated_date': parseInt(new Date().getTime().toString())
    }
  };

  docClient.update(params, (err, data) => {
    if (err) {
      context.done(null, { success: 0, error: err });
    } else {
      context.succeed({ success: 1 });
    }
  });
};
