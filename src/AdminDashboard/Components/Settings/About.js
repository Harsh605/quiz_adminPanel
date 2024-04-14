import React, { useState } from 'react';

const About = () => {
  // State variables for inputs and form content
  const [aboutHeroImage, setAboutHeroImage] = useState('');
  const [aboutFirstHeading, setAboutFirstHeading] = useState('');
  const [aboutFirstParagraph, setAboutFirstParagraph] = useState('');
  const [aboutSecondHeading, setAboutSecondHeading] = useState('');
  const [aboutSecondParagraph, setAboutSecondParagraph] = useState('');
  const [aboutThirdHeading, setAboutThirdHeading] = useState('');
  const [aboutThirdParagraph, setAboutThirdParagraph] = useState('');
  const [aboutFourthHeading, setAboutFourthHeading] = useState('');
  const [aboutFourthParagraph, setAboutFourthParagraph] = useState('');
  const [aboutFifthHeading, setAboutFifthHeading] = useState('');
  const [aboutFifthParagraph, setAboutFifthParagraph] = useState('');
  const [aboutSixthHeading, setAboutSixthHeading] = useState('');
  const [aboutSixthParagraph, setAboutSixthParagraph] = useState('');
  const [aboutSeventhHeading, setAboutSeventhHeading] = useState('');
  const [aboutSeventhParagraph, setAboutSeventhParagraph] = useState('');

  return (
    <>
      <div className="pt-6 border-gray-300 mt-2 px-7">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            Hero Image
          </p>
          <input
            accept="image/*"
            type="file"
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            value={aboutHeroImage}
            onChange={(e) => setAboutHeroImage(e.target.value)}
          />
          <p className="mt-3 text-xs leading-[15px] text-gray-600">
            Change Hero image
          </p>
        </div>
      </div>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-semibold leading-4 text-gray-800">
          First Heading
        </p>
        <div className="mt-10 border border-gray-300 rounded">
          <textarea
            className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
            placeholder="Start typing here ..."
            value={aboutFirstHeading}
            onChange={(e) => setAboutFirstHeading(e.target.value)}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
        Type About Page 1st heading Content
      </p>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-semibold leading-4 text-gray-800">
          1st Paragraph Content
        </p>
        <div className="mt-10 border border-gray-300 rounded">
          <textarea
            className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
            placeholder="Start typing here ..."
            value={aboutFirstParagraph}
            onChange={(e) => setAboutFirstParagraph(e.target.value)}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
        Type About Page 1st paragraph Content
      </p>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-semibold leading-4 text-gray-800">
          Second Heading
        </p>
        <div className="mt-10 border border-gray-300 rounded">
          <textarea
            className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
            placeholder="Start typing here ..."
            value={aboutSecondHeading}
            onChange={(e) => setAboutSecondHeading(e.target.value)}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
        Type About Page 2nd heading Content
      </p>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-semibold leading-4 text-gray-800">
          Second Paragraph
        </p>
        <div className="mt-10 border border-gray-300 rounded">
          <textarea
            className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
            placeholder="Start typing here ..."
            value={aboutSecondParagraph}
            onChange={(e) => setAboutSecondParagraph(e.target.value)}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
        Type About Page 2nd paragraph Content
      </p>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-semibold leading-4 text-gray-800">
          Third Heading
        </p>
        <div className="mt-10 border border-gray-300 rounded">
          <textarea
            className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
            placeholder="Start typing here ..."
            value={aboutThirdHeading}
            onChange={(e) => setAboutThirdHeading(e.target.value)}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
        Type About Page 3rd Heading Content
      </p>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-semibold leading-4 text-gray-800">
          Third Paragraph
        </p>
        <div className="mt-10 border border-gray-300 rounded">
          <textarea
            className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
            placeholder="Start typing here ..."
            value={aboutThirdParagraph}
            onChange={(e) => setAboutThirdParagraph(e.target.value)}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
        Type About Page 3rd Paragraph Content
      </p>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-semibold leading-4 text-gray-800">
          Fourth Heading
        </p>
        <div className="mt-10 border border-gray-300 rounded">
          <textarea
            className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
            placeholder="Start typing here..."
          value={aboutFourthHeading}
          onChange={(e) => setAboutFourthHeading(e.target.value)}
        />
      </div>
    </div>
    <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
      Type About Page 4th Heading Content
    </p>

    <div className="pt-6 border-gray-300 mt-2 px-7">
      <p className="text-base font-semibold leading-4 text-gray-800">
        Fourth Paragraph
      </p>
      <div className="mt-10 border border-gray-300 rounded">
        <textarea
          className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
          placeholder="Start typing here ..."
          value={aboutFourthParagraph}
          onChange={(e) => setAboutFourthParagraph(e.target.value)}
        />
      </div>
    </div>
    <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
      Type About Page 4th Paragraph Content
    </p>

    <div className="pt-6 border-gray-300 mt-2 px-7">
      <p className="text-base font-semibold leading-4 text-gray-800">
        Fifth Heading
      </p>
      <div className="mt-10 border border-gray-300 rounded">
        <textarea
          className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
          placeholder="Start typing here ..."
          value={aboutFifthHeading}
          onChange={(e) => setAboutFifthHeading(e.target.value)}
        />
      </div>
    </div>
    <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
      Type About Page 5th Heading Content
    </p>

    <div className="pt-6 border-gray-300 mt-2 px-7">
      <p className="text-base font-semibold leading-4 text-gray-800">
        Fifth Paragraph
      </p>
      <div className="mt-10 border border-gray-300 rounded">
        <textarea
          className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
          placeholder="Start typing here ..."
          value={aboutFifthParagraph}
          onChange={(e) => setAboutFifthParagraph(e.target.value)}
        />
      </div>
    </div>
    <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
      Type About Page 5th Paragraph Content
    </p>

    <div className="pt-6 border-gray-300 mt-2 px-7">
      <p className="text-base font-semibold leading-4 text-gray-800">
        Sixth Heading
      </p>
      <div className="mt-10 border border-gray-300 rounded">
        <textarea
          className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
          placeholder="Start typing here ..."
          value={aboutSixthHeading}
          onChange={(e) => setAboutSixthHeading(e.target.value)}
        />
      </div>
    </div>
    <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
      Type About Page 6th Heading Content
    </p>

    <div className="pt-6 border-gray-300 mt-2 px-7">
      <p className="text-base font-semibold leading-4 text-gray-800">
        Sixth Paragraph
      </p>
      <div className="mt-10 border border-gray-300 rounded">
        <textarea
          className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
          placeholder="Start typing here ..."
          value={aboutSixthParagraph}
          onChange={(e) => setAboutSixthParagraph(e.target.value)}
        />
      </div>
    </div>
    <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
      Type About Page 6th Paragraph Content
    </p>

    <div className="pt-6 border-gray-300 mt-2 px-7">
      <p className="text-base font-semibold leading-4 text-gray-800">
        Seventh Heading
      </p>
      <div className="mt-10 border border-gray-300 rounded">
        <textarea
          className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
          placeholder="Start typing here ..."
          value={aboutSeventhHeading}
          onChange={(e) => setAboutSeventhHeading(e.target.value)}
        />
      </div>
    </div>
    <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
      Type About Page 7th Heading Content
    </p>

    <div className="pt-6 border-gray-300 mt-2 px-7">
      <p className="text-base font-semibold leading-4 text-gray-800">
        Seventh Paragraph
      </p>
      <div className="mt-10 border border-gray-300 rounded">
        <textarea
          className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
          placeholder="Start typing here ..."
          value={aboutSeventhParagraph}
          onChange={(e) => setAboutSeventhParagraph(e.target.value)}
        />
      </div>
    </div>
    <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
      Type About Page 7th Paragraph Content
    </p>
  </>
);
};

export default About;
