import React from "react";
import Banner from "./Banner";
import Rows from "./Rows";
import { requests } from "../utils/requests";

function Main() {
  return (
    <div className="w-full pb-6">
      <Banner />
      <Rows
        url={requests.fetchNetflixOriginals}
        title="Cableflix Originals"
        isLargeRow
        Num={10}
      />
      <Rows url={requests.fetchToprated} title="Top Rated" Num={8} />
      <Rows url={requests.fetchAction} title="Action" Num={8} />
      <Rows url={requests.fetchcomedy} title="Comedy" Num={8} />
      <Rows url={requests.fetchhorror} title="Horror" Num={8} />
      <Rows url={requests.fetchromance} title="Romance" Num={8} />
    </div>
  );
}

export default Main;
