export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}
