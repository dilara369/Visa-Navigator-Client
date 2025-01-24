import { Link } from "react-router-dom";

export default function Error() {
  return (
    <section className="flex items-center min-h-screen p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl mb-8 font-semibold md:text-3xl">
            Sorry, we couldn&apos;t find this page.
          </p>
          
          <Link
            to="/"
            rel="noopener noreferrer"
            className="px-8 py-3 font-semibold rounded bg-violet-600 text-white"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
