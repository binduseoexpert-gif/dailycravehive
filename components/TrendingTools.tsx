const tools = [
  { rank: "#1", name: "Claude 4.6", category: "AI Assistant" },
  { rank: "#2", name: "Sora", category: "AI Video" },
  { rank: "#3", name: "Cursor", category: "AI Coding" },
  { rank: "#4", name: "Midjourney v7", category: "AI Image" },
  { rank: "#5", name: "Perplexity", category: "AI Search" },
];

export default function TrendingTools() {
  return (
    <section className="bg-[#eef2f7] py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-bold text-[#1a1a2e]">
        🔥 Most Craved Right Now
        </h2>

        <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-5 md:overflow-visible">
          {tools.map((tool) => (
            <article
              key={tool.name}
              className="min-w-[180px] rounded-xl bg-[#1a1a2e] p-4 text-center shadow-md transition duration-200 hover:scale-105"
            >
              <p className="text-2xl font-bold text-[#E8505B]">{tool.rank}</p>
              <h3 className="mt-3 text-base font-semibold text-white">{tool.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{tool.category}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
