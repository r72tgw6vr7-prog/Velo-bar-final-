/**
 * eslint-plugin-design-system
 * Custom ESLint rules to enforce this project's design system conventions.
 *
 * Rules:
 * - enforce-8px-spacing
 * - enforce-card-layout
 * - enforce-transitions
 *
 * Fixers:
 * - 8px spacing: rounds simple numeric spacing tokens to nearest 8 (safe-ish heuristic).
 * - card layout: appends "flex flex-col h-full" when missing.
 * - transitions: appends "transition duration-200 ease-out" when missing.
 */

import tailwindConfig from './tailwind.config.mjs';

/**
 * Utility: Extract class string from JSXAttribute value (Literal or TemplateLiteral).
 * Returns { text, isTemplate, node } where text is the raw content.
 */
function getClassTextFromAttribute(attr) {
  const v = attr && attr.value;
  if (!v) return null;

  if (v.type === 'Literal' && typeof v.value === 'string') {
    return { text: v.value, isTemplate: false, node: v };
  }

  if (v.type === 'JSXExpressionContainer' && v.expression) {
    const expr = v.expression;
    if (expr.type === 'Literal' && typeof expr.value === 'string') {
      return { text: expr.value, isTemplate: false, node: expr };
    }
    if (expr.type === 'TemplateLiteral' && expr.quasis && expr.quasis.length === 1) {
      // Only one quasi → no dynamic parts → safe to autofix
      return { text: expr.quasis[0].value.cooked || '', isTemplate: true, node: expr };
    }
  }

  return null; // dynamic/complex → don't attempt modification
}

/**
 * Utility: Replace the attribute value with a given class string.
 */
function makeClassFix(context, attr, newClassText) {
  const v = attr.value;

  if (v.type === 'Literal' && typeof v.value === 'string') {
    // Replace the string literal entirely
    return (fixer) => fixer.replaceText(v, JSON.stringify(newClassText));
  }

  if (v.type === 'JSXExpressionContainer') {
    const expr = v.expression;
    if (expr.type === 'Literal' && typeof expr.value === 'string') {
      return (fixer) => fixer.replaceText(expr, JSON.stringify(newClassText));
    }
    if (expr.type === 'TemplateLiteral' && expr.quasis && expr.quasis.length === 1) {
      // Replace with a string literal for simplicity
      return (fixer) => fixer.replaceText(v, JSON.stringify(newClassText));
    }
  }

  // Fallback: do not fix if shape is complex
  return null;
}

/**
 * Utility: Tokenize Tailwind class string sensibly.
 */
function splitClasses(text) {
  return text
    .split(/\s+/g)
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * Utility: re-join class tokens (preserve simple spacing).
 */
function joinClasses(tokens) {
  return tokens.join(' ');
}

/**
 * Spacing rule helpers
 */
const SPACING_PREFIXES = [
  'p',
  'px',
  'py',
  'pt',
  'pr',
  'pb',
  'pl',
  'm',
  'mx',
  'my',
  'mt',
  'mr',
  'mb',
  'ml',
  'gap',
  'space-x',
  'space-y',
];
function isSpacingToken(tok) {
  const core = tok.split(':').pop() || tok;
  return SPACING_PREFIXES.some((p) => core === p || core.startsWith(p + '-'));
}
function isArbitraryValueToken(tok) {
  return /\[[^\]]+\]/.test(tok);
}

function isAllowedArbitrarySpacingToken(tok) {
  const m = tok.match(/\[([^\]]+)\]/);
  if (!m) return false;
  const v = (m[1] || '').trim();
  return v.startsWith('var(--') || v.startsWith('calc(var(--');
}
function numericSuffix(tok) {
  const core = tok.split(':').pop() || tok;
  const m = core.match(/-(\d+(?:\.\d+)?)(?![a-zA-Z])/);
  return m ? parseFloat(m[1]) : null;
}
function spacingTokenToPx(n) {
  const spacing = tailwindConfig?.theme?.extend?.spacing ?? tailwindConfig?.theme?.spacing;
  const v = spacing ? spacing[String(n)] : undefined;
  if (typeof v === 'string') {
    const m = v.match(/^(-?\d+(?:\.\d+)?)px$/);
    if (m) return parseFloat(m[1]);
  }

  // Tailwind default scale is in 0.25rem steps (4px at 16px root).
  return n * 4;
}
function isMultipleOf8(n) {
  // Enforce multiples of 8px in the rendered result, while allowing 4px as micro-spacing.
  const px = spacingTokenToPx(n);
  if (px === 0 || px === 4) return true;
  return px % 8 === 0;
}
function replaceNumericSuffix(tok, newNum) {
  // replace last -<num> with -<newNum>
  const next = Number.isInteger(newNum) ? String(newNum) : String(newNum);
  return tok.replace(/-(\d+(?:\.\d+)?)(?![a-zA-Z])/, `-${next}`);
}

