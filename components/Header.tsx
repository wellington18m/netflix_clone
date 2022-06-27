import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

function Header() {
  const [isScrolling, setScrollling] = useState(false);
  const { logOut, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrollling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function goToMyPlayList() {
    document.body.scrollTo({ top: 200, behavior: "smooth" });
  }
  return (
    <header className={`${isScrolling && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="customLink">Home</li>
          <li className="customLink">TV Shoes</li>
          <li className="customLink">Movies</li>
          <li className="customLink">New & Popular</li>
          <li onClick={goToMyPlayList} className="customLink">
            My List
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <button onClick={logOut}>Log out</button>
        <SearchIcon className="hidden sm:flex w-6" />
        <p className="hidden lg:flex">Kids</p>
        <BellIcon className="w-6" />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
