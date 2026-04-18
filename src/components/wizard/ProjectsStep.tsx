import type { Project, ResumeData } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, FolderKanban } from 'lucide-react';

interface Props {
  data: Project[];
  onChange: (projects: ResumeData['projects']) => void;
}

function createEmptyProject(): Project {
  return { id: crypto.randomUUID(), name: '', description: '', technologies: '', link: '' };
}

export function ProjectsStep({ data, onChange }: Props) {
  const addItem = () => onChange([...data, createEmptyProject()]);
  const removeItem = (id: string) => onChange(data.filter(p => p.id !== id));
  const updateItem = (id: string, updates: Partial<Project>) => {
    onChange(data.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">Showcase your notable projects.</p>
        </div>
        <Button onClick={addItem} size="sm" variant="outline" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
          <FolderKanban className="mb-3 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No projects added yet</p>
          <Button onClick={addItem} size="sm" variant="ghost" className="mt-2">Add Project</Button>
        </div>
      )}
      {data.map((proj) => (
        <div key={proj.id} className="space-y-3 rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{proj.name || 'New Project'}</span>
            <Button onClick={() => removeItem(proj.id)} size="icon" variant="ghost" className="h-7 w-7 text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1"><Label className="text-xs text-muted-foreground">Project Name</Label><Input value={proj.name} onChange={e => updateItem(proj.id, { name: e.target.value })} placeholder="My Awesome Project" className="bg-background" /></div>
            <div className="space-y-1"><Label className="text-xs text-muted-foreground">Technologies</Label><Input value={proj.technologies} onChange={e => updateItem(proj.id, { technologies: e.target.value })} placeholder="React, Node.js, PostgreSQL" className="bg-background" /></div>
          </div>
          <div className="space-y-1"><Label className="text-xs text-muted-foreground">Link</Label><Input value={proj.link} onChange={e => updateItem(proj.id, { link: e.target.value })} placeholder="github.com/you/project" className="bg-background" /></div>
          <div className="space-y-1"><Label className="text-xs text-muted-foreground">Description</Label><Textarea value={proj.description} onChange={e => updateItem(proj.id, { description: e.target.value })} placeholder="Brief description of the project and your role..." rows={2} className="bg-background resize-none" /></div>
        </div>
      ))}
    </div>
  );
}
