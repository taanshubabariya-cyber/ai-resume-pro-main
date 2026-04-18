import { useState } from 'react';
import type { Experience, ResumeData } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MonthYearSelect } from '@/components/ui/month-year-select';
import { Plus, Trash2, Briefcase, X, Sparkles, Loader2 } from 'lucide-react';
import { improveBullets } from '@/server/ai.functions';
import { toast } from 'sonner';

interface Props {
  data: Experience[];
  onChange: (experience: ResumeData['experience']) => void;
}

function createEmptyExperience(): Experience {
  return { id: crypto.randomUUID(), company: '', position: '', location: '', startDate: '', endDate: '', current: false, bullets: [''] };
}

export function ExperienceStep({ data, onChange }: Props) {
  const [improvingId, setImprovingId] = useState<string | null>(null);
  
  const addItem = () => onChange([...data, createEmptyExperience()]);
  const removeItem = (id: string) => onChange(data.filter(e => e.id !== id));
  const updateItem = (id: string, updates: Partial<Experience>) => {
    onChange(data.map(e => e.id === id ? { ...e, ...updates } : e));
  };
  const addBullet = (id: string) => {
    onChange(data.map(e => e.id === id ? { ...e, bullets: [...e.bullets, ''] } : e));
  };
  const updateBullet = (id: string, index: number, value: string) => {
    onChange(data.map(e => e.id === id ? { ...e, bullets: e.bullets.map((b, i) => i === index ? value : b) } : e));
  };
  const removeBullet = (id: string, index: number) => {
    onChange(data.map(e => e.id === id ? { ...e, bullets: e.bullets.filter((_, i) => i !== index) } : e));
  };

  const improveExperience = async (exp: Experience) => {
    const nonEmpty = exp.bullets.filter(b => b.trim());
    if (nonEmpty.length === 0) {
      toast.error('Add at least one bullet point first');
      return;
    }
    setImprovingId(exp.id);
    try {
      const res = await improveBullets({ bullets: nonEmpty, role: exp.position, company: exp.company });
      updateItem(exp.id, { bullets: res.bullets });
      toast.success('Bullets rewritten with AI');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'AI improvement failed');
    } finally {
      setImprovingId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Work Experience</h2>
          <p className="mt-1 text-sm text-muted-foreground">Add your professional experience.</p>
        </div>
        <Button onClick={addItem} size="sm" variant="outline" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
          <Briefcase className="mb-3 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No experience added yet</p>
          <Button onClick={addItem} size="sm" variant="ghost" className="mt-2">Add Experience</Button>
        </div>
      )}
      {data.map((exp) => (
        <div key={exp.id} className="space-y-3 rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{exp.position || 'New Position'}{exp.company ? ` at ${exp.company}` : ''}</span>
            <Button onClick={() => removeItem(exp.id)} size="icon" variant="ghost" className="h-7 w-7 text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1"><Label className="text-xs text-muted-foreground">Company</Label><Input value={exp.company} onChange={e => updateItem(exp.id, { company: e.target.value })} placeholder="TechCorp Inc." className="bg-background" /></div>
            <div className="space-y-1"><Label className="text-xs text-muted-foreground">Position</Label><Input value={exp.position} onChange={e => updateItem(exp.id, { position: e.target.value })} placeholder="Software Engineer" className="bg-background" /></div>
            <div className="space-y-1"><Label className="text-xs text-muted-foreground">Location</Label><Input value={exp.location} onChange={e => updateItem(exp.id, { location: e.target.value })} placeholder="San Francisco, CA" className="bg-background" /></div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Start Date</Label>
              <MonthYearSelect value={exp.startDate} onChange={(v) => updateItem(exp.id, { startDate: v })} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox checked={exp.current} onCheckedChange={(v) => updateItem(exp.id, { current: !!v, endDate: v ? '' : exp.endDate })} />
              <Label className="text-xs text-muted-foreground">Currently working here</Label>
            </div>
            {!exp.current && (
              <div className="flex-1 space-y-1">
                <Label className="text-xs text-muted-foreground">End Date</Label>
                <MonthYearSelect value={exp.endDate} onChange={(v) => updateItem(exp.id, { endDate: v })} />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Key Achievements</Label>
              <Button
                onClick={() => improveExperience(exp)}
                disabled={improvingId === exp.id}
                size="sm"
                variant="ghost"
                className="h-7 gap-1 text-xs text-primary hover:text-primary"
              >
                {improvingId === exp.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                Improve with AI
              </Button>
            </div>
            {exp.bullets.map((bullet, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="mt-2.5 text-xs text-muted-foreground">•</span>
                <Input value={bullet} onChange={e => updateBullet(exp.id, idx, e.target.value)} placeholder="Describe your achievement..." className="bg-background flex-1" />
                {exp.bullets.length > 1 && (
                  <Button onClick={() => removeBullet(exp.id, idx)} size="icon" variant="ghost" className="h-9 w-9 shrink-0 text-muted-foreground">
                    <X className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={() => addBullet(exp.id)} size="sm" variant="ghost" className="text-xs gap-1">
              <Plus className="h-3 w-3" /> Add bullet
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
