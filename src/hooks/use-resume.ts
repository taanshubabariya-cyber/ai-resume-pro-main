import { useState, useEffect, useCallback } from 'react';
import type { ResumeData, TemplateType } from '@/types/resume';
import { EMPTY_RESUME } from '@/types/resume';

const STORAGE_KEY = 'ai-resume-builder-data';
const STEP_KEY = 'ai-resume-builder-step';
const TEMPLATE_KEY = 'ai-resume-builder-template';

export function useResume() {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window === 'undefined') return EMPTY_RESUME;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : EMPTY_RESUME;
    } catch {
      return EMPTY_RESUME;
    }
  });

  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      return Number(localStorage.getItem(STEP_KEY)) || 0;
    } catch {
      return 0;
    }
  });

  const [template, setTemplate] = useState<TemplateType>(() => {
    if (typeof window === 'undefined') return 'modern';
    try {
      return (localStorage.getItem(TEMPLATE_KEY) as TemplateType) || 'modern';
    } catch {
      return 'modern';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch { /* ignore */ }
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem(STEP_KEY, String(currentStep));
    } catch { /* ignore */ }
  }, [currentStep]);

  useEffect(() => {
    try {
      localStorage.setItem(TEMPLATE_KEY, template);
    } catch { /* ignore */ }
  }, [template]);

  const updatePersonalInfo = useCallback((info: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  }, []);

  const updateField = useCallback(<K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setResumeData(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetResume = useCallback(() => {
    setResumeData(EMPTY_RESUME);
    setCurrentStep(0);
  }, []);

  return {
    resumeData,
    setResumeData,
    currentStep,
    setCurrentStep,
    template,
    setTemplate,
    updatePersonalInfo,
    updateField,
    resetResume,
  };
}
