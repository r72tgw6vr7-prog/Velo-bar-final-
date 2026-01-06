import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { csrfFetch } from '@/lib/csrfHelper';

// WARNING: This component should NOT be included in production builds
// For development/testing only. Use proper authentication in production.
const CREDENTIALS = {
  email: import.meta.env.VITE_ADMIN_EMAIL || '',
  password: import.meta.env.VITE_ADMIN_PASSWORD || '',
};

interface ImageItem {
  id: string;
  url: string;
  category: string;
  uploadedDate: string;
}

export function AdminUploadPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('portfolio');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Ungültige Anmeldedaten');
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      setError('');

      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          // Create form data for the file
          const formData = new FormData();
          formData.append('file', file);

          // Upload to Vercel Blob
          const response = await csrfFetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) throw new Error('Upload fehlgeschlagen');

          const { url } = await response.json();

          // Create new image entry
          const newImage: ImageItem = {
            id: uuidv4(),
            url,
            category,
            uploadedDate: new Date().toISOString(),
          };

          // Update manifest
          const manifestResponse = await csrfFetch('/api/update-manifest', {
            method: 'POST',
            body: JSON.stringify({ image: newImage }),
          });

          if (!manifestResponse.ok) throw new Error('Manifest Update fehlgeschlagen');

          return newImage;
        });

        await Promise.all(uploadPromises);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload fehlgeschlagen');
      } finally {
        setUploading(false);
      }
    },
    [category],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    disabled: uploading,
  });

  if (!isLoggedIn) {
    return (
      <div className='border-brand-primary/20 mx-auto mt-8 max-w-md rounded-lg border-2 bg-linear-to-br from-gray-800 to-gray-900 p-8'>
        <h2 className='mb-8 text-2xl font-bold text-[var(--brand-primary)]'>Admin Login</h2>
        <form onSubmit={handleLogin} className='space-y-8'>
          <div>
            <label className='mb-0 block text-sm font-medium text-gray-200'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='focus:border-brand-primary w-full rounded-md border border-gray-600 bg-gray-700 px-0 py-0 text-white focus:outline-none'
              placeholder='admin@velo.bar'
              aria-label='Email address'
            />
          </div>
          <div>
            <label className='mb-0 block text-sm font-medium text-gray-200'>Passwort</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='focus:border-brand-primary w-full rounded-md border border-gray-600 bg-gray-700 px-0 py-0 text-white focus:outline-none'
              placeholder='••••••••'
              aria-label='Password'
            />
          </div>
          {error && <p className='text-sm text-red-400'>{error}</p>}
          <button
            type='submit'
            className='bg-brand-primary hover:bg-accent-primary-hover w-full rounded-md px-8 py-0 font-medium text-black transition duration-200 ease-out'
          >
            Anmelden
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className='border-brand-primary/20 mx-auto mt-8 max-w-4xl rounded-lg border-2 bg-linear-to-br from-gray-800 to-gray-900 p-8'>
      <div className='mb-8 flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-[var(--brand-primary)]'>Fotos hochladen</h2>
        <button
          onClick={() => setIsLoggedIn(false)}
          className='text-gray-400 transition duration-200 ease-out hover:text-white'
        >
          Abmelden
        </button>
      </div>

      <div className='mb-8'>
        <label className='mb-0 block text-sm font-medium text-gray-200'>Kategorie</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='focus:border-brand-primary w-full rounded-md border border-gray-600 bg-gray-700 px-0 py-0 text-white focus:outline-none'
          aria-label='Select category'
        >
          <option value='portfolio'>Portfolio</option>
          <option value='assets'>Assets</option>
          <option value='studio'>Studio</option>
        </select>
      </div>

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragActive ? 'border-brand-primary bg-brand-primary/10' : 'hover:border-brand-primary/50 border-gray-600'} ${uploading ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center gap-0'>
          {uploading ? (
            <>
              <Loader2 className='text-brand-primary h-10 w-10 animate-spin' />
              <Loader2 className='text-brand-primary h-10 w-10 animate-spin' />
              <Loader2 className='text-brand-primary h-10 w-10 animate-spin' />
              <Loader2 className='text-brand-primary h-10 w-10 animate-spin' />
              <p className='text-gray-300'>Hochladen...</p>
            </>
          ) : (
            <>
              {isDragActive ? (
                <>
                  <Upload className='text-brand-primary h-10 w-10' />
                  <p className='text-brand-primary'>Fotos hier ablegen...</p>
                </>
              ) : (
                <>
                  <ImageIcon className='h-10 w-10 text-gray-400' />
                  <p className='text-gray-300'>Fotos hierher ziehen oder klicken zum Auswählen</p>
                  <p className='text-sm text-gray-400'>JPG, PNG oder WEBP</p>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {error && (
        <div className='mt-8 rounded-md border border-red-500/20 bg-red-500/10 p-0'>
          <p className='text-sm text-red-400'>{error}</p>
        </div>
      )}
    </div>
  );
}

export default AdminUploadPanel;
