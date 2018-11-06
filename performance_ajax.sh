#!/bin/bash
echo 'Response Time of API: https://todolistauth.herokuapp.com/'
for i in {1..50};do 
    curl -X GET https://todolistauth.herokuapp.com/ \
        -H 'cache-control: no-cache' \
        -H 'content-type: application/json' \
        -s -o /dev/null -w "%{time_total}\n"
done

echo 'Response Time of POST API: https://todolistauth.herokuapp.com/item'
for i in {1..50};do 
    curl -X POST https://todolistauth.herokuapp.com/item \
        -H 'cache-control: no-cache' \
        -H 'content-type: application/json' \
        -d '{ "item": "new item"  }' \
        -s -o /dev/null -w "%{time_total}\n"
done

echo 'Response Time of PUT API: https://todolistauth.herokuapp.com/item'
for i in {1..50};do 
    curl -X PUT https://todolistauth.herokuapp.com/item \
        -H 'cache-control: no-cache' \
        -H 'content-type: application/json' \
        -d '{"taskid": "2e81f8cf-bd1e-4733-9305-667b8ea9b0c6", "newitem": "Submit Technical Report"}' \
        -s -o /dev/null -w "%{time_total}\n"
done

echo 'Response Time of DELETE API: https://todolistauth.herokuapp.com/item'
for i in {1..50};do 
    curl -X DELETE https://todolistauth.herokuapp.com/item \
        -H 'cache-control: no-cache' \
        -H 'content-type: application/json' \
        -d '{"taskid": "2e81f8cf-bd1e-4733-9305-667b8ea9b0c6" }' \
        -s -o /dev/null -w "%{time_total}\n"
done


echo 'Response Time of API: https://todolistauth.herokuapp.com/item/status'
for i in {1..50};do 
    curl -X PUT https://todolistauth.herokuapp.com/item/status \
        -H 'cache-control: no-cache' \
        -H 'content-type: application/json' \
        -d '{"taskid": "0410b0d3-9f7c-4da9-bff8-b87902c78895", "item_status": 0}' \
        -s -o /dev/null -w "%{time_total}\n"
done