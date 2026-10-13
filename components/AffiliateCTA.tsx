type Props = { href: string; children?: React.ReactNode; note?: string };

export default function AffiliateCTA({ href, children = "Visit FeetFinder →", note = "Affiliate link" }: Props) {
  return (
    <div className="my-8 flex flex-col items-center gap-2 text-center">
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="inline-block rounded-full bg-[#e5525f] px-8 py-4 text-[18px] font-bold text-white no-underline shadow-md transition hover:bg-[#c93842] hover:shadow-lg"
      >
        {children}
      </a>
      <span className="text-[12px] text-[#6b6b78]">{note}: we may earn a commission at no extra cost to you. 18+ only.</span>
    </div>
  );
}
