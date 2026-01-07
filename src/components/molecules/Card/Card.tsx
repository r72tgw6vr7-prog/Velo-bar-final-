/**
 * BACKWARD COMPATIBILITY WRAPPER
 * ================================
 *
 * This file is a compatibility wrapper that re-exports the Card component
 * from atoms/Card. The original molecules/Card has been consolidated into
 * atoms/Card to eliminate duplication.
 *
 * This wrapper ensures that any existing imports from molecules/Card
 * continue to work without breaking changes.
 *
 * Migration Path:
 * 1. Phase 1: This wrapper provides backward compatibility (CURRENT)
 * 2. Phase 2: Update imports to use atoms/Card directly
 * 3. Phase 3: Remove this wrapper file (future cleanup sprint)
 *
 * @deprecated Use '@/components/atoms/Card' instead
 * @see '@/components/atoms/Card'
 * @see CONSOLIDATION_ANALYSIS.md for details
 */

// Import the consolidated atoms Card component and re-export its slots
import CardDefault from '@/components/atoms/Card';

// Named re-exports for backward compatibility (preserve molecules API)
export const Card = CardDefault;
export const CardHeader = CardDefault.Header;
export const CardContent = CardDefault.Body;
export const CardFooter = CardDefault.Footer;

// Default export for backward compatibility
export default CardDefault;
