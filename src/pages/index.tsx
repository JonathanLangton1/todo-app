import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import ListSummary from "~/components/ListSummary/ListSummary";
import * as React from 'react';
import { useState } from 'react';
import AddList from "~/components/AddList/AddList";
import { Check } from "react-feather";



const Home: NextPage = () => {

  const [lists, setLists] = useState([{'id': 0, 'listName': 'Work', 'themeColour': 'pink', 'tasks': ['Test task']}])

  const generateUniqueListId = () => {
    let id = 0;
    lists.forEach(list => {
      if (list.id > id) {
        id = list.id
      }
    })
    id++
    return id;
  }

  const addList = (listName:string, themeColour:string) => {
    setLists(prev => [...prev, {'id': generateUniqueListId(), 'listName': listName, 'themeColour': themeColour, 'tasks': []}])
  }


  return (
    <>
      <Head>
        <title>Todo App | Jonathan</title>
        <meta name="description" content="A simple todo app created using NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-slate-100 p-8 text-g text-slate-700">
        <h1 className="text-3xl font-medium mb-16" onClick={generateUniqueListId}>Your Todos</h1>

        <section className="mb-2">
          <h2 className="text-xs font-medium mb-2">Your lists</h2>
          <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory">
            {lists.map(list => <ListSummary listName={list.listName} noOfTask={list.tasks.length} key={list.id} themeColour={list.themeColour} />)}
            <AddList onSubmit={addList} />
          </div>
        </section>

        <section className="mb-4 overflow-y-auto overflow-x-visible h-[calc(100svh-15.75rem)]">
          <div>
            <h3 className="text-xs font-medium py-2 sticky top-0 bg-slate-100 z-[2]">Today</h3>
            <div className="flex flex-col gap-2">

              <div className="flex bg-white p-3 rounded-lg gap-2 items-center">
                <input type="checkbox" name="task-checkbox" id="task-checkbox" className="absolute opacity-0" />
                <div className="flex justify-center items-center">
                  <label htmlFor="task-checkbox" className="w-4 h-4 border rounded-full border-slate-400 cursor-pointer z-[1]"></label>
                </div>
                <p className="font-medium">Example task</p>
                <div className="w-[0.75rem] h-[0.75rem] rounded bg-black ml-auto"></div>
              </div>


              {Array.from({ length: 10 }, (_, i) => {
              return (<div key={i} className="flex bg-white p-3 rounded-lg gap-2 items-center opacity-50">
                <input type="checkbox" name="task-checkbox" id="task-checkbox" className="absolute opacity-0" />
                <div className="flex justify-center items-center">
                  <label htmlFor="task-checkbox" className="w-4 h-4 border rounded-full border-slate-400 bg-slate-400 cursor-pointer z-[1]"></label>
                  <Check className="absolute w-3 text-white z-20" />
                </div>
                <p className="font-medium line-through">Example task</p>
                <div className="w-[0.75rem] h-[0.75rem] rounded bg-pink-500 ml-auto"></div>
              </div>)
              })}

            </div>



            <h3 className="text-xs font-medium py-2 sticky top-0 bg-slate-100 z-[2]">Yesterday</h3>
            <div className="flex flex-col gap-2">

              <div className="flex bg-white p-3 rounded-lg gap-2 items-center">
                <input type="checkbox" name="task-checkbox" id="task-checkbox" className="absolute opacity-0" />
                <div className="flex justify-center items-center">
                  <label htmlFor="task-checkbox" className="w-4 h-4 border rounded-full border-slate-400 cursor-pointer z-[1]"></label>
                </div>
                <p className="font-medium">Example task</p>
                <div className="w-[0.75rem] h-[0.75rem] rounded bg-black ml-auto"></div>
              </div>


              {Array.from({ length: 10 }, (_, i) => {
               return (<div key={i} className="flex bg-white p-3 rounded-lg gap-2 items-center opacity-50">
                <input type="checkbox" name="task-checkbox" id="task-checkbox" className="absolute opacity-0" />
                <div className="flex justify-center items-center">
                  <label htmlFor="task-checkbox" className="w-4 h-4 border rounded-full border-slate-400 bg-slate-400 cursor-pointer z-[1]"></label>
                  <Check className="absolute w-3 text-white z-20" />
                </div>
                <p className="font-medium line-through">Example task</p>
                <div className="w-[0.75rem] h-[0.75rem] rounded bg-pink-500 ml-auto"></div>
              </div>)
              })}

          </div>



          </div>
        </section>

      </main>
    </>
  );
};

export default Home;
