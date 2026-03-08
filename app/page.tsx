import { getAllPosts, getAllTags } from "@/lib/posts";
import LogbookClient from "@/components/LogbookClient";

export default async function Home() {
  const posts = await getAllPosts();
  const allTags = getAllTags(posts);

  return <LogbookClient posts={posts} allTags={allTags} />;
}
