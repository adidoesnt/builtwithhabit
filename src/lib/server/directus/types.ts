export type Post = {
    slug: string;
    title: string;
    date_updated: string;
    description?: string;
    content?: string;
    keywords?: string[];
    author: {
        name: string;
    };
};