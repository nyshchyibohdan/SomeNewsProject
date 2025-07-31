// import './Article.css';

import { useEffect } from 'react';
import { Route } from '../../routes/$articleTitle';
import type { NewsApiArticle } from '../../types/stateTypes';

const Article = () => {
    const data = Route.useLoaderData();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!data) {
        return <p>No article data found</p>;
    }

    const { article } = data;

    const handleContent = (article: NewsApiArticle) => {
        if (article.content && article.content.includes('[+')) {
            return (
                <>
                    <p className='md:text-base lg:text-lg xl:text-xl text-[14px]'>{article.content.split('[+')[0]}</p>
                    <a className="md:w-32 inline-block md:pt-2.5 md:pb-2.5 md:pl-5 md:pr-5 text-center no-underline bg-[#293038] border-2 border-[#293038] rounded-[8px] text-[#9eabb8] font-bold md:text-[16px] cursor-pointer transition-colors duration-[0.5s] w-20 hover:bg-[#121417] text-[12px] pt-1.5 pb-1.5 pl-2 pr-2" href={article.url} target="_blank" rel="noopener noreferrer">
                        Read more
                    </a>
                </>
            );
        }
        return <p>{article.content}</p>;
    };
    return (
        <div className='flex justify-center items-center'>
            <div className="md:w-3/4 w-11/12 flex flex-col justify-center items-center gap-2.5" data-testid="article-container">
                <div className="h-full w-full text-left p-4">
                    <p className="text-white font-bold text-2xl" data-testid="article-page-title">
                        {article.title}
                    </p>
                </div>

                <img className="rounded-[4px] md:rounded-[8px] w-full h-60 md:h-full opacity-60 object-cover md:object-contain" src={article.img} alt="" />
                <div className="text-white font-normal text-2xl flex flex-col gap-2.5">
                    <p className="md:text-base lg:text-lg xl:text-xl text-[#9eabb8] text-[14px]">{article.description}</p>
                    {handleContent(article)}
                </div>
                <div className="mb-6 w-full flex items-center justify-start">
                    <hr className="grow-[1] mr-2.5 border-b-2 border-b-[#293038]" />
                    <p className="m-0 text-2xl font-bold">{article.author}</p>
                </div>
            </div>
        </div>
    );
};

export default Article;
