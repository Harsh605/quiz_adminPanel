import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

const data = [
    {
        imageUrl: 'https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F12301f301772ed723724302aef7c70c5c1c0151f-4500x8000.jpg%3Frect%3D0%2C1080%2C4500%2C5330%26w%3D2000%26auto%3Dformat&w=828&q=75',
        category1: 'Design',
        // category2: 'Lifestyle',
        title: '14 Architectural Design Ideas for a Spacious Interior',
        description: '14 Architectural Design Ideas for a Spacious Interior',
        authorImage: 'https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=32&q=75',
        authorName: 'John Doe',
        date: 'June 11, 2021'
    },
    {
        imageUrl: 'https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2786bf808843b56a0e0feda1c1747cf73673d989-3648x5472.jpg%3Fw%3D2000%26auto%3Dformat&w=828&q=75',
        category1: 'Fashion',
        // category2: 'Style',
        title: 'Every Next Level of Your Life Will Demand a Different You',
        description: 'Nullam auctor justo ut metus tincidunt sagittis.',
        authorImage: 'https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=32&q=75',
        authorName: 'Jane Smith',
        date: 'June 10, 2023'
    },
    {
        imageUrl: 'https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fb7d2fa6d0b250bd1e0c601645319db4cde42a01e-3958x5937.jpg%3Fw%3D2000%26auto%3Dformat&w=828&q=75',
        category1: 'Fashion',
        // category2: 'Style',
        title: 'This Bread Pudding Will Give You All the Fall Feels',
        description: 'Nullam auctor justo ut metus tincidunt sagittis.',
        authorImage: 'https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=32&q=75',
        authorName: 'Jane Smith',
        date: 'June 20, 2023'
    },
    {
        imageUrl: 'https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fb7d2fa6d0b250bd1e0c601645319db4cde42a01e-3958x5937.jpg%3Fw%3D2000%26auto%3Dformat&w=828&q=75',
        category1: 'Fashion',
        // category2: 'Style',
        title: 'This Bread Pudding Will Give You All the Fall Feels',
        description: 'Nullam auctor justo ut metus tincidunt sagittis.',
        authorImage: 'https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=32&q=75',
        authorName: 'Jane Smith',
        date: 'June 20, 2023'
    },
    {
        imageUrl: 'https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fb7d2fa6d0b250bd1e0c601645319db4cde42a01e-3958x5937.jpg%3Fw%3D2000%26auto%3Dformat&w=828&q=75',
        category1: 'Fashion',
        // category2: 'Style',
        title: 'This Bread Pudding Will Give You All the Fall Feels',
        description: 'Nullam auctor justo ut metus tincidunt sagittis.',
        authorImage: 'https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=32&q=75',
        authorName: 'Jane Smith',
        date: 'June 20, 2023'
    }
];

const SingleMember = () => {
    return (
        <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
            <div className="flex flex-col items-center justify-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <img
                        alt="Mario Sanchez"
                        loading="lazy"
                        decoding="async"
                        data-nimg="fill"
                        className="object-cover"
                        sizes="(max-width: 320px) 100vw, 320px"
                        src="https://stablo-pro.web3templates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=640&q=75" // Use the first data object's imageUrl
                    />
                </div>
                <h1 className="text-brand-primary mt-2 text-3xl font-semibold tracking-tight dark:text-white lg:text-3xl lg:leading-tight">
                    Mario Sanchez
                </h1>
                <div className="mx-auto mt-2 flex max-w-xl flex-col px-5 text-center text-gray-500">
                    <p>
                        Mario is a Staff Engineer specializing in Frontend at{" "}
                        <a href="https://vercel.com/" rel="noopener" target="_blank">
                            Vercel
                        </a>
                        , as well as being a co-founder of Acme and the content management
                        system Sanity. Prior to this, he was a Senior Engineer at SingleMemberle.
                    </p>
                </div>
                <div className="flex justify-end pt-5 gap-4 socials">

                    <div className="relative overflow-hidden block footer-div cursor-pointer">
                        <span className="block"><a target="_blank" href="https://www.linkedin.com/in/buff-goofy-164bb027a">
                            <FaLinkedinIn className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
                        </a></span>
                    </div>
                    <div className="relative overflow-hidden block footer-div cursor-pointer">
                        <span className="block"><a target="_blank" href="mailto:contact@buffgoofy.com">
                            <i className="social-links fa-solid fa-envelope text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                        </a></span>
                    </div>
                    <div className=" relative overflow-hidden block footer-div cursor-pointer">
                        <span className="block"><a target="_blank" href="https://www.facebook.com/profile.php?id=100093479117440">
                            <i className=" social-links fa-brands fa-facebook text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                        </a></span>
                    </div>
                    <div className="relative overflow-hidden block footer-div cursor-pointer">
                        <span className="block">
                            <a target="_blank" href="https://www.instagram.com/buff.goofy/">
                                <i className="social-links fa-brands fa-instagram text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                            </a></span>

                    </div>
                    <div className="relative overflow-hidden block footer-div cursor-pointer">
                        <span className="block">
                            <a target="_blank" href="http://discordapp.com/users/1118422230804725760">
                                <i className="social-links fa-brands fa-discord text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                            </a></span>

                    </div>
                    <div className="relative overflow-hidden block footer-div cursor-pointer">
                        <span className="block">
                            <a target="_blank" href="https://www.reddit.com/user/Buff_Goofy/">
                                <i className="social-links fa-brands fa-reddit text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                            </a></span>

                    </div>
                    <div className="relative overflow-hidden block footer-div cursor-pointer">
                        <span className="block"><a target="_blank" href="https://twitter.com/findoutsoon">
                            <FiTwitter className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
                        </a></span>
                    </div>
                    {/* <div className="relative overflow-hidden block footer-div cursor-pointer">
             <span className="block">
               <FaWhatsapp className="text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
             </span>
           </div> */}
                </div>
            </div>
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
                {data.map((item, index) => (
                    <div key={index} className="group cursor-pointer">
                        <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">
                            <a className="relative block aspect-square" >
                                <img
                                    alt="Thumbnail"
                                    loading="lazy"
                                    decoding="async"
                                    className="object-cover transition-all"
                                    sizes="(max-width: 768px) 30vw, 33vw"
                                    srcSet={item.imageUrl}
                                    style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }}
                                />
                            </a>
                        </div>
                        <div className="">
                            <div className="flex gap-3">
                                <a >
                                    <span className="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-[#452a72]">{item.category1}</span>
                                </a>
                                {/* <a href="/category/lifestyle">
                                <span className="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-purple-600">{item.category2}</span>
                            </a> */}
                            </div>
                            <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2 dark:text-white">
                                <a >
                                    <span className="bg-gradient-to-r bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">{item.title}</span>
                                </a>

                            </h2>
                            <div className="hidden">
                                <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                                    <a >{item.description}</a>
                                </p>
                            </div>
                            <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-5 w-5 flex-shrink-0">
                                        <img
                                            alt="Author"
                                            loading="lazy"
                                            decoding="async"
                                            className="rounded-full object-cover"
                                            sizes="20px"
                                            srcSet={item.authorImage}
                                        />
                                    </div>
                                    <span className="text-sm font-medium">{item.authorName}</span>
                                </div>
                                <span className="text-sm font-medium">{item.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SingleMember;
