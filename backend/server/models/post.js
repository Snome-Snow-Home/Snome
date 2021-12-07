const db = require("../../database");

/* define model queries for post requests here */

module.exports = {
  createSnome: async ({
    owner_id,
    location_id,
    header,
    time_to_mountain,
    mountain_access,
    availability_start,
    availability_end,
    address,
    bedrooms,
    bathrooms,
    number_of_beds,
    perks,
    description,
  }) => {
    const id = await db.one(
      `
      INSERT INTO snome (
        owner_id,
        location_id,
        header,
        time_to_mountain,
        mountain_access,
        availability_start,
        availability_end,
        address,
        bedrooms,
        bathrooms,
        number_of_beds,
        perks,
        description
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
      )
      RETURNING id
      `,
      [
        owner_id,
        location_id,
        header,
        time_to_mountain,
        mountain_access,
        availability_start,
        availability_end,
        address,
        bedrooms,
        bathrooms,
        number_of_beds,
        perks,
        description,
      ]
    );
    return id;
  },

  createSnomePhoto: async (snome_id, url) => {
    await db.none(`INSERT INTO snome_photo (snome_id, url) values ($1, $2)`, [
      snome_id,
      url,
    ]);
    return "Photo created!";
  },

  createUser: async ({
    location_id,
    name,
    travel_start,
    travel_end,
    age,
    user_phone,
    user_photo,
    video_tour,
    about,
    email,
    mailing_address,
    residential_address,
  }) => {
    await db.none(
      `
        INSERT INTO snome_user (
          id,
          location_id,
          name,
          travel_start,
          travel_end,
          age,
          user_phone,
          user_photo,
          video_tour,
          about,
          email,
          mailing_address,
          residential_address
        )
        VALUES ((SELECT MAX(id) FROM snome_user) +1,
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        )
      `,
      [
        location_id,
        name,
        travel_start,
        travel_end,
        age,
        user_phone,
        user_photo,
        video_tour,
        about,
        email,
        mailing_address,
        residential_address,
      ]
    );
    return "New user created!";
  },

  createLike: async ({ snome_user_id, snome_id, has_been_read }) => {
    await db.none(
      `
        INSERT INTO snome_like (
          snome_user_id,
          snome_id,
          has_been_read
        )
        VALUES (
          $1, $2, $3
        )
      `,
      [snome_user_id, snome_id, has_been_read]
    );
    return "New like created!";
  },

  createReview: async ({ snome_user_id, snome_id, date, stars, review }) => {
    await db.none(
      `
        INSERT INTO review (
          snome_user_id,
          snome_id,
          date,
          stars,
          review
        )
        VALUES (
          $1, $2, $3, $4, $5
        )
      `,
      [snome_user_id, snome_id, date, stars, review]
    );
    return "New review created!";
  },
};
