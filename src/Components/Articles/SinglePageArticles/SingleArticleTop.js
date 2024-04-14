import React from 'react'
import img1 from "../../../Images/Doctors/article1.jpeg"

import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';

const SingleArticleTop = () => {
  return (
    <div className="relative z-0 flex min-h-[calc(100vh-30vh)] items-center">
      <div className="absolute -z-10 h-full w-full before:absolute before:z-10 before:h-full before:w-full before:bg-black/30">
        <LazyLoadImage
          className="object-cover w-[100vw] h-[100%] absoluteClass top-0 left-0 right-0 bottom-0"
          effect='blur'
          width="100%"
          height="100%"
          src={img1}
        />
      </div>
      <div className="mx-auto max-w-screen-lg px-5 py-20 text-center">
        <h1 className="text-brand-primary mb-3 mt-2 text-3xl font-semibold tracking-tight text-white lg:text-5xl lg:leading-tight">
          This Bread Pudding Will Give You All the Fall Feels
        </h1>
        <div className="mt-8 flex justify-center space-x-3 text-gray-500 ">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex gap-3">
              <div className="relative h-5 w-5 flex-shrink-0">
                <a href="/author/joshua-wood">
                  <LazyLoadImage
                    className="rounded-full w-[100vw] h-[100%] object-cover absolute top-0 left-0 right-0 bottom-0"
                    width="100%"
                    height="100%"
                    src="https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=32&q=75"
                  />
                </a>
              </div>
              <div className="font-medium text-sm text-white">By Joshua Wood</div>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-medium text-sm text-white">June 18, 2023</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleArticleTop