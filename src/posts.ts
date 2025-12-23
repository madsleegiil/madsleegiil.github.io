import fm from 'front-matter';

export interface BlogPost {
    title: string;
    slug: string;
    date: string;
    imagePath: string;
    content: string;
    fileName: string;
    type: "blogpost",
    tags: string[];
}

export interface ImageGallery {
    title: string;
    slug: string;
    date: string;
    imagePath: string;
    fileName: string;
    images: Image[];
    type: "imagegallery";
    introduction: string;
    tags: string[];
}

export interface Image {
    path: string,
    alt?: string,
    caption?: string,
    focus?: string,
}

type FrontMatter =
    | {
    type: "blogpost";
    title: string;
    slug: string;
    imagePath: string;
    tags: string[];
}
    | {
    type: "imagegallery";
    title: string;
    slug: string;
    imagePath: string;
    images: {
        path: string;
        alt: string;
        caption?: string;
        focus?: string,
    }[];
    introduction: string;
    tags: string[];
};

const modules = import.meta.glob('../posts/*.md', { eager: true, as: 'raw' });

export const posts: (BlogPost | ImageGallery)[] = Object.entries(modules)
    .map(([path, raw]) => {
        const parsed = fm<FrontMatter>(raw as string);
        const filenameWithoutFileFormatSuffix = path
            .split('/').pop()!.replace('.md', '');
        const dateFromFileName = filenameWithoutFileFormatSuffix.split("-")[0];
        const date = dateFromFileName.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');

        if (parsed.attributes.type === "blogpost") {
            return {
                title: parsed.attributes.title,
                slug: parsed.attributes.slug,
                date,
                imagePath: parsed.attributes.imagePath,
                fileName: filenameWithoutFileFormatSuffix,
                content: parsed.body,
                type: parsed.attributes.type,
                tags: parsed.attributes.tags
            };
        } else if (parsed.attributes.type === "imagegallery") {
            return {
                title: parsed.attributes.title,
                slug: parsed.attributes.slug,
                date,
                imagePath: parsed.attributes.imagePath,
                fileName: filenameWithoutFileFormatSuffix,
                images: parsed.attributes.images,
                type: parsed.attributes.type,
                introduction: parsed.body,
                tags: parsed.attributes.tags
            };
        } else {
            throw Error("Illegal post type")
        }
    })
    .sort((a, b) => b.fileName.localeCompare(a.fileName));

export const allTags = (): string[] => {
    return  [...new Set(posts.map((post) => post.tags).flat())];
}