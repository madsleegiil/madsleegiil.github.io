import {posts} from "./posts.ts";
import {Link} from "react-router-dom";
import {formatDateReadable} from "./utils.ts";


function App() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {posts.map((post) => (
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
    )
}

export default App
