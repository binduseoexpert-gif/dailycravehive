// components/AuthorBox.tsx
// Author box shown at the end of every post — initial avatar, name, bio.

import Link from "next/link";
import { AUTHOR } from "@/lib/author";

export default function AuthorBox() {
  return (
    <div className="mt-8 flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <Link
        href="/about-us"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E8505B] to-[#ff8a93] text-xl font-black text-white transition hover:opacity-90"
      >
        {AUTHOR.name.charAt(0)}
      </Link>
      <div>
        <p className="text-[15px] font-bold text-[#1a1a2e]">
          <Link href="/about-us" className="hover:text-[#E8505B] transition">
            {AUTHOR.name}
          </Link>
          <span className="ml-2 text-[12px] font-medium text-gray-500">
            {AUTHOR.role}
          </span>
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-[#555]">
          {AUTHOR.bio}
        </p>
      </div>
    </div>
  );
}