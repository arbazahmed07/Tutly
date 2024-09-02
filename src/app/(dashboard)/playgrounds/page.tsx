import Link from "next/link";
import { RiReactjsFill } from "react-icons/ri";
import { IoLogoHtml5 } from "react-icons/io5";

const Page = () => {
  return (
    <div className="m-auto p-6">
      <div className="flex flex-wrap gap-10">
        <Link href="/playgrounds/html-css-js">
          <div className="flex items-center gap-6 w-[350px] p-3 px-5 border-2 dark:bg-white dark:text-black border-slate-300 rounded-lg hover:border-gray-500">
            <div><IoLogoHtml5 className="bg-slate-200 rounded-md h-20 w-20 p-2 text-orange-600"/></div>
            <div>
              <h1 className="text-lg font-bold">HTML/CSS/JS</h1>
              <p className="text-sm text-slate-500">Playground for html,css and js</p>
            </div>
          </div>
        </Link>
        <Link href="/playgrounds/react">
          <div className="flex items-center gap-6 w-[350px] p-3 px-5 border-2 dark:bg-white dark:text-black border-slate-300 rounded-lg hover:border-gray-500">
            <div><RiReactjsFill className="bg-slate-200 rounded-md h-20 w-20 p-1.5 text-sky-400"/></div>
            <div>
              <h1 className="text-lg font-bold">React.js</h1>
              <p className="text-sm text-slate-500">Playground for React</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Page;
