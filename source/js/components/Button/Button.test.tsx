import { fireEvent, render } from '@testing-library/react';
import { Button, ButtonType } from '.';

it('renders the button with label text', () => {
  const { container } = render(<Button id="button" label="MyLabel" type="button" />);

  expect(container).toHaveTextContent('MyLabel');
});

it.each([
  ['button', 'button'],
  ['submit', 'submit'],
  ['reset', 'reset'],
  [undefined, 'submit'],
])('renders the button with type "%s"', (value, expected) => {
  const { container } = render(<Button id="button" label="MyLabel" type={value as ButtonType} />);

  const element = container.querySelector('button');

  expect(element?.type).toBe(expected);
});

it('calls the onClick prop when clicked', () => {
  const handleClick = jest.fn();

  const { getByText } = render(<Button id="button" label="MyLabel" type="button" onClick={handleClick} />);
  fireEvent.click(getByText(/MyLabel/i));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
