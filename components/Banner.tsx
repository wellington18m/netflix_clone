import Image from "next/image";
import { useEffect, useState } from "react";
import { base_url } from "../constants/movies";
import { Movie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/solid";

interface Props {
  nextflixOriginals: Movie[];
}

function Banner({ nextflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (nextflixOriginals) {
      let currentMovie =
        nextflixOriginals[Math.floor(Math.random() * nextflixOriginals.length)];
      setMovie(currentMovie);
    }
  }, [nextflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end">
      <div className="absolute top-0 -z-10 left-0 h-[95vh] w-screen">
        <Image
          layout="fill"
          objectFit="cover"
          src={`${base_url}${movie?.backdrop_path || movie?.poster_path}`}
        />
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="text-shadow-md max-w-sm text-sm md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="banner_button bg-white text-black">
          <FaPlay className="w-4 text-black md:w-7" /> Play
        </button>
        <button className="banner_button bg-[gray]/70">
          <InformationCircleIcon className="w-4 md:w-7" /> More Info
        </button>
      </div>
    </div>
  );
}

export default Banner;
