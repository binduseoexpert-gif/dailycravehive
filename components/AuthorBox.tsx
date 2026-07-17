// components/AuthorBox.tsx
// Author box shown at the end of every post — initial avatar, name, bio.

import { AUTHOR } from "@/lib/author";

export default function AuthorBox() {
  return (
    <div className="mt-8 flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E8505B] to-[#ff8a93] text-xl font-black text-white">
        {AUTHOR.name.charAt(0)}
      </div>
      <div>
        <p className="text-[15px] font-bold text-[#1a1a2e]">
          {AUTHOR.name}
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