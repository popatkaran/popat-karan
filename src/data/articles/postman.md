---
slug: "/postman"
date: "2023-07-18"
title: "Notes - Postman"
description: "How to install, collection types and verious assertions techniques."
category: "postman"
type: "professional"
image: '../../images/postman.png'
order: 6
---

### Installations
- postman: https://postman.com/downloads/
- check node version: `node --version`
- check npm: `npm --version`
- install newman: `npm install -g newman` (to use postman from CLI)

### API Collection
- GET: return all records
- GET/{id}: return specific record
- POST: add record
- PUT/{id}: update specific record
- DELETE/{id}: delete specific record

### Negative Scenarios
- `401 Unauthorised` A request is sent with missing autherntication token
- `404 Not Found` A record ins not found
- `400 Bad Request` A request is sent with missing required information
- `400 Bad Request` A value is sent with too many characters
- `400 Bad Request` A value is sent that is not in the correct format

> Save values as variable in respective environment

### Saving Environment Variables programmatically
- use test tab of postman request
- use templates to get / set / clear env variables snippets to perform operation
- replace field values of request bodies and urls with environment variables

### Status Type Assertions
- `200`: The request was completed as expected
- `201`: A new resource was created
- `401`: The user is not authenticated
- `404`: The resource was not found

> Use postman test template for status code, verify with the status code expected.

> get last object from json response and set that as variable
```js
var jsonData = _.last(pm.response.json());
``` 

### Body Assertions
- A body assertion verifies that the body of the response contains the text that we were expecting.
- `Response body: Contains string`: The text is in the body of response, but may not be the entire response.
- `Response body: Is equal to a string`: The text matches the entire body of the response.

### Header and Response time Assertion
- `Response Headers`: Information passed with an API response that included additional information about the response, such as the format of the response or any security controls.

```js
pm.test("Content-Type is application/json", function () {
    pm.response.to.have.header("Content-Type", "application/json; charset=utf-8");
});
```
- `Response Time`: Time to reach to server, get processed and get response back
``` js
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});
``` 

### Nested JSON response assertions
- if the response being received like following nested format
``` json
{
    "id": "1",
    "address": {
        "street1" : "street1",
        "street2" : "street2",
        "city": "city",
        "postcode": "postcode",
        "country": "country"
    }
}
```
- test script should look like
``` js
pm.test("Verify correct city is returned", function () {
    pm.expect(jsonData.address.city).to.eql(environment.city);
});
```

### Run postman test collection using CLI
- `newman run <collection.json> -e<collection.envirenment.json>`