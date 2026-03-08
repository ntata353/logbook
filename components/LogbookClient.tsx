"use client";

import { useState, useEffect } from "react";
import type { Post } from "@/lib/posts";

interface Props {
  posts: Post[];
  allTags: string[];
}

export default function LogbookClient({ posts }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="logbook-layout">
      {/* ── Left sidebar ─────────────────────────── */}
      <aside className={`sidebar${scrolled ? " sidebar--collapsed" : ""}`}>
        <div>
          <h1 className="site-title">Logbook</h1>
          <p className="site-blurb">
            A running record of design decisions, process notes, and small
            experiments. Updated as things happen.
          </p>
        </div>
      </aside>

      {/* ── Right content ────────────────────────── */}
      <main className="content">
        {posts.map((post) => (
          <article key={post.slug} className="post">
            <time dateTime={post.date} className="post-date">
              {post.formattedDate}
            </time>

            {post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="post-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>
        ))}
      </main>
    </div>
  );
}
