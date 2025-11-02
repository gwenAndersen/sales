import DashboardHeader from '../DashboardHeader';
import { ThemeProvider } from '@/hooks/use-theme';

export default function DashboardHeaderExample() {
  return (
    <ThemeProvider>
      <DashboardHeader onAddData={() => console.log('Add data clicked')} />
    </ThemeProvider>
  );
}
