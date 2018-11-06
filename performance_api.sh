#!/bin/bash
echo 'Response Time of API: https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com/prod/items?userid=1&item_status=1'
for i in {1..50};do 
    curl -X GET 'https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com/prod/items?userid=1&item_status=1' \
         -H 'cache-control: no-cache' \
         -H 'x-api-key: jGF8IUdEgm25h6hOrtsSQ8TWlKPv9RLq8fJWMsaK' \
         -s -o /dev/null -w "%{time_total}\n"
done


echo 'Response Time of API: https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com/prod/items?userid=1&item_status=0'
for i in {1..50};do 
    curl -X GET 'https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com/prod/items?userid=1&item_status=0' \
         -H 'cache-control: no-cache' \
         -H 'x-api-key: jGF8IUdEgm25h6hOrtsSQ8TWlKPv9RLq8fJWMsaK' \
         -s -o /dev/null -w "%{time_total}\n"
done


echo 'Response Time of POST API: https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com/prod/item'
for i in {1..50};do 
    curl -X POST \
            https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com/prod/item \
        -H 'cache-control: no-cache' \
        -H 'content-type: application/json' \
        -H 'x-api-key: jGF8IUdEgm25h6hOrtsSQ8TWlKPv9RLq8fJWMsaK' \
        -d '{ "item": "Submit report", "userid": 1 }'\
        -s -o /dev/null -w "%{time_total}\n"
done


echo 'Response Time of PUT API: https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com/prod/item'
for i in {1..50};do 
    curl -X PUT \
            https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com/prod/item \
        -H 'cache-control: no-cache' \
        -H 'content-type: application/json' \
        -H 'x-api-key: jGF8IUdEgm25h6hOrtsSQ8TWlKPv9RLq8fJWMsaK' \
        -d '{  "taskid": "a129b249-d063-475b-95fa-b11d644e703a",  "newitem": "Submit technical report",  "userid": 1}' \
        -s -o /dev/null -w "%{time_total}\n"
done


echo 'Response Time of DELETE API: https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com/prod/item'
for i in {1..50};do 
    curl -X DELETE \
            https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com/prod/item \
        -H 'cache-control: no-cache' \
        -H 'content-type: application/json' \
        -H 'x-api-key: jGF8IUdEgm25h6hOrtsSQ8TWlKPv9RLq8fJWMsaK' \
        -d '{  "taskid": "a190bfb8-a724-4383-a2ec-80efae169c35" }' \
        -s -o /dev/null -w "%{time_total}\n"
done


echo 'Response Time of API: https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com/prod/item/status'
for i in {1..50};do 
    curl -X PUT \
            https://vbm4noxwbg.execute-api.us-east-2.amazonaws.com/prod/item/status \
        -H 'cache-control: no-cache' \
        -H 'content-type: application/json' \
        -H 'x-api-key: jGF8IUdEgm25h6hOrtsSQ8TWlKPv9RLq8fJWMsaK' \
        -d '{  "taskid": "a129b249-d063-475b-95fa-b11d644e703a",  "item_status": 0,  "userid": 1}' \
        -s -o /dev/null -w "%{time_total}\n"
done


