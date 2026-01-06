import { z } from 'zod';

// Domain schemas kept intentionally permissive to avoid tight coupling.
// Extend as backend contracts stabilize.

export const Id = z.union([z.string(), z.number()]);

export const ArtistSchema = z
  .object({
    id: Id,
    name: z.string().min(1).optional(),
    role: z.string().optional(),
    avatarUrl: z.string().url().optional(),
    bio: z.string().optional(),
  })
  .passthrough();
export type Artist = z.infer<typeof ArtistSchema>;

export const GalleryItemSchema = z
  .object({
    id: Id,
    src: z.string().min(1),
    alt: z.string().default(''),
    width: z.number().optional(),
    height: z.number().optional(),
    tags: z.array(z.string()).default([]),
  })
  .passthrough();
export type GalleryItem = z.infer<typeof GalleryItemSchema>;

export const TestimonialSchema = z
  .object({
    id: Id,
    author: z.string().optional(),
    quote: z.string().min(1),
    rating: z.number().min(0).max(5).optional(),
    avatarUrl: z.string().url().optional(),
  })
  .passthrough();
export type Testimonial = z.infer<typeof TestimonialSchema>;

export const ContactPayloadSchema = z.any();
export type ContactPayload = z.infer<typeof ContactPayloadSchema>;

export const ContactResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
export type ContactResponse = z.infer<typeof ContactResponseSchema>;
