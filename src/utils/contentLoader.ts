/**
 * Content Loader Utility
 * Loads and parses content from /content/*.md files
 * Single source of truth: /content/ directory
 */

// Content file map
export const contentFiles = {
  home: () => import('../../content/home.md?raw'),
  about: () => import('../../content/about.md?raw'),
  munichBooking: () => import('../../content/munich-booking.md?raw'),
  drinksMenu: () => import('../../content/drinks-menu.md?raw'),
  siteArchitecture: () => import('../../content/site-architecture.md?raw'),
} as const;

export type ContentKey = keyof typeof contentFiles;

/**
 * Load raw markdown content from content files
 */
export async function loadContent(key: ContentKey): Promise<string> {
  const loader = contentFiles[key];
  const module = (await loader()) as any;
  return typeof module === 'string' ? module : module.default || '';
}

/**
 * Parse markdown content (basic parser - can be enhanced with a proper MD parser)
 */
export function parseMarkdown(content: string) {
  const lines = content.split('\n');
  const sections: Record<string, any> = {};
  let currentSection = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    // Check for section headers (## Section Name)
    if (line.startsWith('## ')) {
      if (currentSection) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      currentSection = line.replace('## ', '').trim();
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  }

  // Add last section
  if (currentSection) {
    sections[currentSection] = currentContent.join('\n').trim();
  }

  return sections;
}

/**
 * Helper to extract specific content patterns
 */
export function extractPatterns(content: string) {
  // Extract links: [text](url)
  const links = Array.from(content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)).map((match) => ({
    text: match[1],
    url: match[2],
  }));

  // Extract bold text: **text**
  const boldText = Array.from(content.matchAll(/\*\*([^*]+)\*\*/g)).map((match) => match[1]);

  // Extract lists: - item or * item
  const listItems = content
    .split('\n')
    .filter((line) => line.trim().startsWith('-') || line.trim().startsWith('*'))
    .map((line) => line.trim().replace(/^[-*]\s+/, ''));

  return { links, boldText, listItems };
}

/**
 * Load brand configuration
 */
export async function loadBrandConfig() {
  const brandModule = await import('../../brand.json');
  return brandModule.default || brandModule;
}
