"use client";

// app/contact-us/page.tsx
// Contact form wired to Web3Forms — submissions arrive in your email inbox.

import { useState } from "react";

const SUBJECTS = [
  "General Inquiry",
  "Suggest a Tool for Review",
  "Guest Post Pitch",
  "Advertising & Partnerships",
  "Report an Error",
];

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    { type: "idle" } | { type: "sending" } | { type: "success" } | { type: "error"; msg: string }
  >({ type: "idle" });

  async function handleSubmit() {
    if (!name || !email || !message) {
      setStatus({ type: "error", msg: "Please fill all fields." });
      return;
    }
    setStatus({ type: "sending" });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "248dc931-15a1-49fe-8b58-6a08d738b965",
          subject: `[DailyCraveHive] ${subject} — from ${name}`,
          from_name: "DailyCraveHive Contact Form",
          name,
          email,
          inquiry_type: subject,
          message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Something went wrong");
      setStatus({ type: "success" });
      setName("");
      setEmail("");
      setSubject(SUBJECTS[0]);
      setMessage("");
    } catch (err: unknown) {
      setStatus({
        type: "error",
        msg: err instanceof Error ? err.message : "Could not send. Please try again.",
      });
    }
  }

  const inputCls =
    "w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#E8505B] focus:ring-1 focus:ring-[#E8505B]";

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-200 via-pink-300 to-pink-100 py-12">
        <h1 className="text-center text-3xl font-bold text-[#1a1a2e]">
          Contact Us
        </h1>
        <p className="mx-auto mt-3 max-w-xl px-4 text-center text-[15px] text-[#555]">
          Questions, tool suggestions, guest posts, partnerships — we read
          everything and reply within 24–48 hours.
        </p>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-2">
        {/* Left — Text */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-3 text-xl font-bold text-[#1a1a2e]">
              Get in Touch
            </h2>
            <p className="leading-relaxed text-gray-700">
              Whether you want to suggest an AI tool for us to review, report an
              error in one of our articles, ask about advertising or
              partnerships, or just share your feedback — drop us a message and
              we&apos;ll get back to you within 24–48 hours.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-[#1a1a2e]">
              Suggest a Tool for Review
            </h2>
            <p className="leading-relaxed text-gray-700">
              Know an AI tool that deserves more attention? We&apos;re always
              looking for the next hidden gem to test. Tell us the tool name,
              what it does, and why you think it&apos;s worth covering — we&apos;ll
              add it to our testing queue.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-[#1a1a2e]">
              Guest Posts
            </h2>
            <p className="leading-relaxed text-gray-700">
              We accept a limited number of high-quality guest posts about AI
              tools, comparisons, and practical AI workflows. Pitch us your topic
              idea with a short outline — original, hands-on content only. We
              don&apos;t publish promotional articles disguised as guides, and
              we don&apos;t accept AI-generated spam.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-[#1a1a2e]">
              Business &amp; Partnership Inquiries
            </h2>
            <p className="leading-relaxed text-gray-700">
              If you&apos;re an AI tool company interested in having your product
              reviewed, or if you&apos;d like to discuss advertising or a
              partnership opportunity, reach out to us. Please note: we never
              accept payment in exchange for positive reviews. All editorial
              decisions are made independently based on our testing process.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-bold text-[#1a1a2e]">
              Found an Error?
            </h3>
            <p className="leading-relaxed text-gray-700">
              AI tools update their pricing and features frequently. If you spot
              outdated information in any of our articles, let us know and
              we&apos;ll verify and update it promptly. Accuracy matters to us.
            </p>
          </div>

          <p className="leading-relaxed text-gray-700">
            <strong>Response Time:</strong> We typically respond within 24–48
            hours on business days.
          </p>
        </div>

        {/* Right — Form */}
        <div className="h-fit rounded-xl border border-gray-100 bg-white p-6 shadow-lg md:sticky md:top-24">
          <p className="mb-4 text-sm text-gray-500">
            Fill out the form below and we&apos;ll get back to you within 24–48
            hours.
          </p>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                placeholder="Your email"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                What&apos;s this about?
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={inputCls}
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={inputCls}
                placeholder="Your message"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={status.type === "sending"}
              className="w-full rounded-lg bg-[#E8505B] py-3 font-semibold text-white transition hover:bg-[#d4454e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status.type === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status.type === "success" && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                ✅ Message sent! We&apos;ll get back to you within 24–48 hours.
              </div>
            )}
            {status.type === "error" && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {status.msg}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}