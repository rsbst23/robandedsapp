import { render } from '@testing-library/react';
import { expect } from 'vitest';
import { createElement } from 'react';
import Checkout from './Checkout';


it('renders Checkout component', () => {
  const { getByText } = render(createElement(Checkout));
  expect(getByText('Checkout')).toBeInTheDocument();
});


