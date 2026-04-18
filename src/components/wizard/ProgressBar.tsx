import { motion } from 'framer-motion';
import { User, GraduationCap, Briefcase, Wrench, FolderKanban, Check } from 'lucide-react';

const STEPS = [
  { label: 'Personal', icon: User },
  { label: 'Education', icon: GraduationCap },
  { label: 'Experience', icon: Briefcase },
  { label: 'Skills', icon: Wrench },
  { label: 'Projects', icon: FolderKanban },
];

interface Props {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function ProgressBar({ currentStep, onStepClick }: Props) {
  return (
    <div className="flex items-center justify-between px-2">
      {STEPS.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        const Icon = isCompleted ? Check : step.icon;

        return (
          <button
            key={step.label}
            onClick={() => onStepClick(idx)}
            className="group relative flex flex-col items-center gap-1.5"
          >
            <div className="relative">
              <motion.div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors ${
                  isCompleted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : isCurrent
                      ? 'border-primary bg-background text-primary'
                      : 'border-muted bg-background text-muted-foreground'
                }`}
                animate={isCurrent ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Icon className="h-4 w-4" />
              </motion.div>
            </div>
            <span className={`text-[10px] font-medium ${isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
              {step.label}
            </span>
            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div className="absolute left-[calc(50%+20px)] top-4 hidden h-0.5 w-[calc(100%-8px)] sm:block" style={{ width: 'calc(var(--step-gap, 60px))' }}>
                <div className={`h-full rounded-full ${isCompleted ? 'bg-primary' : 'bg-muted'}`} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
