# This is documentation of ContentPedia App

First of all lets start from REST API.
How we can manage data:
* Add
* Get all
* Delete one
* Update one

### For adding test item in test DataBase
We must send a **POST** request JSON in body to /test/db

**JSON example**
```javascript
{
    title: { type: String, default: 'Test' },
    name: { type: String, default: 'Victor Ryabkov' },
    age: { type: Number, default: 20 },
    date: { type: Date, default: Date.now() },
}
```

>If item was added successfully you got status code **200** and json with **success** message

>If item wasn't  added you got status code **500** and json with **error** message

### For getting all test items in test DataBase
We must send a **GET** request to /test/db

>If entries were found you got status code **200** and json with **array of items**

>If the request was sent correctly, but no records were found on the request, then you will receive the status code **204** and a message stating that **records were not found**

>If going some error you will receive the **status code 500 with error message**

### For deleting test item in test DataBase
We must send a **DELETE** request to /test/db/:**item-id**


>If item was deleted successfully you got status code **200** and json with **success** message

>If item wasn't  deleted you got status code **500** and json with **error** message

### For updating test item in test DataBase
We must send a **PATCH** request JSON in body to /test/db/:**item-id**

    In params we send ID of item which want to delete.
    In body we send array with objects.
    Each object include key=value structure.
    Key stating name of property
    Value stating new value of property

**JSON example**

**If we want update only one property**
```javascript
[
    {
        "propName": "name",
        "value": "Victor Ryabkov Updated"
    }
]
```
**If we want update few properties for one time**
```javascript
[
    {
        "propName": "name",
        "value": "Victor Ryabkov Updated"
    },
    {
        "propName": "title",
        "value": "title updated"
    }
]
```

>If item was added successfully you got status code **200** and json with **success** message

>If item wasn't  added you got status code **500** and json with **error** message