import { useState } from 'react';
import { analyzeATS } from '@/server/ai.functions';
import { resumeToText } from '@/lib/resume-text';
import type { ResumeData } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  data: ResumeData;
}

interface AnalysisResult {
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  matchedKeywords: string[];
}

export function ATSScoreDialog({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const runAnalysis = async () => {
    setLoading(true);
    setResult(null);
    try {
      const text = resumeToText(data);
      const res = await analyzeATS({ resumeText: text, jobDescription: jobDescription.trim() || undefined });
      setResult(res);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = result
    ? result.score >= 80
    ? 'text-primary'
    : result.score >= 60
      ? 'text-foreground'
      : 'text-destructive'
    : '';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Target className="h-3.5 w-3.5" /> ATS Score
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" /> ATS Compatibility Score
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Job Description (optional)</Label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste a job description to get tailored keyword analysis..."
              rows={4}
              className="resize-none text-sm"
            />
          </div>

          <Button onClick={runAnalysis} disabled={loading} className="w-full gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </Button>

          {result && (
            <div className="space-y-4 rounded-xl border bg-muted/30 p-4">
              <div className="text-center">
                <div className={`font-display text-5xl font-bold ${scoreColor}`}>{result.score}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">ATS Score / 100</div>
                <Progress value={result.score} className="mt-3" />
                <p className="mt-3 text-sm text-foreground">{result.summary}</p>
              </div>

              {result.matchedKeywords.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Matched Keywords</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedKeywords.map((k, i) => (
                      <Badge key={i} variant="secondary">{k}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {result.missingKeywords.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((k, i) => (
                      <Badge key={i} variant="outline" className="border-destructive/30 text-destructive">{k}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Strengths
                  </h4>
                  <ul className="space-y-1 text-xs text-foreground">
                    {result.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground">
                    <AlertCircle className="h-3.5 w-3.5 text-destructive" /> Improvements
                  </h4>
                  <ul className="space-y-1 text-xs text-foreground">
                    {result.improvements.map((s, i) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
