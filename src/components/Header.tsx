import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="container max-w-4xl mx-auto flex py-4 px-4 md:px-6">
                <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
                    Bildeblogg
                </Link>
            </div>
        </header>
    );
}
