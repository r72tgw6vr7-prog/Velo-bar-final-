/**
 * SECURE FORM EXAMPLE
 *
 * Example of how to implement a form with CSRF protection and rate limiting.
 * Use this as a reference for updating existing forms in the application.
 */

import React, { useState } from 'react';
import { csrfFetch } from '@/lib/csrfHelper';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function SecureFormExample() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Use csrfFetch which automatically handles CSRF tokens
      const response = await csrfFetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(data.message || 'Submission failed');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='mx-auto max-w-md rounded-lg bg-white p-8 shadow-md'>
      <h2 className='mb-8 text-2xl font-bold'>Secure Contact Form</h2>

      {success && (
        <div className='mb-8 rounded bg-green-100 p-0 text-green-700'>
          Message sent successfully!
        </div>
      )}

      {error && <div className='mb-8 rounded bg-red-100 p-0 text-red-700'>{error}</div>}

      <form onSubmit={handleSubmit} className='space-y-8'>
        <div>
          <label htmlFor='name' className='mb-0 block text-sm font-medium'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='focus:ring-accent-primary w-full rounded border px-0 py-0 focus:ring-2'
          />
        </div>

        <div>
          <label htmlFor='email' className='mb-0 block text-sm font-medium'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='focus:ring-accent-primary w-full rounded border px-0 py-0 focus:ring-2'
          />
        </div>

        <div>
          <label htmlFor='message' className='mb-0 block text-sm font-medium'>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className='focus:ring-accent-primary w-full rounded border px-0 py-0 focus:ring-2'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='bg-accent-primary hover:bg-accent-primary-hover w-full rounded px-8 py-0 text-white transition duration-200 ease-out disabled:cursor-not-allowed disabled:bg-gray-400'
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <div className='mt-8 text-xs text-gray-500'>
        <p>This form is protected by:</p>
        <ul className='mt-0 ml-8 list-disc'>
          <li>Rate limiting (20 requests per 15 minutes)</li>
          <li>CSRF protection (automatic token validation)</li>
          <li>Input validation and sanitization</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * ALTERNATIVE: Using the React Hook
 *
 * If you need more control over the CSRF token lifecycle:
 */

import { useCsrfToken } from '@/lib/csrfHelper';

export function SecureFormWithHook() {
  const { token, loading: tokenLoading, error: tokenError, refreshToken } = useCsrfToken();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      console.error('No CSRF token available');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch('/api/contact', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // eslint-disable-next-line no-console -- dev-only confirmation that secure form hook integration works
        console.log('Form submitted successfully');
        refreshToken(); // Get new token for next submission
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (tokenLoading) {
    return <div>Loading security token...</div>;
  }

  if (tokenError) {
    return <div>Error loading security token. Please refresh the page.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type='submit' disabled={submitting}>
        Submit
      </button>
    </form>
  );
}

export default SecureFormExample;
