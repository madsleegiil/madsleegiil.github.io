import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import BlogPost from "./BlogPost.tsx";
import {posts} from "./posts.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog/:slug" element={<BlogPost posts={posts} />} />        </Routes>
    </HashRouter>
);