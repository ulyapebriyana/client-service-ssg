"use client";

import { RWebShare } from "react-web-share";
import { Share2 } from "lucide-react";

const Sharelink = ({ link }: { link: string }) => {
  return (
    <div>
      <RWebShare
        data={{
          text: "Web Share SSG Payment URL",
          url: link,
          title: "Payment URL",
        }}
      >
        <button className="hover:text-primary duration-300 ease-in-out">
          <Share2 />
        </button>
      </RWebShare>
    </div>
  );
};

export default Sharelink;
