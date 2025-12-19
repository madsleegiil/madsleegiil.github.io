import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import type {Post} from "../posts.ts";
import {formatDateReadable} from "../utils.ts";

interface BlogPostProps {
    posts: Post[];
}

const BlogPost: React.FC<BlogPostProps> = ({ posts }) => {
    const { slug } = useParams<{ slug: string }>();
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div>
                <h1 className="text-2xl">Post ikke funnet</h1>
            </div>
        );
    }

    return (
        <div className="blogpost block w-full">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-700">{formatDateReadable(post.date)}</p>
            <div className="mt-4">
                <Markdown>{post.content}</Markdown>
            </div>
        </div>
    );
};

export default BlogPost;
