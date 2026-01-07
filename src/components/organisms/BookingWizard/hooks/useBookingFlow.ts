import { useState, useCallback } from 'react';
import type { BookingStep } from '../types.ts';

export interface UseBookingFlowReturn {
  currentStep: BookingStep;
  isSubmitting: boolean;
  isComplete: boolean;
  submitError: string | null;
  setCurrentStep: (step: BookingStep) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  setIsSubmitting: (value: boolean) => void;
  setIsComplete: (value: boolean) => void;
  setSubmitError: (error: string | null) => void;
}

export function useBookingFlow(initialStep: BookingStep = 1): UseBookingFlowReturn {
  const [currentStep, setCurrentStep] = useState<BookingStep>(initialStep);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const goToNextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, 4) as BookingStep);
  }, []);

  const goToPrevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1) as BookingStep);
  }, []);

  return {
    currentStep,
    isSubmitting,
    isComplete,
    submitError,
    setCurrentStep,
    goToNextStep,
    goToPrevStep,
    setIsSubmitting,
    setIsComplete,
    setSubmitError,
  };
}
