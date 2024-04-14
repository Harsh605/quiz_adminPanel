import React, { useEffect, useState } from 'react';

function SinglePageArticleMain() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://api.example.com/data')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <article className="flex-1">
            <div className="prose prose-lg mx-auto my-3 dark:prose-invert prose-a:text-blue-500">
                <p>I recently went to the mountains with my friends. We were celebrating 50 years of friendship. It was very special. Six of us were to be together spending time in the mountains.</p>
                <p>I had never been to that place nor heard of the name. I was told by my friends that they had done all the bookings. I had to just pack and join them at the station.</p>
                <p>We would be going to <a href="https://en.wikipedia.org/wiki/Kumarsain" rel="noopener" target="_blank">'<em>Kumarsain'</em></a>&nbsp;<em>which is at the foothill of</em>&nbsp;<a href="https://www.incredibleindia.org/content/incredibleindia/en/destinations/shimla/kotgarh.html" rel="noopener" target="_blank"><em>Kotgarh.</em></a>&nbsp;<em>Both are growing areas of apples, pears, apricots, almonds, cherries, and plums in Himachal Pradesh.</em></p>
                <p>We were to go on the fast train called Shatabdi from Delhi to Kalka and the onward journey would be in an SUV called an Innova.</p>
                <p>We reached Kalka and the cab was waiting for us. We were excited souls. We reached the mountains at 8.30 PM after a long and arduous journey and were even wondering whether it was worth it.</p>
                <p>We reached our destination. It was calm quiet with the soft rustling winds whistling through the trees.</p>
                <p>The clean neat guest house The Wheeler Lodge B&amp;B looked amazing and inviting.</p>
                <h2>Inspirational welcome</h2>
                <p>The host and the hostess at the Wheeler lodge were waiting to welcome us. The warm welcome we received from them made us feel very much at home. The hostess had a major kidney surgery which we did not know about. They did not cancel our booking having committed to it.</p>
                <blockquote>
                    She smiled and was very soft-spoken. Their two children were equally warm and treated us with respect, happiness, and kindness.
                </blockquote>
                <p>They served us fresh food. We enjoyed the simple but tasty homemade food. The whole family served the food and kept us busy with anecdotes about the small village. I could see that they were all proud of their beautiful village.</p>
                <p>They were humble and lovely as a family. We came to know that these young girls between the age of 10 and 13 walk 4kms to school every day on the steep elevated mountains. Winter and summer they bear it all. This makes the children hardy and strong.</p>
                <p>The girls also help out at the two beautiful orchards that they possessed at the time of sowing and picking the fruit. The orchards had fruit trees of apples, apricots, almonds, and cherries.</p>
                <h2>Community work</h2>
                <p>The local community seemed to be driven towards social activities. Every family tries to pitch in and help as much as they can in community work.</p>
                <p>We were very impressed by the way they had maintained their small and simple village. We were given a guided tour of the village on the second day by these girls.</p>
                <p>They took us to the simple Himachali temples. They showed us how to eat apricots that they plucked from the trees that were not so far away from the house.</p>
                <p>One day we went to a beautiful place called Chail which is around 30 kilometers from Shimla and is also called the world's highest cricket ground. At Chail, we visited a wildlife reserve and saw a number of animals.</p>
                <p>The Wheeler lodge was very well kept and was one of the top-rated guesthouses in the area.</p>
                <p>It was an experience worth remembering.</p>
            </div>
            <div className="mb-7 mt-7 flex justify-center">
                <a className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500" href="/">
                    ← View all posts
                </a>
            </div>
            <div className="px-8 py-8 mt-3 text-gray-500 rounded-2xl bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                <div className="flex flex-wrap items-start sm:space-x-6 sm:flex-nowrap">
                    <div className="flex items-center space-x-2">
                        <img className="w-12 h-12 rounded-full" src="https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=32&q=75" alt="Author Avatar" />
                        <div>
                            <p className="font-semibold">John Doe</p>
                            <p className="text-sm text-gray-600">Published on June 18, 2023</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                        <a className="flex items-center space-x-1 text-gray-600" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 16.243l-4.472 2.236a1 1 0 0 1-1.341-1.075l.894-5.215-3.578-3.48a1 1 0 0 1 .555-1.705l5.235-.76L9 1.466A1 1 0 0 1 10 2v14.243zM15.883 7.317a1 1 0 0 1-.37 1.372l-4.715 2.926 1.225 5.212a1 1 0 0 1-1.551 1.083L10 16.069l-4.412 2.46a1 1 0 0 1-1.55-1.084l1.225-5.212-4.716-2.926a1 1 0 0 1-.37-1.372l3.364-3.262-1.63-5.083A1 1 0 0 1 4.92.38L10 2.801l5.081-2.422a1 1 0 0 1 1.372.37l-1.63 5.083 3.363 3.262z" clipRule="evenodd" />
                            </svg>
                            <span>42</span>
                        </a>
                        <a className="flex items-center space-x-1 text-gray-600" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 1a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm-1.464-7.95a.5.5 0 1 1 .928-.372l.004.06c.106.37.225.745.36 1.119a5.5 5.5 0 1 1-7.278-7.278c.374.135.75.254 1.12.36l.059.004a.5.5 0 0 1-.372.928A4.5 4.5 0 0 0 5.5 10a.5.5 0 0 1-.5.5H4a6 6 0 1 1 9.95-4.363.5.5 0 1 1 .929.37A7 7 0 1 0 9.536 18.95z" clipRule="evenodd" />
                            </svg>
                            <span>18</span>
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}


export default SinglePageArticleMain