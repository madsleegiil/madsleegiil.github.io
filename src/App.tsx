import { useState } from "react";

type Lang = "no" | "en" | "es" | "ko";

function App() {
    const [lang, setLang] = useState<Lang>("no");

    const content: Record<Lang, string> = {
        no: "Hei, jeg er Mads.",
        en: "Hi, I'm Mads.",
        es: "Hola, soy Mads.",
        ko: "안녕하세요, 저는 마츠입니다."
    };

    return (
        <div className="min-h-screen bg-slate-900 flex justify-center pt-20 md:pt-0 md:items-center px-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12">

                <img
                    src="/mads.jpeg"
                    alt="Mads"
                    className="w-44 h-44 md:w-52 md:h-52 rounded-full object-cover"
                />

                <div className="w-72 sm:w-80 md:w-96 text-center md:text-left md:mt-6">
                    <div className="flex justify-center md:justify-start gap-4 text-2xl mb-4 cursor-pointer select-none">
                        <span onClick={() => setLang("no")} title="Norsk">🇳🇴</span>
                        <span onClick={() => setLang("en")} title="English">🇬🇧</span>
                        <span onClick={() => setLang("es")} title="Español">🇪🇸</span>
                        <span onClick={() => setLang("ko")} title="한국어">🇰🇷</span>
                    </div>

                    <div className="min-h-[3.5rem]">
                        <h1 className="text-3xl font-semibold text-white mb-4 leading-snug">
                            {content[lang]}
                        </h1>
                    </div>

                    <div className="flex justify-center md:justify-start gap-5 text-2xl">
                        <a
                            href="http://www.flickr.com/photos/madsgiil/"
                            target="_blank"
                            rel="noreferrer"
                            title="Flickr"
                            className="text-slate-300 hover:text-white transition-colors"
                        >
                            📷
                        </a>

                        <a
                            href="https://www.linkedin.com/in/mads-lee-giil-94940a1a6/"
                            target="_blank"
                            rel="noreferrer"
                            title="LinkedIn"
                            className="text-slate-300 hover:text-white transition-colors"
                        >
                            💼
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
