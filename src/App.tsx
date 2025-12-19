import {posts} from "./posts.ts";
import {Link} from "react-router-dom";


function App() {

    return (
        <div>
            <h1>Blogg</h1>
            <h3>Poster</h3>
            {posts.map((post) => (
                <div key={post.slug}>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </div>
            ))}
        </div>
    )
}

export default App
