export type Post = {
    slug: string;
    title: string;
    display_date: string;
    description?: string;
    content?: string;
    keywords?: string[];
    thumbnail?: string;
    author: {
        name: string;
    };
};