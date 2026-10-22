// components/HowWeTest.tsx
// E-E-A-T trust section — explains the review methodology. Server component (static).

const STEPS = [
    { n: 1, title: "Published terms & help pages", desc: "We read each platform's own fees, terms and help pages before we write." },
    { n: 2, title: "User & press reports", desc: "We check what creators and reporters say, and label anything we couldn't confirm." },
    { n: 3, title: "Scored on fixed criteria", desc: "Every platform gets the same scorecard — fees, safety, results, and value." },
    { n: 4, title: "No sponsored rankings", desc: "We may earn affiliate commissions, but they never change our scores." },
  ];
  
  export default function HowWeTest() {
    return (
      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="mb-4 inline-block border-b-2 border-[#E8505B] pb-1 text-xs font-bold tracking-wider text-[#E8505B]">
                OUR METHOD
              </span>
              <h2 className="text-[26px] font-extrabold text-[#1a1a2e] md:text-[28px]">
                How We Review Platforms
              </h2>
              <p className="mb-6 mt-2 text-[15px] text-[#6b6b78]">
                No guesswork, no payments for rankings. Here&apos;s the process behind every review.
              </p>
              <div className="grid gap-4">
                {STEPS.map((s) => (
                  <div key={s.n} className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#FDF0F1] text-[16px] font-extrabold text-[#E8505B]">
                      {s.n}
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-[#1a1a2e]">{s.title}</h4>
                      <p className="text-[14px] text-[#6b6b78]">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="rounded-2xl bg-[#1a1a2e] p-8 text-center text-white">
              <div className="text-[44px] font-extrabold leading-none text-[#E8505B]">18+</div>
              <div className="mt-1 text-[13px] text-[#b8b8c8]">Adults-only, honest guides</div>
              <hr className="my-[18px] border-t border-[#3a3a4d]" />
              <div className="text-[44px] font-extrabold leading-none text-[#E8505B]">$0</div>
              <div className="mt-1 text-[13px] text-[#b8b8c8]">Paid for rankings</div>
              <hr className="my-[18px] border-t border-[#3a3a4d]" />
              <div className="text-[44px] font-extrabold leading-none text-[#E8505B]">2026</div>
              <div className="mt-1 text-[13px] text-[#b8b8c8]">Verified current data</div>
            </div>
          </div>
        </div>
      </section>
    );
  }