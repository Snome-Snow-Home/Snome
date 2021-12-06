import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

import {render, fireEvent, screen} from '@testing-library/react-native'

jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

//mock fetch calls
const MOCK_HOMESCREEN_DATA = [
  {
    active: true,
    city: "Vail",
    cover_image: "dfs",
    description: "Nice ski resort",
    featured: true,
    id: 1,
    latitude: -106.3981,
    links: "https://www.vail.com/",
    longitude: 39.641033,
    name: "Vail Ski Resort",
    notable_features: "the third-largest single-mountain ski resort in the United States",
    state: "Colorado",
  },
];

global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve(MOCK_HOMESCREEN_DATA),
  })
})


xtest('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders visible components', async () => {
  const { findByText, findAllByText } = render(<App/>);
  const button = await findByText('Likes');
})
