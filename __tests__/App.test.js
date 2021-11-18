import React from 'react';
import renderer from 'react-test-renderer';
// import { StyleSheet, Text, View } from 'react-native';


import App from '../App';

// jest.mock('react-native', () => {
//   return {
//     StyleSheet: {
//       create: {() => ({})},
//     },
//   };
// });

// jest.mock('react-native', () => ({
//   StyleSheet: {
//     create: function () { return "" }
//   }
// }))

describe('<App />', () => {
  // it('has 2 children', () => {
  //   const tree = renderer.create(<App />).toJSON();
  //   expect(tree.children.length).toBe(2);
  // });

  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
