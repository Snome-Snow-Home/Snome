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

  deleteLike: async ({ snome_id, snome_user_id }) => {
    try {
      await db.none(`DELETE FROM snome_like WHERE snome_user_id=${snome_user_id} AND snome_id=${snome_id}`);
    } catch (error) {
      console.log(`DATABASE ERROR - DELETE: ${error}`);
      return error;
    }
  },

  deleteMatch: async ({ snome_id, snome_user_id }, match_id) => {
    try {
      const odd = match_id % 2;
      console.log(odd);
      switch (odd) {
        case 0:
          id = match_id - 1;
          break;
      
        default:
          id = match_id + 1;
          break;
      }
      await db.none(`DELETE FROM match WHERE user_id=$1 AND snome_id=$2`, [snome_user_id, snome_id]);
      await db.none(`DELETE FROM match WHERE id = ${id}`); 
    } catch (error) {
      console.log(`DATABASE ERROR - DELETE: ${error}`);
      return error;
    }
  },

  // deleteUser: async (id) => {
  //   try {
  //     await db.none(`
  //       DELETE FROM review
  //       WHERE EXISTS (SELECT * FROM snome
  //                     WHERE snome.id=review.snome_id
  //                     AND snome.owner_id=${id})
  //     `);
  //     await db.none(`DELETE FROM review WHERE snome_user_id=${id}`);
  //     await db.none(`
  //       DELETE FROM snome_photo
  //       WHERE EXISTS (SELECT * FROM snome
  //                     WHERE snome.id=snome_photo.snome_id
  //                     AND snome.owner_id=${id})
  //     `);
  //     await db.none(`
  //       DELETE FROM trip
  //       WHERE EXISTS (SELECT * FROM snome
  //                     WHERE snome.id=trip.snome_id
  //                     AND snome.owner_id=${id})
  //     `);
  //     await db.none(`DELETE FROM match WHERE snome_user_id=${id}`);
  //     await db.none(`
  //       DELETE FROM match
  //       WHERE EXISTS (SELECT * FROM snome
  //                     WHERE snome.id=match.snome_id
  //                     AND snome.owner_id=${id})
  //     `);
  //     await db.none(`
  //       DELETE FROM snome_like
  //       WHERE EXISTS (SELECT * FROM snome
  //                     WHERE snome.id=snome_like.snome_id
  //                     AND snome.owner_id=${id})
  //     `);
  //     await db.none(`DELETE FROM snome_like WHERE snome_user_id=${id}`);
  //     await db.none(`DELETE FROM snome WHERE owner_id=${id}`);
  //     await db.none(
  //       `DELETE FROM message WHERE sender_id=${id} OR recipient_id=${id}`
  //     );
  //     await db.none(`DELETE FROM snome_user WHERE id=${id}`);
  //     return "Delete Successful";
  //   } catch (err) {
  //     console.log(`DATABASE ERROR - DELETE: ${err}`);
  //     return err;
  //   }
  // },



  //need to work on this need snome_user_id and snome_id
  // deleteLike: async() => {
  //   await db.none(`DELETE FROM snome_like WHERE snome_user_id=${id}`);
  // }
};
