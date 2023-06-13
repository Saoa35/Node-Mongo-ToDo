import React from "react";

export const HomePage = () => {
  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">ARTICLES</div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">Popular:</div>
          POPULAR ARTICLES
        </div>
      </div>
    </div>
  );
};
