import Image from "next/image";
import Link from "next/link";
import React from "react";
import ls from "localstorage-slim";

const Custom404Module = () => {
  const token: string = `${ls.get("access_token", { decrypt: true })}`;

  return (
    <section className={`${token !== "null" ? "h-[100vh]" : "h-screen"}  flex flex-col justify-center items-center px-4`}>
      <Image
        height={240}
        width={330}
        src="https://capitalcortstorage.blob.core.windows.net/app-assets/cc/custom-404.webp"
        alt="Custom 404"
        unoptimized={true}
        quality={100}
      />
      <h1 className="h2 font-bold leading-1 mt-10">Page Not Found</h1>
      <p className="h5 text-theme-gray-400 font-normal text-center max-w-[26.5rem] mt-2">
        Sorry, the page you are looking for is temporarily unavailable.
      </p>
      <Link
        href={token !== "null" ? "/home" : "/"}
        className="bg-theme-gray-575 text-white py-5 px-16 mt-8 rounded-xl font-semibold h5"
      >
        Go to Home Page
      </Link>
    </section>
  );
};

export default Custom404Module;
