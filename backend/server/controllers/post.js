const { post } = require('../models');

/* define post request handlers here */

module.exports = {
  createSnome: async (req, res) => {

    // 0. Accept request from client - cpUpload middleware provides access to request.files
    // 1. create a snome record in db using non-file data from request returning id of inserted snome
    // 2. instantiate empty Promise array
    // 3. loop over request.files...
        // a. generate a fileKey (using returned snome_id and random string)...
        // b. call uploadToS3 function with fileName (object in array itself) and fileKey -> return promise
        // c. push each Promise onto Promise array

    // 4. call Promise.all on promise array to upload files in parallel
    // 5. respond with success/error to client


    try {
      await post.create(req.body);
      res.status(201).send('Success!');
    } catch(err) {
      console.log(`SERVER SIDE ERROR - POST: ${err}`)
      res.status(400).send(err);
    }
  },

  createUser: async (req, res) => {
    try {
      await post.createUser(req.body);
      res.status(201).send('Success!');
    } catch(err) {
      console.log(`SERVER SIDE ERROR - POST: ${err}`);
      res.status(400).send(err);
    }
  },

  createLike: async (req, res) => {
    post.createLike(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send(
        "Some error occurred while creating the Like."
        )
      })

    }
  ,
  // <TEMPLATE>: async (req, res) => {
  //   try {
  //     let data = await get.<TEMPLATE>(req.body);
  //     res.status(200).json(data);
  //   } catch(err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   }
  // },

}