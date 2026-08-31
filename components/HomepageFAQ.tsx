// components/HomepageFAQ.tsx
// Homepage FAQ — transparency + AEO. Includes FAQPage schema for rich results.

const FAQS = [
    {
      q: "Are your reviews sponsored?",
      a: "No. We never accept payment for rankings or positive reviews. We may earn affiliate commissions if you sign up through our links, but that never changes our scores or recommendations.",
    },
    {
      q: "How do you test the platforms you review?",
      a: "We sign up, pay the real fees, and use every platform hands-on. We verify pricing from official sources, check payout terms and seller complaints, and score each platform on the same fixed criteria — fees, payouts, safety, buyer traffic, and value.",
    },
    {
      q: "Is selling content on these platforms legal?",
      a: "Yes — selling your own content is legal in most countries as long as you're 18 or older and pass the platform's identity verification. Rules vary by country, so always check your local laws. Every platform we recommend requires age verification.",
    },
    {
      q: "Do I have to show my face or reveal my identity?",
      a: "No. Most platforms let you sell completely anonymously — no face, no real name. Platforms require ID verification for legal compliance, but that information stays private and is never shown to buyers.",
    },
    {
      q: "Do you earn money from this site?",
      a: "Yes, through affiliate commissions when readers sign up via our links — at no extra cost to you. This funds our testing and never influences our honest opinions.",
    },
    {
      q: "How often is the content updated?",
      a: "We update reviews as prices, fees, and platform policies change, so you're always reading current data — every review shows its last-updated date.",
    },
  ];
  
  export default function HomepageFAQ() {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
  
    return (
      <section className="bg-white py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="mx-auto max-w-6xl px-5">
          <span className="mb-4 inline-block border-b-2 border-[#E8505B] pb-1 text-xs font-bold tracking-wider text-[#E8505B]">
            GOOD TO KNOW
          </span>
          <h2 className="text-[26px] font-extrabold text-[#1a1a2e] md:text-[28px]">
            Frequently Asked Questions
          </h2>
          <p className="mb-7 mt-2 text-[15px] text-[#6b6b78]">The questions readers ask us most.</p>
  
          <div className="max-w-[760px]">
            {FAQS.map((f, i) => (
              <details
                key={i}
                className="mb-2.5 rounded-lg border border-[#e8e8f0] border-l-[3px] border-l-[#E8505B] bg-white"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-4 text-[15px] font-bold text-[#1a1a2e] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-[20px] font-bold text-[#E8505B]">+</span>
                </summary>
                <p className="px-4 pb-4 text-[14px] text-[#6b6b78]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    );
  }