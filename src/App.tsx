import {posts} from "./posts.ts";
import Markdown from "react-markdown";


function App() {

    return (
        <div>
            <h1>Blogg</h1>
            <h3>Poster</h3>
            {posts.map((post) => (
                <div><Markdown>{post}</Markdown></div>
            ))}
        </div>
    )
}

export default App
