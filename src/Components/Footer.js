import React from 'react';

function Footer() {
  return (
    <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-center text-sm">
        Copyright © {/* */}2023{/* */} {/* */}Blogs{/* */}. All rights reserved.
      </div>
      <div className="mt-1 flex justify-center gap-1 text-center text-sm text-gray-500 dark:text-gray-600">
        {/* <span> Made For <a href="https://web3templates.com/?ref=stablo-template" rel="noopener" target="_blank">Donation Purpose</a></span> */}
        <span>·</span>
        <span> <a href="https://github.com/web3templates/stablo" rel="noopener" target="_blank"></a></span>
      </div>
      {/* <div className="mt-2 flex items-center justify-between">
        <div className="mt-5">
          <a href="https://vercel.com/?utm_source=web3templates&amp;utm_campaign=oss" target="_blank" rel="noopener" className="relative block w-44">
            <img alt="Powered by Vercel" loading="lazy" width="150" height="25" decoding="async" data-nimg="1" style={{ color: "transparent" }} src="/_next/static/media/vercel.4f49caf1.svg" />
          </a>
        </div>
        
      </div> */}
    
    </div>
  );
}

export default Footer;
