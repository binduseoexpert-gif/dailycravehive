"use client";

// components/Navbar.tsx
// Nav items now come from SiteNav (server) as props — dropdowns are automatic.

import Link from "next/link";
import { useState } from "react";

export type NavGroup = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export default function Navbar({ items }: { items: NavGroup[] }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#2d2d3a]">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="shrink-0">
          <img src="/images/logo.png" alt="DailyCraveHive" className="h-14 w-auto" />
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-[#444444] p-2 text-white md:hidden"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="text-xl">{isMobileOpen ? "✕" : "☰"}</span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <li key={item.label} className="group relative">
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 text-[14px] font-medium text-white transition hover:text-[#E8505B]"
              >
                {item.label}
                {item.children ? <span className="text-[10px] text-gray-400 ml-0.5">▾</span> : null}
              </Link>
              {item.children ? (
                <div className="invisible absolute right-0 top-full pt-2 min-w-56 rounded-lg border border-[#444444] bg-[#2d2d3a] p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-md px-3 py-2 text-sm text-white transition hover:bg-[#3d3d4a] hover:text-[#E8505B]"
                    >
                      {child.label}
                    </Link>
                  ))}
                  <Link
                    href={item.href}
                    className="mt-1 block rounded-md border-t border-[#444444] px-3 py-2 text-sm font-semibold text-[#E8505B] transition hover:bg-[#3d3d4a]"
                  >
                    View all {item.label} →
                  </Link>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-[#2d2d3a] transition-transform duration-300 md:hidden ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-y-auto px-4 py-6">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/" onClick={() => setIsMobileOpen(false)}>
              <img src="/images/logo.png" alt="DailyCraveHive" className="h-14 w-auto" />
            </Link>
            <button
              type="button"
              className="rounded-md border border-[#444444] p-2 text-white"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.label}
                className="rounded-lg border border-[#444444] bg-[#2d2d3a] p-3 shadow-sm"
              >
                <Link
                  href={item.href}
                  className="block text-sm font-medium text-white"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="mt-2 space-y-1 border-t border-[#444444] pt-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block text-sm text-gray-400 hover:text-[#E8505B]"
                          onClick={() => setIsMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={item.href}
                        className="block pt-1 text-sm font-semibold text-[#E8505B]"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        View all →
                      </Link>
                    </li>
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}