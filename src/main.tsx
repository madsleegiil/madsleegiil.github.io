import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import BlogPost from "./components/BlogPost.tsx";
import {posts} from "./posts.ts";
import {Header} from "./components/Header.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <HashRouter>
        <Header />
        <div className="container max-w-4xl mx-auto flex py-4 px-4 md:px-6 mt-4">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/blog/:slug" element={<BlogPost posts={posts} />} />
            </Routes>
        </div>
    </HashRouter>
);