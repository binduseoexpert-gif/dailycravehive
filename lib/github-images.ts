// lib/github-images.ts
// Shared helper: commits an array of images to public/images/ via GitHub API.

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

const gh = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

export type ImagePayload = { name: string; data: string };

export async function commitImages(images: ImagePayload[]): Promise<{ ok: true } | { ok: false; error: string }> {
  for (const img of images) {
    if (!/^[a-z0-9._-]+\.(png|jpg|jpeg|webp)$/i.test(img.name)) {
      return { ok: false, error: `Invalid image name: ${img.name}` };
    }
    const imgPath = `public/images/${img.name}`;

    // Check if exists (for overwrite sha)
    let existingSha: string | undefined;
    try {
      const check = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${imgPath}?ref=${GITHUB_BRANCH}`,
        { headers: gh, cache: "no-store" }
      );
      if (check.ok) {
        const j = await check.json();
        existingSha = j.sha;
      }
    } catch { /* ignore */ }

    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${imgPath}`, {
      method: "PUT",
      headers: { ...gh, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `image: add ${img.name}`,
        content: img.data,
        branch: GITHUB_BRANCH,
        ...(existingSha ? { sha: existingSha } : {}),
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { ok: false, error: `Image upload failed (${img.name}): ${err.message || res.statusText}` };
    }
  }
  return { ok: true };
}