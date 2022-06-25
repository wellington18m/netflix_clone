import Image from "next/image";
import { base_url } from "../constants/movies";
import { Movie } from "../typings";

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  return (
    <div className="relative min-w-[180px] rounded-sm md:rounded h-28 cursor-pointer  overflow-hidden md:h-36 md:min-w-[260px]">
      <Image
        className="transitions duration-200 ease-in-out md:hover:scale-105"
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

export default Thumbnail;
