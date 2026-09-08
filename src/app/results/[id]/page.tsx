type ResultsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { id } = await params;

  // TODO: load the stored profile for this id and render it.
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-4 p-8">
      <h1 className="text-2xl font-semibold">Your profile</h1>
      <p className="opacity-70">Result placeholder for id: {id}</p>
    </main>
  );
}
