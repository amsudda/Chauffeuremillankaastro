import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space:       import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

export interface BlogPost {
  slug:        string;
  title:       string;
  excerpt:     string;
  coverImage:  string;
  publishedAt: string;
  category:    string;
  readTime:    string;
  body:        any; // Contentful rich text document
  tags:        string[];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'post',
      order:        ['-sys.createdAt'] as any,
    });
    return entries.items.map(mapPost);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'post',
      'fields.slog': slug,
      limit: 1,
    });
    if (!entries.items.length) return null;
    return mapPost(entries.items[0]);
  } catch {
    return null;
  }
}

function mapPost(item: any): BlogPost {
  const f = item.fields;
  return {
    slug:        f.slog ?? '',
    title:       f.title ?? '',
    excerpt:     f.excerpt ?? '',
    coverImage:  f.coverImage?.fields?.file?.url
                   ? `https:${f.coverImage.fields.file.url}`
                   : '',
    publishedAt: item.sys.createdAt,
    category:    f.language ?? 'English',
    readTime:    '5 min read',
    body:        f.content ?? null,
    tags:        f.keywords ?? [],
  };
}
