export const user= {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/users",
  "title": "Users",
  "description": "A user in the blog",
  "type": "object",
  "properties": {
    "username": {
      "description": "Username of users",
      "type": "string"
    },
    "password": {
      "description": "password of users",
      "type": "string"
    },
    "email": {
      "description": "email of users",
      "type": "string"
    },
    "userrole": {
      "description": "userrole of users",
      "type": "string"
    },
  },
  "required": ["username","password","userrole"]
}
