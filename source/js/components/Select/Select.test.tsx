import { fireEvent, render } from '@testing-library/react';
import { Select } from '.';

it('renders select with label text', () => {
  const options = [{ label: 'Default', value: '' }];

  const { getByText } = render(
    <Select id="checkbox" label="MyLabel" onChange={jest.fn()} value="" options={options} />,
  );
  const element = getByText(/MyLabel/i);

  expect(element).toBeVisible();
});

it('renders options', () => {
  const options = [
    { label: 'Default', value: '' },
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];

  const { container } = render(
    <Select id="checkbox" label="MyLabel" onChange={jest.fn()} value="" options={options} />,
  );

  expect(container.querySelectorAll('option')).toHaveLength(3);
});

it('calls onChange prop when value changes', () => {
  const handleChange = jest.fn();
  const options = [
    { label: 'Default', value: '' },
    { label: 'Option 1', value: 'option1' },
  ];

  const { container } = render(
    <Select id="checkbox" label="MyLabel" onChange={handleChange} value="" options={options} />,
  );
  fireEvent.change(container.querySelector('select') as HTMLElement, { target: { value: 'option1' } });

  expect(handleChange).toHaveBeenCalledTimes(1);
});
