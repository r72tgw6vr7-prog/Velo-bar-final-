import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '@/components/atoms/Checkbox.tsx';

describe('Checkbox atom', () => {
  it('renders with label and required asterisk', () => {
    render(<Checkbox label='Accept' required />);
    expect(screen.getByLabelText('Accept*')).toBeInTheDocument();
  });

  it('shows helper when no error and hides when error present', () => {
    const { rerender } = render(<Checkbox label='Opt-in' helper='Optional' />);
    expect(screen.getByText('Optional')).toBeInTheDocument();

    rerender(<Checkbox label='Opt-in' error='Invalid' helper='Optional' />);
    expect(screen.queryByText('Optional')).toBeNull();
    expect(screen.getByText('Invalid')).toBeInTheDocument();
  });

  it('fires change on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox label='Agree' />);
    const input = screen.getByRole('checkbox');
    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });
});
