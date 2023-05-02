export const user = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/user",
  "title": "User",
  "description": "A user in the blog",
  "type": "object",
  "properties": {
    "firstName": {
      "description": "First Name of the user",
      "type": "string"
    },
    "lastName ": {
      "description": "Last Name of the user",
      "type": "string"
    },
    "username": {
      "description": "Username of the user",
      "type": "string"
    },
    "about": {
      "description": "addtion information of the user",
      "type": "uri"
    },
  },
  "required": ["username", ]
}
