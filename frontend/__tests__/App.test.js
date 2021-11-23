import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

import {render, fireEvent, screen} from '@testing-library/react-native'


xtest('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders visible components', async () => {
  const { findByText, findAllByText } = render(<App/>);
  const button = await findByText('Likes');
})