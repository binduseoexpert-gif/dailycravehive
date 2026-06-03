"use client";

import { useState } from "react";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      alert("Please fill all fields.");
      return;
    }
    alert("Message sent! We'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-200 via-pink-300 to-pink-100 py-12">
        <h1 className="text-center text-3xl font-bold text-[#1a1a2e]">
          Contact Us
        </h1>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-2">
        {/* Left — Text */}
        <div className="space-y-8">
          <p className="text-lg leading-relaxed text-gray-700">
            Got a question, suggestion, or just want to say hello? We&apos;d
            love to hear from you.
          </p>

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
              Business &amp; Partnership Inquiries
            </h2>
            <p className="leading-relaxed text-gray-700">
              If you&apos;re an AI tool company interested in having your product
              reviewed, or if you&apos;d like to discuss a partnership
              opportunity, reach out to us. Please note: we never accept payment
              in exchange for positive reviews. All editorial decisions are made
              independently based on our testing process.
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
            Have a question? Fill out the form below and we&apos;ll get back to
            you within 24-48 hours.
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
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#E8505B] focus:ring-1 focus:ring-[#E8505B]"
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
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#E8505B] focus:ring-1 focus:ring-[#E8505B]"
                placeholder="Your email"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#E8505B] focus:ring-1 focus:ring-[#E8505B]"
                placeholder="Your message"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full rounded-lg bg-[#E8505B] py-3 font-semibold text-white transition hover:bg-[#d4454e]"
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}