import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import ListSummary from "~/components/ListSummary/ListSummary";
import * as React from 'react';
import { useState } from 'react';
import AddList from "~/components/AddList/AddList";
import TaskItem from "~/components/TaskItem/TaskItem";
import { Plus } from "react-feather";



const Home: NextPage = () => {

  const [lists, setLists] = useState([{'id': 0, 'listName': 'Work', 'themeColour': 'pink'}, {'id': 1, 'listName': 'Personal', 'themeColour': 'lightblue'}])
  const [tasks, setTasks] = useState([
    {'id': 0, 'parentListId': 0, 'taskName': 'Test task', 'dueDate': new Date().toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': false },
    {'id': 1, 'parentListId': 1, 'taskName': 'Test task 2', 'dueDate': new Date().toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': false },
    {'id': 2, 'parentListId': 0, 'taskName': 'Test task 3', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 3, 'parentListId': 0, 'taskName': 'Test task 4', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 4, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 5, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 6, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 7, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 8, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 9, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 10, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 11, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 12, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 13, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 14, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 15, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 16, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
    {'id': 17, 'parentListId': 1, 'taskName': 'Test task 5', 'dueDate': new Date(Date.now() - 86400000).toISOString(), 'priority': undefined, 'taskNote': '', 'isComplete': true },
  ])

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

  const getParentListFromId = (id: number) => {
    const result = lists.find(list => list.id === id);
    return result || null;
  }

  const getTasksFromListId = (id: number) => {
    return tasks.filter(task => task.parentListId === id)
  }

  const addList = (listName:string, themeColour:string) => {
    setLists(prev => [...prev, {'id': generateUniqueListId(), 'listName': listName, 'themeColour': themeColour}])
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
            {lists.map(list => <ListSummary listName={list.listName} noOfTask={getTasksFromListId(list.id).length} key={list.id} themeColour={list.themeColour} />)}
            <AddList onSubmit={addList} />
          </div>
        </section>

        <section className="mb-4 overflow-y-auto overflow-x-visible h-[calc(100svh-15.75rem)]">
          <div>
            <h3 className="text-xs font-medium py-2 sticky top-0 bg-slate-100 z-[2]">Today</h3>
            <div className="flex flex-col gap-2">
              {tasks.map(task => {
                if (task.dueDate.slice(0, -14) == new Date().toISOString().slice(0, -14)) {
                  const parentList = getParentListFromId(task.parentListId);
                  const themeColour = parentList ? parentList.themeColour : '';
                  console.log(themeColour)
                  return (<TaskItem key={task.id} id={task.id} taskName={task.taskName} themeColour={themeColour} isComplete={task.isComplete} />)
                }
              })}
            </div>



            <h3 className="text-xs font-medium py-2 sticky top-0 bg-slate-100 z-[2]">Yesterday</h3>
            <div className="flex flex-col gap-2">
            {tasks.map(task => {
                if (task.dueDate.slice(0, -14) == new Date(Date.now() - 86400000).toISOString().slice(0, -14)) {
                  const parentList = getParentListFromId(task.parentListId);
                  const themeColour = parentList ? parentList.themeColour : '';
                  return (<TaskItem key={task.id} id={task.id} taskName={task.taskName} themeColour={themeColour} isComplete={task.isComplete} />)
                }
              })}
          </div>

          </div>
        </section>

        <div className="z-10 border fixed right-8 bottom-8 rounded-full p-4 bg-black/80 backdrop-blur-sm">
          <Plus className="text-white" />
        </div>

      </main>
    </>
  );
};

export default Home;
