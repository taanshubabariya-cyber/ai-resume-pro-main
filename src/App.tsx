import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '@/hooks/use-resume';
import { SAMPLE_RESUME } from '@/types/resume';
import { ProgressBar } from '@/components/wizard/ProgressBar';
import { PersonalInfoStep } from '@/components/wizard/PersonalInfoStep';
import { EducationStep } from '@/components/wizard/EducationStep';
import { ExperienceStep } from '@/components/wizard/ExperienceStep';
import { SkillsStep } from '@/components/wizard/SkillsStep';
import { ProjectsStep } from '@/components/wizard/ProjectsStep';
import { ResumePreview } from '@/components/ResumePreview';
import { ATSScoreDialog } from '@/components/ATSScoreDialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, FileText, Eye, Sparkles, RotateCcw } from 'lucide-react';

const TOTAL_STEPS = 5;

function App() {
  const {
    resumeData, setResumeData, currentStep, setCurrentStep,
    template, setTemplate, updatePersonalInfo, updateField, resetResume,
  } = useResume();
  const [showPreview, setShowPreview] = useState(false);

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, TOTAL_STEPS - 1));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 0));
  const loadSample = () => setResumeData(SAMPLE_RESUME);

  const stepContent = [
    <PersonalInfoStep data={resumeData.personalInfo} onChange={updatePersonalInfo} />,
    <EducationStep data={resumeData.education} onChange={(v) => updateField('education', v)} />,
    <ExperienceStep data={resumeData.experience} onChange={(v) => updateField('experience', v)} />,
    <SkillsStep data={resumeData.skills} onChange={(v) => updateField('skills', v)} />,
    <ProjectsStep data={resumeData.projects} onChange={(v) => updateField('projects', v)} />,
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">ResumeAI</span>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={loadSample} variant="ghost" size="sm" className="gap-1.5 text-xs">
              <Sparkles className="h-3.5 w-3.5" /> Load Sample
            </Button>
            <Button onClick={resetResume} variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
            <ATSScoreDialog data={resumeData} />
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
              size="sm"
              className="gap-1.5 lg:hidden"
            >
              <Eye className="h-3.5 w-3.5" /> {showPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl p-4">
        <div className="flex gap-6">
          {/* Left: Wizard Form */}
          <div className={`w-full shrink-0 lg:w-[420px] ${showPreview ? 'hidden lg:block' : ''}`}>
            <div className="mb-6">
              <ProgressBar currentStep={currentStep} onStepClick={setCurrentStep} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {stepContent[currentStep]}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <Button onClick={prevStep} variant="outline" size="sm" disabled={currentStep === 0} className="gap-1">
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              <span className="text-xs text-muted-foreground">
                Step {currentStep + 1} of {TOTAL_STEPS}
              </span>
              <Button onClick={nextStep} size="sm" disabled={currentStep === TOTAL_STEPS - 1} className="gap-1">
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className={`min-w-0 flex-1 ${showPreview ? '' : 'hidden lg:block'}`}>
            <ResumePreview data={resumeData} template={template} onTemplateChange={setTemplate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
