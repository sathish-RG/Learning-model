import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Duolingo-style buttons: rounded, bold, with a bottom "3D" edge that presses in on click
const VARIANTS = {
  primary:
    'bg-accent text-accent-fg shadow-[0_4px_0_0_var(--color-accent-edge)] hover:brightness-105 active:translate-y-1 active:shadow-none',
  secondary:
    'border-2 border-line bg-surface text-fg shadow-[0_4px_0_0_var(--color-line)] hover:bg-surface-muted active:translate-y-1 active:shadow-none',
  ghost: 'text-muted hover:bg-surface-muted hover:text-fg',
};

const SIZES = {
  sm: 'gap-1.5 rounded-xl px-3 py-1.5 text-sm',
  md: 'gap-2 rounded-2xl px-5 py-2.5 text-sm',
  lg: 'gap-2 rounded-2xl px-6 py-3.5 text-base',
};

const buttonClasses = ({ variant = 'primary', size = 'md', className = '' } = {}) =>
  `inline-flex items-center justify-center font-bold tracking-wide transition-all duration-100 select-none active:scale-95 disabled:pointer-events-none disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

// Renders a <Link> when given `to`, otherwise a <button>
export default function Button({ variant, size, className, loading = false, to, children, ...props }) {
  const classes = buttonClasses({ variant, size, className });

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" {...props} className={classes} disabled={loading || props.disabled}>
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
}
