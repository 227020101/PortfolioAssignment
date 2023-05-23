export const image = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/uploadImage",
  "title": "uploadImage",
  "description": "An image in the blog",
  "type": "object",
  "properties": {
    "imageurl": {
      "description": "Image(base64) of the cat",
      "type": "string"
    },
  },
  "required": ["imageurl"]
}
