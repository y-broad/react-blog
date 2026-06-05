import useFetch from "./useFetch";

export default function Comments({ postid }) {
    const { data: comments, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/comments?postId=${postid}`);

    if (loading) return <div className="loading">loading...</div>;
    if (error) return <p className="error">{error}</p>;

    return comments.map(c => <p key={c.id} className="comment">{c.body}</p>);
}
