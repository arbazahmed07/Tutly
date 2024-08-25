import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Link href="/playgrounds/html-css-js">
        <div>
          HTML CSS JS Playground
        </div>
      </Link>
      <Link href="/playgrounds/react">
        <div>
          React Playground
        </div>
      </Link>
    </div>
  );
}

export default Page;
