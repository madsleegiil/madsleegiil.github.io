import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import type {Post} from "./posts.ts";

interface BlogPostProps {
    posts: Post[];
}

const BlogPost: React.FC<BlogPostProps> = ({ posts }) => {
    const { slug } = useParams<{ slug: string }>();
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div>
                <h2>Post ikke funnet</h2>
                <Link to="/">Tilbake til bloggen</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <Markdown>{post.content}</Markdown>
            <hr />
            <Link to="/">Tilbake til bloggen</Link>
        </div>
    );
};

export default BlogPost;
