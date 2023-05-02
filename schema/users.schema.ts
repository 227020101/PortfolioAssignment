export const comment = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/users",
  "title": "Users",
  "description": "A user in the blog",
  "type": "object",
  "properties": {
    "firstname": {
      "description": "firstname of users",
      "type": "string"
    },
    "lastname": {
      "description": "lastname id of users",
      "type": "string"
    },
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
  },
  "required": ["username","password"]
}
