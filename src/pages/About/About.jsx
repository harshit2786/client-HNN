import React from "react";
import { useMobileLayout } from "../../hooks/mobilelayout";
import { Image } from "@nextui-org/react";

function About() {
  const isMobile = useMobileLayout();

  return (
    <div
      className={`w-full flex ${
        isMobile ? "flex-col pt-4" : " h-screen gap-4 overflow-y-auto"
      }`}
    >
      <div className={` h-full flex flex-col items-center gap-2 justify-center ${isMobile ? "" : " w-[50%]"} `}>
      <div className=" text-[#BF7B67] text-2xl"> Hey everyone!!</div>
      <Image className="pl-8" style={{width:"400px"}} src="/about.gif" alt="gif" />
      </div>
      <div className={` p-4  h-full flex items-center justify-center ${isMobile ? "" : " w-[50%] pr-16"}`}>
      <div className={`bg-[#FAE9DD] p-4 text-xs h-auto  border-[#BF7B67] rounded-lg shadow-md border `}>
        <p className="">
          <strong className=" text-lg">Welcome to Hearts and Notes!</strong>
        </p>
        <br/>
        <p>
          I'm Adarshi Dubey, the writer behind this personal blog. Hearts and
          Notes is my creative haven where I transform my thoughts, emotions,
          and experiences into words, hoping to connect with readers who share a
          passion for the written word.
        </p>
        <br/>
        <p>
          From a young age, I've been enchanted by the power of words and the
          beauty of storytelling. Reading books and creative writing are not
          just hobbies for me; they are my passions and the very essence of who
          I am. My dream is to become an author and a literature research
          scholar, delving deeper into the world of literary arts and
          contributing to its rich legacy.
        </p>
        <br/>
        <p>
          I would like to extend a heartfelt thank you to Mr. Harshit Sama for
          creating this website and being an amazing partner in my life. His
          dedication and hard work in building this platform, as well as his
          unwavering love and support, mean the world to me and should not go
          unnoticed.
        </p>
        <br/>
        <p>
          Thank you for visiting Hearts and Notes. I hope you enjoy your time
          here and find inspiration in my writings.
        </p>
        <br/>
        <p>Warm regards,</p>
        <br/>
        <p>Adarshi Dubey</p>
      </div>
      </div>
    </div>
  );
}

export default About;
