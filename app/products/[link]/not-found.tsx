import Link from 'next/link';

export default function Error404() {
  return (
    <section className="flex h-full items-center p-16">
      <div className="container my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h1 className="mb-8 text-9xl font-extrabold">
            <span className="sr-only">Error</span>404
          </h1>

          <p className="mb-6 text-xl font-semibold md:text-2xl">
            Sorry, we couldn't find this page.
          </p>

          <p className="mb-8">
            But dont worry, you can find plenty of other things on our homepage.
          </p>

          <Link href={'/'} className="button">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
