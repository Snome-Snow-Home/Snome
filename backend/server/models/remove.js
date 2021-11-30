const db = require("../../database");

module.exports = {
  delete: async (id, model) => {
    try {
      await db.none(`DELETE FROM ${model} WHERE id=${id}`);
      return "Delete Successful";
    } catch (err) {
      console.log(`DATABASE ERROR - DELETE: ${err}`);
      return err;
    }
  },

  deleteUser: async (id) => {
    try {
      await db.none(`
        DELETE FROM review
        WHERE EXISTS (SELECT * FROM snome
                      WHERE snome.id=review.snome_id
                      AND snome.owner_id=${id})
      `);
      await db.none(`DELETE FROM review WHERE snome_user_id=${id}`);
      await db.none(`
        DELETE FROM snome_photo
        WHERE EXISTS (SELECT * FROM snome
                      WHERE snome.id=snome_photo.snome_id
                      AND snome.owner_id=${id})
      `);
      await db.none(`
        DELETE FROM trip
        WHERE EXISTS (SELECT * FROM snome
                      WHERE snome.id=trip.snome_id
                      AND snome.owner_id=${id})
      `);
      await db.none(`DELETE FROM match WHERE snome_user_id=${id}`);
      await db.none(`
        DELETE FROM match
        WHERE EXISTS (SELECT * FROM snome
                      WHERE snome.id=match.snome_id
                      AND snome.owner_id=${id})
      `);
      await db.none(`
        DELETE FROM snome_like
        WHERE EXISTS (SELECT * FROM snome
                      WHERE snome.id=snome_like.snome_id
                      AND snome.owner_id=${id})
      `);
      await db.none(`DELETE FROM snome_like WHERE snome_user_id=${id}`);
      await db.none(`DELETE FROM snome WHERE owner_id=${id}`);
      await db.none(
        `DELETE FROM message WHERE sender_id=${id} OR recipient_id=${id}`
      );
      await db.none(`DELETE FROM snome_user WHERE id=${id}`);
      return "Delete Successful";
    } catch (err) {
      console.log(`DATABASE ERROR - DELETE: ${err}`);
      return err;
    }
  },
};
