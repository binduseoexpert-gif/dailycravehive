export default function Newsletter() {
  return (
    <section className="bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a2e]">
              🐝 Join The Hive — Free Weekly AI Roundup
            </h2>
            <p className="mt-3 text-[#555555]">
              Get the top 5 trending AI tools + 1 exclusive deal delivered every
              Tuesday. Plus a free PDF: "100+ AI Tools Cheat Sheet by Category"
            </p>
          </div>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[#1a1a2e] outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-[#E8505B] py-3 font-semibold text-white hover:bg-[#d9434d]"
            >
              Get Free Access
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
