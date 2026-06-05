import { useState } from "react";
import { useParams } from "react-router";
import Comments from "./comments";
import useFetch from "./useFetch";

export default function Posts() {
    const { id } = useParams();
    const { data: posts, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    const [openCommentId, setOpenCommentId] = useState(null);

    function handleToggle(postId) {
        setOpenCommentId(openCommentId === postId ? null : postId);
    }

    if (loading) return <div className="loading">loading...</div>;
    if (error) return <div className="error">Failed to load posts: {error}</div>;

    return (
        <div className="posts-container">
            {posts.map(p => (
                <div key={p.id} className="post-card">
                    <div className="post-title">{p.title}</div>
                    <div className="post-body">{p.body}</div>
                    <div className="comments-section">
                        <button className="toggle-comments-btn" onClick={() => handleToggle(p.id)}>
                            {openCommentId === p.id ? 'hide comments' : 'show comments'}
                        </button>
                        {openCommentId === p.id && <Comments postid={p.id} />}
                    </div>
                </div>
            ))}
        </div>
    );
}
