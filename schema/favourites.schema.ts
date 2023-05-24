export const favourites = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/favourites",
  "title": "favourites",
  "description": "An favourites in the blog",
  "type": "object",
  "properties": {
    "catid": {
      "description": "id of the cat",
      "type": "string"
    },
    "userid": {
      "description": "id of the user",
      "type": "string"
    },
  },
  "required": ["catid","userid"]
}
