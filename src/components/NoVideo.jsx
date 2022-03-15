import React from "react";

export function NoVideo() {
  return (
    <div className=" h-screen w-full flex justify-center items-center ">
      <h1 className="font-extrabold text-3xl text-slate-200">
        Sorry, No Video for this Movie
      </h1>
    </div>
  );
}

export function Nosearch() {
  return (
    <div className=" h-screen w-full flex justify-center items-center ">
      <h1 className="font-extrabold text-slate-200 text-3xl">
        Sorry, No Search Result
      </h1>
    </div>
  );
}
