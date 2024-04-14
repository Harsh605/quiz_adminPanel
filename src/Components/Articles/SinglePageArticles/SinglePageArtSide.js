import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';

const SinglePageArtSide = () => {
    const relatedPosts = [
        {
            id: 1,
            title: 'This Bread Pudding Will Give You All the Fall Feels',
            author: 'Mary Johnson',
            imageUrl: 'https://stablo-pro.web3templates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fb7d2fa6d0b250bd1e0c601645319db4cde42a01e-3958x5937.jpg%3Fw%3D2000%26auto%3Dformat&w=640&q=75',
        },
        {
            id: 2,
            title: '10 Tips for Perfectly Grilled Steak',
            author: 'John Smith',
            imageUrl: 'https://stablo-pro.web3templates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fa5bd8977e7fd82666c00a45948583b1f9912d392-3847x5583.jpg%3Fw%3D2000%26auto%3Dformat&w=640&q=75',
        },
        {
            id: 3,
            title: 'Lessons Of Happiness I learned from a Village',
            author: 'John Doe',
            imageUrl: 'https://stablo-pro.web3templates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5be1635417f1814b3fb09f8e9f74f37079899f72-4032x3024.jpg%3Fw%3D2000%26auto%3Dformat&w=2048&q=75',
        },
    ];

    const categories = [
        { name: 'Personal Growth', count: 5, url: '/category/personal-growth' },
        { name: 'Lifestyle', count: 4, url: '/category/lifestyle' },
        { name: 'Travel', count: 3, url: '/category/travel' },
        { name: 'Technology', count: 3, url: '/category/technology' },
        { name: 'Design', count: 2, url: '/category/design' },
    ];

    return (
        <aside className="sticky top-0 w-full self-start md:w-96">
            <div className="mt-5 font-sans">
                <div>
                    <h3 className="text-2xl font-bold dark:text-white">Search Posts</h3>
                    <form action="/search" method="GET" className="mt-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                name="q"
                                id="q"
                                className="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-300 focus:shadow-sm dark:bg-gray-900 dark:border-gray-600 dark:focus:border-white"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    className="w-4 h-4 text-gray-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-10">
                    <h3 className="text-2xl font-bold dark:text-white">Related</h3>
                    <div className="grid gap-6 mt-6">
                        {relatedPosts.map((post) => (
                            <a href={`/post/SinglePageArtSide/${post.id}`} key={post.id}>
                                <div className="flex gap-5">
                                    <div className="relative w-24 h-20 overflow-hidden rounded-md shrink-0">
                                        <LazyLoadImage
                                            src={post.imageUrl}
                                            alt={post.title}
                                            effect='blur'
                                            className="object-cover w-[100vw]"
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h4 className="text-xl font-semibold">{post.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            by {post.author}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="mt-10">
                    <h3 className="text-2xl font-bold dark:text-white">Categories</h3>
                    <ul className="grid mt-4">
                        {categories.map((category, index) => (
                            <li key={index}>
                                <a className="flex items-center justify-between py-2" href={category.url}>
                                    <h4 className="text-gray-800 dark:text-gray-400">{category.name}</h4>
                                    <div className="inline-flex items-center justify-center font-bold px-2 h-6 text-sm bg-blue-50 text-blue-500 rounded-full shrink-0 dark:bg-gray-800 dark:text-gray-300">
                                        {category.count}
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default SinglePageArtSide;
