import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => String(currentYear - i));

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showMonth?: boolean;
}

export function MonthYearSelect({ value, onChange, placeholder = 'Select date', showMonth = true }: Props) {
  // Parse existing value like "Jan 2022" or "2022"
  const parts = value.split(' ');
  const month = parts.length === 2 ? parts[0] : '';
  const year = parts.length === 2 ? parts[1] : parts.length === 1 ? parts[0] : '';

  const updateDate = (newMonth: string, newYear: string) => {
    if (showMonth && newMonth && newYear) {
      onChange(`${newMonth} ${newYear}`);
    } else if (!showMonth && newYear) {
      onChange(newYear);
    } else if (newMonth) {
      onChange(newMonth);
    } else if (newYear) {
      onChange(showMonth ? ` ${newYear}`.trim() : newYear);
    }
  };

  return (
    <div className="flex gap-2">
      {showMonth && (
        <Select value={month} onValueChange={(m) => updateDate(m, year)}>
          <SelectTrigger className="bg-background flex-1">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Select value={year} onValueChange={(y) => updateDate(month, y)}>
        <SelectTrigger className="bg-background flex-1">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {YEARS.map((y) => (
            <SelectItem key={y} value={y}>{y}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
