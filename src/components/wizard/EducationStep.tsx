import type { Education, ResumeData } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MonthYearSelect } from '@/components/ui/month-year-select';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface Props {
  data: Education[];
  onChange: (education: ResumeData['education']) => void;
}

const DEGREES = [
  'High School Diploma',
  'Associate of Arts (A.A.)',
  'Associate of Science (A.S.)',
  'Bachelor of Arts (B.A.)',
  'Bachelor of Science (B.S.)',
  'Bachelor of Engineering (B.E.)',
  'Bachelor of Technology (B.Tech)',
  'Bachelor of Business Administration (BBA)',
  'Bachelor of Fine Arts (BFA)',
  'Master of Arts (M.A.)',
  'Master of Science (M.S.)',
  'Master of Engineering (M.Eng)',
  'Master of Business Administration (MBA)',
  'Master of Fine Arts (MFA)',
  'Master of Technology (M.Tech)',
  'Doctor of Philosophy (Ph.D.)',
  'Doctor of Medicine (M.D.)',
  'Juris Doctor (J.D.)',
  'Doctor of Education (Ed.D.)',
  'Other',
];

function createEmptyEducation(): Education {
  return { id: crypto.randomUUID(), school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', description: '' };
}

export function EducationStep({ data, onChange }: Props) {
  const addItem = () => onChange([...data, createEmptyEducation()]);
  const removeItem = (id: string) => onChange(data.filter(e => e.id !== id));
  const updateItem = (id: string, updates: Partial<Education>) => {
    onChange(data.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Education</h2>
          <p className="mt-1 text-sm text-muted-foreground">Add your educational background.</p>
        </div>
        <Button onClick={addItem} size="sm" variant="outline" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
          <GraduationCap className="mb-3 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No education added yet</p>
          <Button onClick={addItem} size="sm" variant="ghost" className="mt-2">Add Education</Button>
        </div>
      )}
      {data.map((edu) => (
        <div key={edu.id} className="space-y-3 rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{edu.school || 'New Education'}</span>
            <Button onClick={() => removeItem(edu.id)} size="icon" variant="ghost" className="h-7 w-7 text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">School</Label>
              <Input value={edu.school} onChange={e => updateItem(edu.id, { school: e.target.value })} placeholder="Stanford University" className="bg-background" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Degree</Label>
              <Select value={edu.degree} onValueChange={(v) => updateItem(edu.id, { degree: v })}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select degree" />
                </SelectTrigger>
                <SelectContent>
                  {DEGREES.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Field of Study</Label>
              <Input value={edu.field} onChange={e => updateItem(edu.id, { field: e.target.value })} placeholder="Computer Science" className="bg-background" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">GPA</Label>
              <Input value={edu.gpa} onChange={e => updateItem(edu.id, { gpa: e.target.value })} placeholder="3.8" className="bg-background" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Start Date</Label>
              <MonthYearSelect value={edu.startDate} onChange={(v) => updateItem(edu.id, { startDate: v })} showMonth={false} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">End Date</Label>
              <MonthYearSelect value={edu.endDate} onChange={(v) => updateItem(edu.id, { endDate: v })} showMonth={false} />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Description</Label>
            <Textarea value={edu.description} onChange={e => updateItem(edu.id, { description: e.target.value })} placeholder="Relevant coursework, honors, activities..." rows={2} className="bg-background resize-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
