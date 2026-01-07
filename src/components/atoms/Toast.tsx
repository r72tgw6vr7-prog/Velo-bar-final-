/**
 * Toast Component
 * ================
 * Animated toast notifications for success/error/info feedback.
 *
 * Usage:
 * <Toast type="success" message="Form submitted!" />
 * <Toast type="error" message="Something went wrong" onClose={() => {}} />
 */

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/utils/classname.ts';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  isVisible?: boolean;
  onClose?: () => void;
  duration?: number;
  className?: string;
}

const toastConfig: Record<
  ToastType,
  { icon: typeof CheckCircle; bgClass: string; iconClass: string }
> = {
  success: {
    icon: CheckCircle,
    bgClass: 'bg-green-800 border-green-600',
    iconClass: 'text-green-400',
  },
  error: {
    icon: XCircle,
    bgClass: 'bg-red-800 border-red-600',
    iconClass: 'text-red-400',
  },
  warning: {
    icon: AlertCircle,
    bgClass: 'bg-yellow-700 border-yellow-500',
    iconClass: 'text-yellow-400',
  },
  info: {
    icon: Info,
    bgClass: 'bg-blue-800 border-blue-600',
    iconClass: 'text-blue-400',
  },
};

const toastVariants = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export const Toast = ({ type, message, isVisible = true, onClose, className = '' }: ToastProps) => {
  const { icon: Icon, bgClass, iconClass } = toastConfig[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={toastVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          className={cn('flex items-center gap-3 rounded-xl border px-4 py-3', bgClass, className)}
          role='alert'
        >
          <Icon className={cn('h-5 w-5 shrink-0', iconClass)} />
          <span className='flex-1 text-sm font-medium text-white'>{message}</span>
          {onClose && (
            <button
              onClick={onClose}
              className='rounded-full p-2 transition-colors duration-200 hover:bg-black'
              aria-label='Close notification'
            >
              <X className='h-4 w-4 text-white/70' />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
