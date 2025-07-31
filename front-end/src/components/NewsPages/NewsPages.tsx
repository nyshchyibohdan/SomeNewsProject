import defaultPic from '../../assets/imgs/logo.png';
import { useAppSelector } from '../../hooks/reduxHooks';
import type { Category, NewsApiInitialState } from '../../types/stateTypes';
import { Link } from '@tanstack/react-router';

type NewsPagesType = {
    topic: Category
}

function NewsPages({ topic = "general" }: NewsPagesType) {
    const newsState = useAppSelector((state) => state.newsApi);

    return (
        <div>
            <div className="flex flex-col size-full justify-between p-4">
                <ul className="list-none pl-0 flex flex-col justify-center items-center gap-6" data-testid="news-list">
                    {Array.isArray(newsState[topic]) ? (newsState[topic as keyof NewsApiInitialState].map((article, index) => {
                        const imgSource = article.img ? article.img : defaultPic;

                        return index === 0 ? (
                            <li key={article.title} className="w-11/12 h-60 md:h-[480px]">
                                <div className="w-full h-full relative justify-center items-center" data-testid="main-news-item">
                                    <img
                                        className={`rounded-[4px] md:rounded-[8px] absolute w-full h-60 md:h-full opacity-60 object-cover md:object-cover ${imgSource === defaultPic ? 'absolute self-center justify-self-center object-contain' : ''}`}
                                        src={imgSource}
                                        alt="img"
                                        data-testid="test-image"
                                    />
                                    <div className="ml-7 mr-7 md:ml-14 md:mr-14 absolute flex flex-col bottom-7 md:bottom-14 gap-10">
                                        <div className="flex flex-col h-28 text-white gap-2.5">
                                            <h2 className='font-bold text-[12px] md:text-[18px]' data-testid="main-article-title">
                                                {article.title}
                                            </h2>
                                            <p className="main-article-desc">{article.description}</p>
                                        </div>
                                        <Link
                                            className="md:w-32 inline-block md:pt-2.5 md:pb-2.5 md:pl-5 md:pr-5 text-center no-underline bg-[#293038] border-2 border-[#293038] rounded-[8px] text-[#9eabb8] font-bold md:text-[16px] cursor-pointer transition-colors duration-[0.5s] w-20 hover:bg-[#121417] text-[12px] pt-1.5 pb-1.5 pl-2 pr-2"
                                            to={'/$articleTitle'}
                                            data-testid="test-item-link"
                                            params={{ articleTitle: `${topic}/${article.title}` }}
                                        >
                                            Read more
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ) : (
                            <li key={article.title} className="w-11/12 h-28 md:h-52 flex flex-col gap-4 justify-center items-center" data-testid="other-news-item">
                                <Link
                                    className="w-full flex flex-row justify-between items-center cursor-pointer"
                                    to={'/$articleTitle'}
                                    data-testid="test-item-link"
                                    params={{ articleTitle: `${topic}/${article.title}` }}
                                >
                                    <div className="" data-testid="news-item">
                                        <p className="w-full text-[#9eabb8] text-[14px] mt-0">{article.author}</p>
                                        <h2 className="text-white font-bold text-[14px] md:text-[16px]" data-testid="home-article-title">
                                            {article.title}
                                        </h2>
                                        <p className="md:text-base lg:text-lg xl:text-xl text-[#9eabb8] text-[14px]">{article.description}</p>
                                    </div>
                                    <img
                                        className={`hidden md:block rounded-[8px] object-cover w-80 h-full ${imgSource === defaultPic ? 'object-contain' : 'object-cover'}`}
                                        src={imgSource}
                                        alt="img"
                                        data-testid="test-image"
                                    />
                                </Link>
                            </li>
                        );
                    })) : <div>Loading...</div>}
                </ul>
            </div>
        </div>
    );
}

export default NewsPages;
