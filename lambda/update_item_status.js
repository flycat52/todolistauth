const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = (event, context) => {
  console.log('Request received:\n', JSON.stringify(event));
  console.log('Context received:\n', JSON.stringify(context));

  let params = {
    TableName: 'todo',
    Key: { taskid: event.taskid },
    UpdateExpression:
      'set item_status = :item_status, last_updated_date = :updated_date',
    ExpressionAttributeValues: {
      ':item_status': parseInt(event.item_status),
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
