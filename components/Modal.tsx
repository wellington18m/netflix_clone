import { XIcon } from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Element, Genre } from "../typings";
import ReactPlayer from "react-player/lazy";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const movie = useRecoilValue(movieState);
  const [trailler, setTrailler] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);

  function handleCloseModal() {
    setShowModal(false);
  }

  useEffect(() => {
    if (!movie) return;
    const data2 = `https://api.themoviedb.org/3/${
      movie?.media_type === "tv" ? "tv" : "movie"
    }/${movie?.id}?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&language=en-US&append_to_response=videos`;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const traillers = data.videos.results.filter(
          (element: Element) => element.type === "Trailer"
        );
        setTrailler(traillers[0]?.key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    }
    fetchMovie();
  }, [movie, showModal]);

  return (
    <MuiModal
      open={showModal}
      onClose={handleCloseModal}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-none"
    >
      <>
        <button
          className="modalButton absolute right-5 top-5 !z-40 bg-[#181818] hover:bg-[#181818]"
          onClick={() => setShowModal(false)}
        >
          <XIcon className="h-7" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            style={{ position: "absolute", top: "0", left: "0" }}
            url={`https://www.youtube.com/watch?v=${trailler}`}
            width="100%"
            height="100%"
            controls={true}
            playing={true}
            muted={false}
          />
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
