const categories = [
  {
    name: "Best AI Writing Tools",
    count: "12 tools reviewed",
    href: "/best-ai-writing-tools",
    icon: "✍️",
  },
  {
    name: "Best AI Image Generators",
    count: "10 tools reviewed",
    href: "/best-ai-image-generators",
    icon: "🖌️",
  },
  { name: "Best AI Video Tools", count: "12 tools reviewed", href: "#", icon: "🎬" },
  { name: "Best AI Coding Tools", count: "12 tools reviewed", href: "#", icon: "💻" },
];

export default function CategoryCards() {
  return (
    <section className="bg-[#f9fafb] py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-bold text-[#1a1a2e]">Best AI Tools by Category</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.name}
              className="rounded-xl border border-[#2a2a3e] bg-[#1a1a2e] p-6 text-center"
            >
              <div className="inline-flex rounded-lg border-2 border-[#E8505B] p-3">
                <span className="text-3xl text-[#E8505B]">{category.icon}</span>
              </div>
              <a href={category.href} className="mt-4 block text-base font-semibold text-white">
                {category.name}
              </a>
              <p className="mt-2 text-sm text-gray-400">{category.count}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
