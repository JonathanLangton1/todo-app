import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import ListSummary from "~/components/ListSummary/ListSummary";
import * as React from 'react';
import { useState } from 'react';
import AddList from "~/components/AddList/AddList";



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
        <section>
          <h2 className="text-xs font-medium mb-2">Your lists</h2>

          <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory">
            {lists.map(list => <ListSummary listName={list.listName} noOfTask={list.tasks.length} key={list.id} themeColour={list.themeColour} />)}
            <AddList onSubmit={addList} />
          </div>

        </section>
      </main>
    </>
  );
};

export default Home;
