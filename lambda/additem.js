const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = (event, context) => {
  console.log('Request received:\n', JSON.stringify(event));
  console.log('Context received:\n', JSON.stringify(context));

  let params = {
    TableName: 'todo',
    Item: {
      taskid: uuidv4(),
      item: event.item,
      item_status: 1,
      userid: event.userid,
      last_updated_date: parseInt(new Date().getTime().toString())
    }
  };

  docClient.put(params, (err, data) => {
    if (err) {
      context.done(null, { success: 0, error: err });
    } else {
      context.succeed({ success: 1 });
    }
  });
};
