import React from 'react'
import SinglePageArtSide from './SinglePageArtSide'
import SinglePageArticleMain from './SinglePageArticleMain'
import SingleArticleTop from './SingleArticleTop'

const SinglePageArticles = () => {
  return (
    <>
      <SingleArticleTop />
      <div className="mx-auto mt-14 flex max-w-screen-xl flex-col gap-5 px-5 md:flex-row">
        <SinglePageArticleMain />
        <SinglePageArtSide />
      </div>
    </>

  )
}

export default SinglePageArticles