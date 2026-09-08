import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold">AI Personality Quiz</h1>
      <p className="opacity-70">
        Landing page placeholder. Nothing is implemented yet.
      </p>
      <Link href="/quiz" className="underline underline-offset-4">
        Start the quiz
      </Link>
    </main>
  );
}
