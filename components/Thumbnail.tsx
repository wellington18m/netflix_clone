import Image from "next/image";
import { Movie } from "../typings";
import { useRecoilState } from "recoil";
import { modalState, movieState, myListState } from "../atoms/modalAtom";
import { PlusIcon } from "@heroicons/react/solid";
import { PlayIcon } from "@heroicons/react/outline";
import { useState } from "react";

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [myList, setMyList] = useRecoilState(myListState);
  const [showActionsBtn, setActionsBtn] = useState("hidden");
  return (
    <div
      onMouseEnter={() => setActionsBtn("block")}
      onMouseLeave={() => setActionsBtn("hidden")}
      className="relative min-w-[180px] rounded-sm md:rounded h-28 cursor-pointer overflow-hidden md:h-36 md:min-w-[260px]"
    >
      <Image
        className="transitions duration-200 ease-in-out md:hover:scale-105"
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        layout="fill"
        objectFit="cover"
      />
      <div className={`relative ${showActionsBtn}`}>
        <PlayIcon
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
          className="absolute w-7 md:w-10 top-12 right-28"
        />
        <div
          className="absolute  top-24 right-20"
          onClick={() => setMyList([...myList, movie])}
        >
          Add to my list
        </div>
      </div>
    </div>
  );
}

export default Thumbnail;
