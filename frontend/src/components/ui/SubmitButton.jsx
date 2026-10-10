import Button from './Button';

export default function SubmitButton({ loading, children }) {
  return (
    <Button type="submit" size="lg" loading={loading} className="w-full">
      {children}
    </Button>
  );
}
