import { useState } from 'react';
import type { ResumeData } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Lightbulb } from 'lucide-react';

interface Props {
  data: string[];
  onChange: (skills: ResumeData['skills']) => void;
}

const SUGGESTED_SKILLS = [
  'JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'SQL',
  'AWS', 'Docker', 'Kubernetes', 'Git', 'REST APIs', 'GraphQL',
  'Agile', 'CI/CD', 'TDD', 'Machine Learning',
];

export function SkillsStep({ data, onChange }: Props) {
  const [input, setInput] = useState('');

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !data.includes(trimmed)) {
      onChange([...data, trimmed]);
    }
    setInput('');
  };

  const removeSkill = (skill: string) => onChange(data.filter(s => s !== skill));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(input);
    }
  };

  const suggestions = SUGGESTED_SKILLS.filter(s => !data.includes(s));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Skills</h2>
        <p className="mt-1 text-sm text-muted-foreground">Add your technical and professional skills.</p>
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter..."
          className="bg-card"
        />
        <Button onClick={() => addSkill(input)} size="sm" disabled={!input.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {data.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.map(skill => (
            <Badge key={skill} variant="secondary" className="gap-1 py-1 px-2.5 text-sm">
              {skill}
              <button onClick={() => removeSkill(skill)} className="ml-0.5 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5" />
            Suggested Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.slice(0, 12).map(skill => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className="rounded-md border border-dashed px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
