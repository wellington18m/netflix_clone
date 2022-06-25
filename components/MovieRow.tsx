import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

function MovieRow({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrolllWidth] = useState<any>(0);

  const handleClick = (direction: string) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      setScrolllWidth(scrollTo);
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  return (
    <div className="h-40 space-y-1 mb-8">
      <h2
        className="w-56 cursor-pointer md:-mb-2 text-sm md:text-2xl font-semibold
			duration-200 hover:text-white text-[#E5E5E5]"
      >
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`w-9 absolute top-0 bottom-0 z-40 left-2 m-auto cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            scrollWidth <= 0 ? "hidden" : "block"
          }`}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="flex space-x-0.5 items-center overflow-x-scroll scrollbar-none md:space-x-2.5 md:p-2"
        >
          {movies &&
            movies.map((movie) => <Thumbnail key={movie.id} movie={movie} />)}
        </div>
        <ChevronRightIcon
          className={`w-9 absolute top-0 bottom-0 z-40 right-2 m-auto cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default MovieRow;