/**
 * Card rule helpers
 */
const CARD_CUES = ['rounded', 'border', 'shadow', 'bg-'];
const REQUIRED_CARD_CLASSES = ['flex', 'flex-col', 'h-full'];
function isCardLikeElementName(node) {
  const n = node && node.name;
  if (!n) return false;
  // Only enforce on common block-level card containers
  if (n.type === 'JSXIdentifier') {
    return ['div', 'section', 'article', 'li'].includes(n.name);
  }
  return false;
}

function looksLikeCard(text) {
  // Heuristic: a real "card" typically has padding + rounded + a surface cue.
  // This avoids false positives on pills, badges, and small icon circles.
  const hasPadding = /\bp(?:x|y|t|r|b|l)?-\d+\b/.test(text);
  const hasRounded = /\brounded(?:-[^\s]+)?\b/.test(text);
  const hasSurfaceCue = text.includes('border') || text.includes('shadow') || /\bring-/.test(text);

  // Exclusions: common non-card patterns
  if (/\babsolute\b/.test(text)) return false;
  if (/\brounded-full\b/.test(text)) return false;

  // Pills/badges often use inline-block + rounded-full + px-*; treat as non-card
  if (/\binline-block\b/.test(text)) return false;

  // Small fixed-size circles (icons/bullets)
  if (/\bw-\d+\b/.test(text) && /\bh-\d+\b/.test(text) && hasRounded) {
    return false;
  }

  return hasPadding && hasRounded && hasSurfaceCue;
}
function hasAllRequiredCardClasses(text) {
  return REQUIRED_CARD_CLASSES.every((cls) => text.includes(cls));
}

/**
 * Determine whether a JSXElement has 'grid' class in its className/class attribute.
 */
function extractGridInfoFromElement(element) {
  if (!element || element.type !== 'JSXElement') return null;
  for (const attr of element.openingElement.attributes || []) {
    if (attr.type !== 'JSXAttribute') continue;
    if (!attr.name || (attr.name.name !== 'className' && attr.name.name !== 'class')) continue;
    const classInfo = getClassTextFromAttribute(attr);
    if (!classInfo) continue;
    const tokens = splitClasses(classInfo.text);
    let hasGrid = false;
    let hasGridColsToken = false;
    let maxCols = 1;
    for (const token of tokens) {
      const core = token.split(':').pop() || token;
      if (core === 'grid') {
        hasGrid = true;
      }
      const match = core.match(/^grid-cols-(\d+)$/);
      if (match) {
        hasGrid = true;
        hasGridColsToken = true;
        const cols = parseInt(match[1], 10);
        if (!Number.isNaN(cols)) {
          maxCols = Math.max(maxCols, cols);
        }
      }
    }
    if (hasGrid) {
      return { hasGridColsToken, maxCols };
    }
  }
  return null;
}

function findNearestGridAncestor(context) {
  const ancestors = context.getAncestors();
  for (let i = ancestors.length - 1; i >= 0; i--) {
    const a = ancestors[i];
    if (!a || a.type !== 'JSXElement') continue;
    const info = extractGridInfoFromElement(a);
    if (info) return info;
  }
  return null;
}

