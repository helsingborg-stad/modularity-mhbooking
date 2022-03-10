import { fireEvent, render } from '@testing-library/react';
import { Checkbox } from '.';

it('renders the checkbox with label text', () => {
  const handleChange = jest.fn();

  const { container } = render(<Checkbox id="checkbox" label="MyLabel" checked={false} onChange={handleChange} />);

  expect(container).toHaveTextContent('MyLabel');
});

it('propagates checked prop set to "true"', () => {
  const handleChange = jest.fn();

  const { getByText, container } = render(
    <Checkbox id="checkbox" label="MyLabel" checked={true} onChange={handleChange} />,
  );
  fireEvent.click(getByText(/MyLabel/i));

  expect(container.querySelector('input')!).toBeChecked();
});

it('propagates checked prop set to "false"', () => {
  const handleChange = jest.fn();

  const { getByText, container } = render(
    <Checkbox id="checkbox" label="MyLabel" checked={false} onChange={handleChange} />,
  );
  fireEvent.click(getByText(/MyLabel/i));

  expect(container.querySelector('input')!).not.toBeChecked();
});

it('calls the onChange prop when clicked', () => {
  const handleChange = jest.fn();

  const { getByText } = render(<Checkbox id="checkbox" label="MyLabel" checked={false} onChange={handleChange} />);
  fireEvent.click(getByText(/MyLabel/i));

  expect(handleChange).toHaveBeenCalledTimes(1);
});
