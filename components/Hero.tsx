import Link from "next/link";

// Pills now link to real category pages (only categories that have content).
const categories = [
  { label: "✍️ AI Writing", href: "/category/ai-writing-tools" },
  { label: "🖌️ AI Image", href: "/category/ai-image-tools" },
  { label: "🏆 Best Of", href: "/category/best-of" },
  { label: "⚔️ Comparisons", href: "/category/comparisons" },
  { label: "🌟 Lifestyle", href: "/category/lifestyle" },
];

export default function Hero() {
  return (
    <section
      className="py-20"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #fce4ec 0%, #f06292 48%, #ffffff 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#E8505B] bg-white/80 px-4 py-1 text-xs font-semibold tracking-wide text-[#E8505B]">
          🔥 UPDATED DAILY
        </span>
        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold text-[#1a1a2e] md:text-5xl">
          Your Daily Dose of the Hottest AI Tools
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base text-[#1a1a2e] md:text-lg">
          Discover trending AI tools, honest reviews, and viral picks — before
          everyone else. No fluff, just the tools that actually matter.
        </p>

        {/* Working search — submits to /search?q=... */}
        <form
          action="/search"
          method="get"
          className="mx-auto mt-8 flex w-full max-w-4xl items-center rounded-full bg-white p-2 shadow-lg"
        >
          <span className="px-3 text-gray-500">🔍</span>
          <input
            type="text"
            name="q"
            placeholder='Search AI tools & reviews... (e.g. "Jasper", "ChatGPT", "writing")'
            className="flex-1 bg-transparent px-1 py-2 text-sm text-[#1a1a2e] outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="rounded-full bg-[#E8505B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d9434d]"
          >
            Search Tools
          </button>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="rounded-full bg-[#1a1a2e] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 hover:shadow-md"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}