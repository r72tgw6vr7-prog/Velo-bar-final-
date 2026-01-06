/**
 * jscodeshift Transform: Convert div-based cards to Card primitive
 * ================================================================
 *
 * Purpose: Automatically refactor card-like divs to use the design-system
 * compliant Card primitive component.
 *
 * Usage:
 *   npx jscodeshift -t codemods/transform-cards.js src/components/
 *   npx jscodeshift -t codemods/transform-cards.js --dry --print src/components/TeamGrid.tsx
 *
 * What it does:
 * 1. Finds divs with card-like classes (rounded, border, shadow, bg-)
 * 2. Checks if div is inside a grid parent
 * 3. Wraps content in Card.Header/Body/Footer slots
 * 4. Adds import for Card primitive
 * 5. Preserves all existing content and structure
 */

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let hasModifications = false;

  // ============================================
  // Helper: Check if element has card-like classes
  // ============================================
  function hasCardClasses(node) {
    const className = getClassName(node);
    if (!className) return false;

    const cardIndicators = ['rounded', 'border', 'shadow', 'bg-'];
    return cardIndicators.some((indicator) => className.includes(indicator));
  }

  // ============================================
  // Helper: Extract className value
  // ============================================
  function getClassName(node) {
    if (!node.openingElement || !node.openingElement.attributes) return '';

    const classAttr = node.openingElement.attributes.find((attr) => {
      return (
        attr.type === 'JSXAttribute' &&
        attr.name &&
        (attr.name.name === 'className' || attr.name.name === 'class')
      );
    });

    if (!classAttr || !classAttr.value) return '';

    // Handle string literal
    if (classAttr.value.type === 'Literal') {
      return classAttr.value.value || '';
    }

    // Handle JSXExpressionContainer with string
    if (classAttr.value.type === 'JSXExpressionContainer') {
      const expr = classAttr.value.expression;
      if (expr.type === 'Literal') return expr.value || '';
      if (expr.type === 'TemplateLiteral' && expr.quasis.length === 1) {
        return expr.quasis[0].value.cooked || '';
      }
    }

    return '';
  }

  // ============================================
  // Helper: Check if parent is a grid
  // ============================================
  function hasGridParent(path) {
    let current = path.parent;
    let depth = 0;

    while (current && depth < 5) {
      if (current.value && current.value.type === 'JSXElement') {
        const className = getClassName(current.value);
        if (className && (className.includes('grid') || /grid-cols-\d+/.test(className))) {
          return true;
        }
      }
      current = current.parent;
      depth++;
    }

    return false;
  }

  // ============================================
  // Helper: Split children into slots
  // ============================================
  function categorizeChildren(children) {
    const header = [];
    const body = [];
    const footer = [];

    let currentSection = 'header';

    children.forEach((child, idx) => {
      // Skip whitespace-only text nodes
      if (child.type === 'JSXText' && !child.value.trim()) return;

      // Heuristic: buttons/links at the end go to footer
      if (idx >= children.length - 2 && isInteractiveElement(child)) {
        currentSection = 'footer';
        footer.push(child);
        return;
      }

      // Heuristic: h1-h6, images at start go to header
      if (currentSection === 'header' && (isHeading(child) || isImage(child))) {
        header.push(child);
        return;
      }

      // After header elements, switch to body
      if (currentSection === 'header' && (header.length > 0 || idx > 1)) {
        currentSection = 'body';
      }

      // Everything else goes to current section
      if (currentSection === 'header') header.push(child);
      else if (currentSection === 'footer') footer.push(child);
      else body.push(child);
    });

    return { header, body, footer };
  }

  // ============================================
  // Helper: Check element types
  // ============================================
  function isHeading(node) {
    return (
      node.type === 'JSXElement' &&
      node.openingElement.name.name &&
      /^h[1-6]$/i.test(node.openingElement.name.name)
    );
  }

  function isImage(node) {
    return node.type === 'JSXElement' && node.openingElement.name.name === 'img';
  }

  function isInteractiveElement(node) {
    if (node.type !== 'JSXElement') return false;
    const name = node.openingElement.name.name;
    return name === 'button' || name === 'a' || name === 'Link';
  }

  // ============================================
  // Helper: Build Card component
  // ============================================
  function buildCardComponent(slots, originalClassName) {
    const { header, body, footer } = slots;

    // Determine variant from original classes
    let variant = 'default';
    if (originalClassName.includes('shadow-lg') || originalClassName.includes('shadow-xl')) {
      variant = 'elevated';
    } else if (
      originalClassName.includes('border-2') ||
      originalClassName.includes('border-[#D4AF37]')
    ) {
      variant = 'outlined';
    } else if (originalClassName.includes('backdrop-blur')) {
      variant = 'glass';
    }

    // Build Card children with slots
    const cardChildren = [];

    if (header.length > 0) {
      cardChildren.push(
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(j.jsxIdentifier('Card'), j.jsxIdentifier('Header')),
            [],
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(j.jsxIdentifier('Card'), j.jsxIdentifier('Header')),
          ),
          header,
        ),
      );
    }

    if (body.length > 0) {
      cardChildren.push(
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(j.jsxIdentifier('Card'), j.jsxIdentifier('Body')),
            [],
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(j.jsxIdentifier('Card'), j.jsxIdentifier('Body')),
          ),
          body,
        ),
      );
    }

    if (footer.length > 0) {
      cardChildren.push(
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(j.jsxIdentifier('Card'), j.jsxIdentifier('Footer')),
            [],
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(j.jsxIdentifier('Card'), j.jsxIdentifier('Footer')),
          ),
          footer,
        ),
      );
    }

    // Build Card attributes
    const attributes = [
      j.jsxAttribute(j.jsxIdentifier('variant'), j.literal(variant)),
      j.jsxAttribute(j.jsxIdentifier('hover'), j.jsxExpressionContainer(j.literal(true))),
    ];

    return j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier('Card'), attributes),
      j.jsxClosingElement(j.jsxIdentifier('Card')),
      cardChildren,
    );
  }

  // ============================================
  // Helper: Add import if missing
  // ============================================
  function ensureCardImport() {
    const imports = root.find(j.ImportDeclaration, {
      source: { value: '@/components/primitives/Card' },
    });

    if (imports.length === 0) {
      // Check alternative paths
      const altImports = root.find(j.ImportDeclaration, {
        source: { value: './primitives/Card' },
      });

      if (altImports.length === 0) {
        // Add import at top of file
        const cardImport = j.importDeclaration(
          [j.importSpecifier(j.identifier('Card'))],
          j.literal('@/components/primitives/Card'),
        );

        // Find first import or add at top
        const firstImport = root.find(j.ImportDeclaration).at(0);
        if (firstImport.length > 0) {
          firstImport.insertBefore(cardImport);
        } else {
          root.get().node.program.body.unshift(cardImport);
        }
      }
    }
  }

  // ============================================
  // Main Transform Logic
  // ============================================
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: 'div' } },
    })
    .forEach((path) => {
      const node = path.value;

      // Check if this div looks like a card
      if (!hasCardClasses(node)) return;

      // Check if it's inside a grid
      if (!hasGridParent(path)) return;

      // Check if it already has flex flex-col h-full (already fixed)
      const className = getClassName(node);
      if (
        className.includes('flex') &&
        className.includes('flex-col') &&
        className.includes('h-full')
      ) {
        return; // Already compliant, skip
      }

      // Extract and categorize children
      const children = node.children || [];
      const slots = categorizeChildren(children);

      // Only transform if we have meaningful content
      if (slots.header.length === 0 && slots.body.length === 0 && slots.footer.length === 0) {
        return;
      }

      // Build new Card component
      const cardElement = buildCardComponent(slots, className);

      // Replace the div with Card
      j(path).replaceWith(cardElement);
      hasModifications = true;
    });

  // ============================================
  // Add import if we made changes
  // ============================================
  if (hasModifications) {
    ensureCardImport();
  }

  return hasModifications ? root.toSource({ quote: 'single' }) : null;
};
