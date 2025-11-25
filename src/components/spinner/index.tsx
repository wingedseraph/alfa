export default function Spinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-foreground" role="progressbar" />
    </div>
  );
}
