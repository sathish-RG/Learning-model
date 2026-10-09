import { Loader2 } from 'lucide-react';

export default function PageLoader({ fullScreen = false }) {
  return (
    <div className={`grid place-items-center text-muted ${fullScreen ? 'h-dvh' : 'py-24'}`}>
      <Loader2 className="size-6 animate-spin" aria-label="Loading" />
    </div>
  );
}
