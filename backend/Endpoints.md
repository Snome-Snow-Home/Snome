# Endpoints

## IMPORTANT
For deconstructing correctly on both front and back-end, all parameter names should be lowercase. Reference schema.sql for data types, but don't copy their capitalization

## Structure of HTTP request
GET
```
axios.get('/endpoint', {
  params: {
    key: value,
    key: value,
  }
})
```
server side key-value pairs deconstruct under req.query

---

POST
```
axios.post('/endpoint', {
    key: value,
    key: value
  }
})
```
server side key-value pairs deconstruct under req.body

---

### CATEGORY OPTIONS
- housing
- food
- bills
- homegoods

---
### OFFERS: GET AND POST

GET api/listings/offers/:post_id
```
[{
  id
  title
  body
  username
  timestamp
  category
  photo
}]
```
---
GET api/listings/offers/:limit/:category/:post_id
```
[{
  id
  title
  body
  username
  timestamp
  category
  photo
}];
```
sorted by most recent

limit, category and post_id optional

---
POST api/listings/offers
```
{
  email
  title
  body
  category
};
```
---

### REQUESTS: GET AND POST

GET api/listings/requests/:limit/:category/:post_id
```
[{
  id
  title
  body
  username
  timestamp
  category
}]
```
sorted by most recent

limit, category, and post_id optional

---

POST api/listings/requests
```
{
  email
  title
  body
  category
}
```

---
### COMMENTS: GET AND POST

GET api/comments/:post_id
```
[
  [{ id, username, body, post_id, thread_id, timestamp }, {...}],
  [{...}, {...}]
]
```
grouped by thread_id

post_id mandatory

---
POST api/comments
```
{
  post_id
  thread_id
  email
  body
}
```
if no thread_id is passed, comment is assumed to be on original post, and new one will be assigned

---

### PROFILE: GET, POST, AND PUT

GET api/profile/:email
```
[{
  id
  firebase_id
  firstname
  lastname
  username
  email
  homephone
  mobile
  preferredcontact -> 0=email, 1=homephone, 2=mobile
  city
  state
  zip
  address1
  address2
  role -> 0=recipient, 1=donor
  organization
}]
```
---
POST api/profile
```
{
  same as above, see database/schema.sql for data types
  (id not needed)
}
```

---

PUT api/profile
```
{
  "ogemail": current email, include even if it's not changing and therefor in the object twice. "email" will be new email or still the same
  .
  .
  .
  same as above (id not needed)
}
```
 ---
### CHECK

GET /api/check/:email
```
"0" or "1", like I'm actually confused why it doesn't have an object?
```
