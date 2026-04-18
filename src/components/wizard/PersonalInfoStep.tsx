import type { ResumeData } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, MapPin, Link2, Globe } from 'lucide-react';

interface Props {
  data: ResumeData['personalInfo'];
  onChange: (info: Partial<ResumeData['personalInfo']>) => void;
}

const fields = [
  { key: 'fullName' as const, label: 'Full Name', icon: User, placeholder: 'Alex Johnson' },
  { key: 'email' as const, label: 'Email', icon: Mail, placeholder: 'alex@email.com' },
  { key: 'phone' as const, label: 'Phone', icon: Phone, placeholder: '(555) 123-4567' },
  { key: 'location' as const, label: 'Location', icon: MapPin, placeholder: 'San Francisco, CA' },
  { key: 'linkedin' as const, label: 'LinkedIn', icon: Link2, placeholder: 'linkedin.com/in/yourname' },
  { key: 'website' as const, label: 'Website', icon: Globe, placeholder: 'yoursite.com' },
];

export function PersonalInfoStep({ data, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Personal Information</h2>
        <p className="mt-1 text-sm text-muted-foreground">Start with your basic contact details.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key} className="space-y-1.5">
            <Label htmlFor={key} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Label>
            <Input
              id={key}
              value={data[key]}
              onChange={(e) => onChange({ [key]: e.target.value })}
              placeholder={placeholder}
              className="bg-card"
            />
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="summary" className="text-xs font-medium text-muted-foreground">Professional Summary</Label>
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => onChange({ summary: e.target.value })}
          placeholder="A brief 2-3 sentence summary highlighting your experience and goals..."
          rows={4}
          className="bg-card resize-none"
        />
      </div>
    </div>
  );
}
