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
    "summary": {
      "description": "Optional short text summary of cat",
      "type": "string"
    },
    "imageURL": {
      "description": "URL for main image to show in cat",
      "type": "uri"
    },
    "birthday": {
      "description": "Birthday of the cat",
      "type": "string"
    },
    "category_ids": {
      "description": "Category ids of the cat",
      "type": "integer",
      "minimum": 0
    },
    "microchipNo": {
      "description": "Microchip No of the cat",
      "type": "string"
    },
    "gender": {
      "description": "Gender of the cat",
      "type": "string"
    },
  },
  "required": ["name", "microchipNo"]
}
