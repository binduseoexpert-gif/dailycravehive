"use client";

// components/admin/PostEditor.tsx
// Rich editor with toolbar, preview toggle, and inline image upload.
// Used by both new-post and edit pages.

import { useRef, useState, type ChangeEvent } from "react";

type InlineImage = { name: string; data: string; previewUrl: string };

type Props = {
  body: string;
  onBodyChange: (val: string) => void;
  slug: string;
  inlineImages: InlineImage[];
  onInlineImagesChange: (imgs: InlineImage[]) => void;
};

// Simple markdown → HTML for preview (covers the common cases)
function mdToHtml(md: string, imageMap: Map<string, string>): string {
  let html = md;

  // Custom HTML blocks pass through as-is (they're already HTML)

  // Images — replace path with preview URL if available
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, src) => {
    const fileName = src.split("/").pop() || "";
    const preview = imageMap.get(fileName) || src;
    return `<img src="${preview}" alt="${alt}" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid #e5e5e5;" />`;
  });

  // Headings (must come before paragraph logic)
  html = html.replace(/^### (.+)$/gm, '<h3 style="font-size:18px;font-weight:700;color:#1a1a2e;margin:24px 0 8px;">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 style="font-size:22px;font-weight:700;color:#E8505B;border-bottom:1px solid #E8505B;padding-bottom:8px;margin:32px 0 12px;">$1</h2>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#E8505B;text-decoration:underline;">$1</a>');

  // Blockquotes (multi-line support)
  html = html.replace(/^> (.+)$/gm, '<blockquote style="border-left:4px solid #E8505B;background:#FDF0F1;padding:12px 16px;margin:16px 0;border-radius:0 8px 8px 0;color:#444;">$1</blockquote>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li style="margin-left:20px;color:#3a3a45;">$1</li>');

  // Paragraphs: split on double newlines, wrap non-tag content in <p>
  html = html
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      // Don't wrap blocks that are already HTML tags or list items
      if (/^<(?:h[1-6]|div|table|blockquote|li|img|section|details|span|ul|ol)/i.test(trimmed)) return trimmed;
      return `<p style="margin-bottom:16px;font-size:15px;line-height:1.85;color:#3a3a45;">${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");

  return html;
}

export default function PostEditor({ body, onBodyChange, slug, inlineImages, onInlineImagesChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [imgCounter, setImgCounter] = useState(1);

  function insertAtCursor(before: string, after = "") {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = body.slice(start, end);
    const insert = before + selected + after;
    const newBody = body.slice(0, start) + insert + body.slice(end);
    onBodyChange(newBody);
    setTimeout(() => {
      ta.focus();
      const cursorPos = start + before.length + selected.length + after.length;
      ta.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  }

  function handleBold() { insertAtCursor("**", "**"); }
  function handleH2() { insertAtCursor("\n## ", "\n"); }
  function handleH3() { insertAtCursor("\n### ", "\n"); }
  function handleList() { insertAtCursor("\n- "); }
  function handleQuote() { insertAtCursor("\n> "); }
  function handleLink() {
    const url = prompt("URL enter karo:");
    if (url) insertAtCursor("[", `](${url})`);
  }

  function handleImageClick() {
    fileRef.current?.click();
  }

  function handleImageSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert("Image 3MB se chhoti rakho — tinypng.com se compress karo.");
      e.target.value = "";
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const imgName = `${slug || "post"}-${imgCounter}.${ext}`;
    setImgCounter((c) => c + 1);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(",")[1];

      // Add to inline images array
      onInlineImagesChange([...inlineImages, { name: imgName, data: base64, previewUrl: dataUrl }]);

      // Insert markdown at cursor
      const ta = textareaRef.current;
      const pos = ta?.selectionStart ?? body.length;
      const imgMd = `\n![${imgName.replace(/\.[^.]+$/, "")}](/images/${imgName})\n`;
      const newBody = body.slice(0, pos) + imgMd + body.slice(pos);
      onBodyChange(newBody);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  // Build image map for preview (local previews for not-yet-uploaded images)
  const imageMap = new Map<string, string>();
  inlineImages.forEach((img) => imageMap.set(img.name, img.previewUrl));

  const input =
    "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200";

  const btnCls =
    "rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 hover:border-neutral-400 active:bg-neutral-200";
  const btnActiveCls =
    "rounded-md border border-amber-500 bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-800";

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="block text-sm font-medium text-neutral-700">Body (Markdown / MDX)</label>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={mode === "write" ? btnActiveCls : btnCls}
          >
            ✏️ Write
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={mode === "preview" ? btnActiveCls : btnCls}
          >
            👁️ Preview
          </button>
        </div>
      </div>

      {/* Toolbar — only in write mode */}
      {mode === "write" && (
        <div className="mb-2 flex flex-wrap gap-1.5 rounded-t-lg border border-b-0 border-neutral-300 bg-neutral-50 px-3 py-2">
          <button type="button" onClick={handleBold} className={btnCls} title="Bold">
            <strong>B</strong>
          </button>
          <button type="button" onClick={handleH2} className={btnCls} title="Heading 2">
            H2
          </button>
          <button type="button" onClick={handleH3} className={btnCls} title="Heading 3">
            H3
          </button>
          <span className="mx-1 border-l border-neutral-300" />
          <button type="button" onClick={handleList} className={btnCls} title="Bullet list">
            • List
          </button>
          <button type="button" onClick={handleQuote} className={btnCls} title="Blockquote">
            ❝ Quote
          </button>
          <button type="button" onClick={handleLink} className={btnCls} title="Insert link">
            🔗 Link
          </button>
          <span className="mx-1 border-l border-neutral-300" />
          <button type="button" onClick={handleImageClick} className={`${btnCls} text-amber-700`} title="Insert image">
            🖼️ Image
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleImageSelect}
          />
        </div>
      )}

      {/* Write mode — raw textarea */}
      {mode === "write" ? (
        <>
          <textarea
            ref={textareaRef}
            className={`${input} font-mono text-xs leading-relaxed ${mode === "write" ? "rounded-t-none" : ""}`}
            rows={24}
            value={body}
            onChange={(e) => onBodyChange(e.target.value)}
            placeholder="Write markdown or use the toolbar above…"
          />
          <p className="mt-1 text-xs text-neutral-400">
            {body.trim() ? `${body.trim().split(/\s+/).length} words` : "0 words"}
          </p>
        </>
      ) : (
        /* Preview mode — rendered HTML */
        <div
          className="min-h-[400px] overflow-auto rounded-lg border border-neutral-300 bg-white p-6"
          dangerouslySetInnerHTML={{ __html: mdToHtml(body, imageMap) }}
        />
      )}

      {/* Show inline images count */}
      {inlineImages.length > 0 && (
        <p className="mt-2 text-xs text-amber-700">
          📸 {inlineImages.length} inline {inlineImages.length === 1 ? "image" : "images"} will be uploaded with the post
        </p>
      )}
    </div>
  );
}