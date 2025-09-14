export type Post = {
    slug: string;
    title: string;
    date_created: string;
    description?: string;
    content?: string;
    keywords?: string[];
    thumbnail?: string;
    author: {
        name: string;
    };
};