export default {
  rules: {
    'enforce-8px-spacing': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow Tailwind spacing classes not on 8px scale or arbitrary spacing.',
          recommended: true,
        },
        fixable: 'code',
        messages: {
          arbitrary: "Arbitrary spacing value '{{token}}' is forbidden. Use multiples of 8.",
          non8: "Spacing '{{token}}' is not an 8px multiple. Consider '{{suggest}}'.",
        },
        schema: [],
      },
      create(context) {
        return {
          JSXAttribute(node) {
            if (!node.name || (node.name.name !== 'className' && node.name.name !== 'class'))
              return;
            const classInfo = getClassTextFromAttribute(node);
            if (!classInfo) return;

            const tokens = splitClasses(classInfo.text);

            tokens.forEach((tok, idx) => {
              if (!isSpacingToken(tok)) return;

              const core = tok.split(':').pop() || tok;

              if (/-?(auto|px)$/.test(core)) return; // ignore auto/px tailwind keywords

              if (isArbitraryValueToken(core)) {
                if (isAllowedArbitrarySpacingToken(core)) return;
                context.report({
                  node,
                  messageId: 'arbitrary',
                  data: { token: tok },
                });
                return;
              }

              const n = numericSuffix(core);
              if (n == null) return;
              if (!isMultipleOf8(n)) {
                const rounded = (() => {
                  if (n <= 0) return 0;
                  // Prefer 4px for tiny spacing, but avoid suggesting 0 for small non-zero values.
                  if (n <= 1) return 1;
                  // For 1 < n < 2, snap up to 2 (8px).
                  if (n < 2) return 2;
                  // For >= 8px, snap to nearest 8px (i.e. n multiple of 2).
                  return Math.max(0, Math.round(n / 2) * 2);
                })();
                const suggest = replaceNumericSuffix(core, rounded);
                context.report({
                  node,
                  messageId: 'non8',
                  data: { token: tok, suggest },
                  fix: classInfo.isTemplate
                    ? null // avoid fixing dynamic template literal usage if it might be unsafe
                    : makeClassFix(
                        context,
                        node,
                        (() => {
                          const newTok = replaceNumericSuffix(tok, rounded);
                          const copy = tokens.slice();
                          copy[idx] = newTok;
                          return joinClasses(copy);
                        })(),
                      ),
                });
              }
            });
          },
        };
      },
    },

    'enforce-card-layout': {
      meta: {
        type: 'problem',
        docs: {
          description: "Require 'flex flex-col h-full' on card-like elements inside a grid.",
          recommended: true,
        },
        fixable: 'code',
        messages: {
          missing: "Card-like element in a grid must include 'flex flex-col h-full'.",
        },
        schema: [],
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (!isCardLikeElementName(node)) return;
            // Extract its class
            let classAttr = null;
            for (const attr of node.attributes || []) {
              if (
                attr.type === 'JSXAttribute' &&
                attr.name &&
                (attr.name.name === 'className' || attr.name.name === 'class')
              ) {
                classAttr = attr;
                break;
              }
            }
            if (!classAttr) return;

            const classInfo = getClassTextFromAttribute(classAttr);
            if (!classInfo) return;

            const text = classInfo.text;
            const gridInfo = findNearestGridAncestor(context);
            if (!gridInfo) return;
            if (!gridInfo.hasGridColsToken || gridInfo.maxCols <= 2) return;
            if (!looksLikeCard(text)) return;
            if (hasAllRequiredCardClasses(text)) return;

            const toAppend = REQUIRED_CARD_CLASSES.filter((cls) => !text.includes(cls));
            context.report({
              node: classAttr,
              messageId: 'missing',
              fix: classInfo.isTemplate
                ? null
                : makeClassFix(context, classAttr, (text + ' ' + toAppend.join(' ')).trim()),
            });
          },
        };
      },
    },

    'enforce-transitions': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Elements with hover: classes must include transition and duration.',
          recommended: true,
        },
        fixable: 'code',
        messages: {
          missing: 'Element has hover: styles but is missing transition and/or duration classes.',
        },
        schema: [],
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            let classAttr = null;
            for (const attr of node.attributes || []) {
              if (
                attr.type === 'JSXAttribute' &&
                attr.name &&
                (attr.name.name === 'className' || attr.name.name === 'class')
              ) {
                classAttr = attr;
                break;
              }
            }
            if (!classAttr) return;
            const classInfo = getClassTextFromAttribute(classAttr);
            if (!classInfo) return;

            const text = classInfo.text;
            if (!text.includes('hover:')) return;

            const hasTransition = /\btransition(-all)?\b/.test(text);
            const hasDuration = /\bduration-\d+\b/.test(text);

            if (hasTransition && hasDuration) return;

            // Default fixer adds standard, safe defaults
            context.report({
              node: classAttr,
              messageId: 'missing',
              fix: classInfo.isTemplate
                ? null
                : makeClassFix(
                    context,
                    classAttr,
                    (text + ' transition duration-200 ease-out').trim(),
                  ),
            });
          },
        };
      },
    },
  },
};
