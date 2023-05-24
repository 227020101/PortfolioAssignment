export const cats = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/cat",
  "title": "Cat",
  "description": "A cat in the blog",
  "type": "object",
  "properties": {
    "name": {
      "description": "Name of the cat",
      "type": "string"
    },
    "allText": {
      "description": "Body text of the cat",
      "type": "string"
    },
    "imageurl": {
      "description": "URL for main image to show in cat",
      "type": "uri"
    },
    "location": {
      "description": "Location of the cat",
      "type": "string"
    },
    "gender": {
      "description": "Gender of the cat",
      "type": "string"
    },
    "age": {
      "description": "Age of the cat",
      "type": "string"
    },
  },
  "required": ["name"]
}
