import PostForm from "@/components/PostForm";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <>
      <div className="manage__head">
        <h1>新規作成</h1>
      </div>
      <PostForm action={createPost} submitLabel="保存する" />
    </>
  );
}
