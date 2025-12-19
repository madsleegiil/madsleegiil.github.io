import {posts} from "./posts.ts";
import {Link} from "react-router-dom";
import {formatDateReadable} from "./utils.ts";


function App() {

    return (
        <div className="block w-full">
            {posts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.slug} className="block bg-gray-200 w-full hover:bg-gray-300 transition-colors">
                    <img src={post.imagePath} alt={"Eksempelbilde for posten"} />
                    <div className="p-6">
                        <h3 className="text-2xl font-bold">{post.title}</h3>
                        <p className="text-gray-700">{formatDateReadable(post.date)}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default App
