import MyContext from './MyContext';
import React from 'react';


// const USER_DATA = {

//   user_id: 4,
//   match: {
//     user_id: 6,
//     snome_id: [5, 4]
//   },
//   snome_likes: { //the ones ive liked
//     snome_id: 3
//   },
//   // has_liked_me?? would be cool to see. 'who has liked me?'
// }

class UserProvider extends React.Component {
    state = {
        USER_DATA: {
          user_id: 4,
          match: {
            user_id: 6,
            snome_id: [5, 4]
          },
          snome_likes: {
            snome_id: 3
          },
        }
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    USER_DATA: this.state.USER_DATA,
                    user_id: 6,
                    match: {
                        user_id: 6,
                        snome_id: [5, 4]
                      },
                      snome_likes: {
                        snome_id: 3
                      },
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default UserProvider