import React from 'react'
import TrendingNewsSingle from './TrendingNewsSingle'

const TrendingNews = ({articles, articlesLinks}: any) => {
    return (
        <aside className="widgets lg:sticky top-20">
            <div className='widget'>
                <h2 className='widget__title'>Trending Articles</h2>
                <ul className="list themeScrollbar">
                    {articles.map((article: any, i: number) => (
                        <TrendingNewsSingle article={article} articleLink={articlesLinks[i]} key={i} />
                    ))}
                </ul>
            </div>
        </aside>

    )
}

export default TrendingNews