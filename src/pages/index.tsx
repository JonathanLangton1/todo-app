import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todo App | Jonathan</title>
        <meta name="description" content="A simple todo app created using NextJS" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js" defer></script>
        <script defer>feather.replace()</script>
      </Head>
      <main className="flex min-h-screen flex-col bg-slate-100 p-8 text-g text-slate-700">
        <h1 className="text-3xl font-medium mb-16">Your Todos</h1>
        <section>
          <h2 className="text-xs font-medium mb-2">Your lists</h2>

          <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory">

            <div className="cursor-pointer group snap-start flex flex-col min-w-[8rem] h-20 rounded-xl bg-white p-3 justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-pink-500 min-w-[0.75rem] min-h-[0.75rem] rounded"></div>
                <p className="text-xs font-medium text-ellipsis overflow-hidden">Work</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium whitespace-nowrap">12 Tasks</p>
                <i data-feather="arrow-right" className="min-w-[1.5rem] group-hover:translate-x-1 transition"></i>
              </div>
            </div>

            <div className="cursor-pointer group snap-start flex flex-col min-w-[8rem] h-20 rounded-xl bg-white p-3 justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-500 min-w-[0.75rem] min-h-[0.75rem] rounded"></div>
                <p className="text-xs font-medium text-ellipsis overflow-hidden">Personal</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">4 Tasks</p>
                <i data-feather="arrow-right" className="min-w-[1.5rem] group-hover:translate-x-1 transition"></i>
              </div>
            </div>

            <div className="cursor-pointer group snap-start flex flex-col min-w-[8rem] h-20 rounded-xl bg-white p-3 justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-500 min-w-[0.75rem] min-h-[0.75rem] rounded"></div>
                <p className="text-xs font-medium text-ellipsis overflow-hidden">Misc</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">25 Tasks</p>
                <i data-feather="arrow-right" className="min-w-[1.5rem] group-hover:translate-x-1 transition"></i>
              </div>
            </div>

              <div className="cursor-pointer hover:border-slate-300 transition flex min-w-[8rem] h-20 rounded-xl border-2 border-dashed justify-center items-center">
                <i data-feather="plus"></i>
              </div>

          </div>

        </section>
      </main>
    </>
  );
};

export default Home;
