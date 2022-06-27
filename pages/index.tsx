import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Loading from "../components/Loading";
import MovieRow from "../components/MovieRow";
import { useAuth } from "../hooks/useAuth";
import { Movie } from "../typings";
import requests from "../utils/requests";
import { useRecoilValue } from "recoil";
import { modalState, myListState } from "../atoms/modalAtom";
import Modal from "../components/Modal";

interface Props {
  nextflixOriginals: Movie[];
  trendings: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  //Products: Product[];
}

const Home = ({
  nextflixOriginals,
  trendings,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  const { loading } = useAuth();
  if (loading) return <Loading />;
  const showModal = useRecoilValue(modalState);
  const myList = useRecoilValue(myListState);
  return (
    <div
      id="scroll"
      className="relative h-screen bg-gradient-to-b lg:h-[140vh]"
    >
      <Head>
        <title>Home - Nextflix Clone</title>
        <link rel="icon" href="https://rb.gy/ulxxee" />
      </Head>

      {/* Header */}
      <Header />
      <main className="pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {/* Banner */}
        <Banner nextflixOriginals={nextflixOriginals} />
        <section className="">
          <MovieRow title="Trending Now" movies={trendings} />
          <MovieRow title="Top Rated" movies={topRated} />
          <MovieRow title="Action Thrillers" movies={actionMovies} />
          {/* My list */}
          {myList.length > 0 && (
            <div id="mylist">
              <MovieRow title="My list" movies={myList} />
            </div>
          )}
          <MovieRow title="Comedies" movies={comedyMovies} />
          <MovieRow title="Scary Movies" movies={horrorMovies} />
          <MovieRow title="Romance Movies" movies={romanceMovies} />
          <MovieRow title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    nextflixOriginals,
    trendings,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    docomentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrendings).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      nextflixOriginals: nextflixOriginals.results,
      trendings: trendings.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: docomentaries.results,
    },
  };
};
