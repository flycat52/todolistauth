const express = require('express');
const router = express.Router();
const User = require('../models/user');
const sessionstorage = require('sessionstorage');
const striptags = require('striptags');

const apigClientFactory = require('aws-api-gateway-client').default;
const apigClient = apigClientFactory.newClient({
  invokeUrl: 'https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com',
  apiKey: 'jGF8IUdEgm25h6hOrtsSQ8TWlKPv9RLq8fJWMsaK', // REQUIRED
  region: 'us-east-2' // REQUIRED
});

const dataType = {
  'Content-Type': 'application/json'
};

const requestMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

const ITEM_STATUS = {
  TODO: 1,
  COMPLETED: 0
};

let todoTasks, completedTasks;

// Get Homepage
router.get('/', ensureAuthenticated, async function(req, res) {
  await get_items(ITEM_STATUS.TODO);
  await get_items(ITEM_STATUS.COMPLETED);

  res.render('index', {
    todoTasks: todoTasks,
    completedTasks: completedTasks
  });
});

router.post('/item', async (req, res) => {
  let userid;
  if (sessionstorage.getItem('userid') !== null) {
    userid = parseInt(sessionstorage.getItem('userid'));
  }
  var pathParams = {};
  // Template syntax follows url-template https://www.npmjs.com/package/url-template
  var pathTemplate = '/prod/item';
  var method = requestMethod.POST;
  var additionalParams = {
    headers: dataType
  };
  req.body.userid = userid;
  req.body.item = striptags(req.body.item.replace(/'/g, "\\'")).trim();

  if (req.body.item !== '') {
    var body = JSON.stringify(req.body);
    // console.log(body);
    await apigClient
      .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
      .then(result => {
        if (result.data.success === 1) {
          req.flash('success_msg', 'New item added');
          res.end();
        }
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    res.end();
  }
});

router.delete('/item', async (req, res) => {
  var pathParams = {};
  var pathTemplate = '/prod/item';
  var method = requestMethod.DELETE;
  var additionalParams = {
    headers: dataType
  };
  var body = JSON.stringify(req.body);

  await apigClient
    .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
    .then(result => {
      if (result.data.success === 1) {
        // console.log(result);
        req.flash('success_msg', 'Item is deleted');
        res.end();
      }
    })
    .catch(error => {
      console.error(error.message);
    });
});

router.put('/item', async (req, res) => {
  var pathParams = {};
  var pathTemplate = '/prod/item';
  var method = requestMethod.PUT;
  var additionalParams = {
    headers: dataType
  };
  req.body.newitem = striptags(req.body.newitem.replace(/'/g, "\\'")).trim();
  var body = JSON.stringify(req.body);
  // console.log(body);
  if (req.body.newitem !== '') {
    await apigClient
      .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
      .then(result => {
        if (result.data.success === 1) {
          //console.log(result);
          req.flash('success_msg', 'Item is updated');
          res.end();
        }
      })
      .catch(error => {
        console.error(error.message);
      });
  } else {
    res.end();
  }
});

router.put('/item/status', async (req, res) => {
  var pathParams = {};
  var pathTemplate = '/prod/item/status';
  var method = requestMethod.PUT;
  var additionalParams = {
    headers: dataType
  };
  var body = JSON.stringify(req.body);

  await apigClient
    .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
    .then(result => {
      if (result.data.success === 1) {
        //console.log(result);
        // req.flash("success_msg", "Item is updated");
        res.end();
      }
    })
    .catch(error => {
      console.error(error.message);
    });
});

async function get_items(status) {
  let userid;
  if (sessionstorage.getItem('userid') !== null) {
    userid = parseInt(sessionstorage.getItem('userid'));
  }
  // console.log("get items: " + status);
  var pathParams = {};
  var pathTemplate = '/prod/items';
  var method = requestMethod.GET;
  var additionalParams = {
    headers: dataType,
    queryParams: {
      item_status: status,
      userid: userid
    }
  };
  var body = {};

  await apigClient
    .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
    .then(result => {
      if (status === ITEM_STATUS.TODO) {
        todoTasks = result.data.data.Items;
      } else if (status === ITEM_STATUS.COMPLETED) {
        completedTasks = result.data.data.Items;
      }
    })
    .catch(error => {
      console.error(error.message);
    });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/user/login');
  }
}

module.exports = router;
