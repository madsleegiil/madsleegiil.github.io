import {allTags, type BlogPost, type ImageGallery, posts} from "./posts.ts";
import {Link} from "react-router-dom";
import {formatDateReadable} from "./utils.ts";
import {useState} from "react";


function App() {
    const [filteredPosts, setFilteredPosts] = useState<(BlogPost | ImageGallery)[]>(posts);
    const [activeTag, setActiveTags] = useState<string[]>([]);

    const isActiveTag = (tag: string) => {
        return activeTag.includes(tag);
    }

    const tagColor = (tag: string) => {
        return isActiveTag(tag) ? 'bg-yellow-400' : 'bg-yellow-200';
    }

    const onTagClick = (tag: string) => {
        const newActiveTags = isActiveTag(tag) ? activeTag.filter(t => t !== tag) : [...activeTag, tag];
        setActiveTags(newActiveTags);
        filterPosts(newActiveTags);
    }

    const filterPosts = (newActiveTags: string[]) => {
        if (newActiveTags.length === 0) {
            setFilteredPosts(posts);
        } else {
            const newFilteredPosts = posts.filter((post) => {
                return post.tags.some(tag => newActiveTags.includes(tag))
            })
            setFilteredPosts(newFilteredPosts);
        }
    }

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {allTags().map((tag, index) => (
                    <div key={`tag-${index}`}  className={`${tagColor(tag)} px-4 py-2 cursor-pointer rounded-sm`} onClick={() => onTagClick(tag)}>{tag}</div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-6">
                {filteredPosts.map((post) => (
                    <Link to={`/blog/${post.slug}`} key={post.slug} className="block bg-gray-200 hover:bg-gray-300 transition-colors w-full">
                        {post.imagePath && (
                            <img src={post.imagePath} alt="Eksempelbilde for posten" className="w-full"/>
                        )}
                        <div className="p-6">
                            <h3 className="text-2xl font-bold">{post.title}</h3>
                            <p className="text-gray-700">
                                {formatDateReadable(post.date)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default App
