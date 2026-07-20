export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen text-slate-200">{children}</div>;
}
