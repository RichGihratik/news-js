export type NewsItem = {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    author?: string;
    publishedAt: string;
    source: { name: string };
};

export type NewsData = {
    articles: NewsItem[];
};
