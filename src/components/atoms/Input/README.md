# Input Component

A comprehensive design-system-compliant input component with accessibility, validation, and theming support.

## Features

- Full accessibility support
- Icon support (left or right)
- Validation states (error, success)
- Helper text
- Label support
- Consistent styling with design tokens
- Custom styles via className
- Required field indicator
- Dark/light theme support
- Focus state management
- TypeScript support

## Usage

### Basic Usage

```tsx
import { Input } from '../components/atoms/Input';

function MyForm() {
  return (
    <Input id='email' label='Email Address' type='email' placeholder='Enter your email' required />
  );
}
```

### With Validation

```tsx
import { Input } from '../components/atoms/Input';
import { useState } from 'react';

function MyForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    if (!value.includes('@')) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };

  return (
    <Input
      id='email'
      label='Email Address'
      type='email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={(e) => validateEmail(e.target.value)}
      error={error}
      validationState={error ? 'error' : 'default'}
      required
    />
  );
}
```

### With Icon

```tsx
import { Input } from '../components/atoms/Input';
import { Mail } from 'lucide-react';

function MyForm() {
  return (
    <Input
      id='email'
      label='Email Address'
      type='email'
      placeholder='Enter your email'
      icon={<Mail size={16} />}
      iconPosition='left'
    />
  );
}
```

### Different Sizes and Variants

```tsx
import { Input } from '../components/atoms/Input';

function MyForm() {
  return (
    <>
      <Input id='input-sm' label='Small Input' size='sm' variant='default' />

      <Input id='input-md' label='Medium Input' size='md' variant='filled' />

      <Input id='input-lg' label='Large Input' size='lg' variant='outlined' />

      <Input id='input-ghost' label='Ghost Input' variant='ghost' />
    </>
  );
}
```

### Light Theme

```tsx
import { Input } from '../components/atoms/Input';

function MyForm() {
  return (
    <div className='bg-white p-8'>
      <Input id='email' label='Email Address' colorScheme='light' />
    </div>
  );
}
```

## Props

| Prop              | Type                 | Default    | Description                                 |
| ----------------- | -------------------- | ---------- | ------------------------------------------- |
| `id`              | string               | _required_ | Unique ID for the input element             |
| `label`           | string               | undefined  | Input label displayed above the input       |
| `error`           | string               | undefined  | Error message shown when validation fails   |
| `helper`          | string               | undefined  | Helper text shown below the input           |
| `icon`            | React.ReactNode      | undefined  | Icon to display within the input            |
| `iconPosition`    | 'left' \| 'right'    | 'left'     | Position of the icon within the input       |
| `fullWidth`       | boolean              | true       | Whether input takes full width of container |
| `size`            | 'sm' \| 'md' \| 'lg' | 'md'       | Size variant of the input                   |
| `variant`         | string               | 'default'  | Visual style variant                        |
| `validationState` | string               | 'default'  | Current validation state                    |
| `colorScheme`     | 'dark' \| 'light'    | 'dark'     | Color theme                                 |
| `required`        | boolean              | false      | Whether the field is required               |
| `disabled`        | boolean              | false      | Whether the field is disabled               |
| ...rest           | InputHTMLAttributes  |            | All standard input attributes               |

## Accessibility

This component follows accessibility best practices:

- Uses proper label and input association with `htmlFor`/`id`
- Includes ARIA attributes for validation states
- Supports keyboard navigation
- Provides visual feedback for focus, hover, and error states
- Required fields are properly marked
- Error messages are associated with inputs via `aria-describedby`

## Migration Notes

This component consolidates functionality from:

- `InputField.tsx`
- `FormInput.tsx`
- `Input.tsx`
- `MedusaInput.tsx`

The original components are still available for backward compatibility but will be deprecated in future versions.
