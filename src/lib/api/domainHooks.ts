import { useMemo } from 'react';
import { ep } from './endpoints';
import { useApiQuery, useApiMutation } from './hooks';
import { withQuery, type PageParams } from './pagination';
import {
  ArtistSchema,
  GalleryItemSchema,
  TestimonialSchema,
  ContactPayloadSchema,
  ContactResponseSchema,
  type Artist,
  type GalleryItem,
  type Testimonial,
  type ContactPayload,
  type ContactResponse,
} from './schemas';

// ARTISTS
export function useArtists(params?: PageParams) {
  const url = withQuery(ep.artists(), params);
  const q = useApiQuery<unknown>('artists', url, {
    staleTime: 10 * 60_000, // 10m
    revalidateOnMount: true,
  });
  const data = useMemo(() => {
    if (!q.data) return undefined;
    const parsed = ArtistSchema.array().safeParse(q.data);
    return parsed.success ? (parsed.data as Artist[]) : undefined;
  }, [q.data]);
  return { ...q, data } as Omit<typeof q, 'data'> & { data: Artist[] | undefined };
}

// SESSION
export function useSession() {
  const q = useApiQuery<unknown>('me', ep.me());
  // Pass-through unknown; AuthProvider normalizes via authClient already
  return q;
}

export function useArtist(id: string | number) {
  const key = ['artist', String(id)];
  const q = useApiQuery<unknown>(key, ep.artistById(id), {
    staleTime: 10 * 60_000,
    revalidateOnMount: true,
  });
  const data = useMemo(() => {
    if (!q.data) return undefined;
    const parsed = ArtistSchema.safeParse(q.data);
    return parsed.success ? (parsed.data as Artist) : undefined;
  }, [q.data]);
  return { ...q, data } as Omit<typeof q, 'data'> & { data: Artist | undefined };
}

// GALLERY
export function useGallery(tag?: string, params?: PageParams) {
  const key = ['gallery', tag ?? 'all', params ? JSON.stringify(params) : ''];
  const url = withQuery(ep.gallery(), { ...(params || {}), ...(tag ? { tag } : {}) });
  const q = useApiQuery<unknown>(key, url, {
    staleTime: 5 * 60_000, // 5m
    revalidateOnMount: true,
  });
  const data = useMemo(() => {
    if (!q.data) return undefined;
    const parsed = GalleryItemSchema.array().safeParse(q.data);
    return parsed.success ? (parsed.data as GalleryItem[]) : undefined;
  }, [q.data]);
  return { ...q, data } as Omit<typeof q, 'data'> & { data: GalleryItem[] | undefined };
}

// TESTIMONIALS
export function useTestimonials(params?: PageParams) {
  const url = withQuery(ep.testimonials(), params);
  const q = useApiQuery<unknown>('testimonials', url, {
    staleTime: 24 * 60 * 60_000, // 24h
    revalidateOnMount: true,
  });
  const data = useMemo(() => {
    if (!q.data) return undefined;
    const parsed = TestimonialSchema.array().safeParse(q.data);
    return parsed.success ? (parsed.data as Testimonial[]) : undefined;
  }, [q.data]);
  return { ...q, data } as Omit<typeof q, 'data'> & { data: Testimonial[] | undefined };
}

// CONTACT
export function useSendContact(options?: {
  onSuccess?: (data: ContactResponse) => void;
  onError?: (error: Error) => void;
}) {
  const m = useApiMutation<ContactResponse, ContactPayload>(ep.contact(), 'post', {
    onSuccess: options?.onSuccess,
    onError: (e) => options?.onError?.(e as Error),
  });

  // Validate payload before sending to reduce 4xxs
  const mutate = async (payload: ContactPayload) => {
    const parsedPayload = ContactPayloadSchema.safeParse(payload);
    if (!parsedPayload.success) {
      throw new Error('Invalid contact payload');
    }
    const res = await m.mutate(parsedPayload.data);
    const parsedRes = ContactResponseSchema.safeParse(res);
    if (!parsedRes.success) {
      throw new Error('Unexpected contact response');
    }
    return parsedRes.data;
  };

  return { ...m, mutate };
}
