import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      role: z.enum(['developer', 'product-manager', 'both']),
      stack: z.array(z.string()).default([]),
      coverImage: image(),
      coverImageAlt: z.string(),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
          })
        )
        .optional(),
      links: z
        .object({
          live: z.string().url().optional(),
          demo: z.string().url().optional(),
          repo: z.string().url().optional(),
        })
        .optional(),
      order: z.number().default(0),
      date: z.coerce.date(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
