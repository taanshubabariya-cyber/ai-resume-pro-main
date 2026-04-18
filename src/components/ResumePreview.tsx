import { useRef, useCallback } from 'react';
import type { ResumeData, TemplateType } from '@/types/resume';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';
import { CreativeTemplate } from '@/components/templates/CreativeTemplate';
import { Button } from '@/components/ui/button';
import { Download, LayoutTemplate } from 'lucide-react';

interface Props {
  data: ResumeData;
  template: TemplateType;
  onTemplateChange: (t: TemplateType) => void;
}

const templates: { key: TemplateType; label: string }[] = [
  { key: 'modern', label: 'Modern' },
  { key: 'classic', label: 'Classic' },
  { key: 'creative', label: 'Creative' },
];

export function ResumePreview({ data, template, onTemplateChange }: Props) {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;
    const html2pdf = (await import('html2pdf.js')).default;
    html2pdf()
      .set({
        margin: [0.4, 0.4, 0.4, 0.4],
        filename: `${data.personalInfo.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(previewRef.current)
      .save();
  }, [data.personalInfo.fullName]);

  const TemplateComponent = template === 'modern' ? ModernTemplate : template === 'classic' ? ClassicTemplate : CreativeTemplate;

  return (
    <div className="flex flex-col gap-3">
      {/* Template switcher + download */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
          {templates.map(t => (
            <button
              key={t.key}
              onClick={() => onTemplateChange(t.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                template === t.key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Button onClick={handleDownload} size="sm" className="gap-1.5">
          <Download className="h-3.5 w-3.5" />
          PDF
        </Button>
      </div>

      {/* A4 preview */}
      <div className="overflow-auto rounded-xl border bg-white shadow-lg">
        <div
          ref={previewRef}
          className="mx-auto p-8"
          style={{ width: '8.5in', minHeight: '11in', maxWidth: '100%' }}
        >
          <TemplateComponent data={data} />
        </div>
      </div>
    </div>
  );
}
