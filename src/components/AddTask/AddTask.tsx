import { ArrowLeft, Code, Check } from "react-feather";
import * as React from 'react';
import { useState, Fragment } from 'react';
import { Listbox, Transition } from "@headlessui/react";

interface AddTaskProps {
  listNames: ListItem[];
  isOpen: boolean;
  onClose: (bool:boolean) => void;
  onSubmit: (parentListId:number, taskName:string, dueDate:Date, priority:number, taskNote:string) => void;
}

interface ListItem {
  id: number;
  listName: string;
  themeColour: string;
}


const AddTask = ({ listNames, isOpen, onClose, onSubmit }: AddTaskProps) => {
  const [listSelected, setListSelected] = useState<ListItem | undefined>(listNames[0]);

  const submit = () => {
    const taskName = (document.getElementById('newTaskName') as HTMLInputElement).value;
    // Create new task
    onSubmit(listSelected ? listSelected.id : 0, taskName, new Date, 0, 'Bruh')
    // Close new task view
    onClose(false)
    // Reset task name field
    const taskNameInput = document.getElementById('newTaskName') as HTMLInputElement | null;
    if (taskNameInput) {
      taskNameInput.value = '';
    }
  }


    return ( 
        <div className={`fixed w-full h-full bg-white z-30 top-0 left-0 p-8 ${isOpen ? '' : 'hidden'}`}>

            <div className="flex justify-between pb-8">
                <ArrowLeft onClick={() => onClose(false)} className="cursor-pointer transition hover:opacity-70" />
                <button className="text-blue-500 transition hover:opacity-70" onClick={submit}>Save</button>
            </div>

            <form action="/send-data-here" method="post">
                <input type="text" id="newTaskName" name="name" className="py-2 text-2xl rounded-md w-full transition focus:outline-none focus:placeholder-transparent" placeholder="Task name..." />

                {listSelected ? (
                  <Listbox value={listSelected} onChange={setListSelected}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative flex gap-2 items-center cursor-pointer rounded-full transition hover:bg-slate-200 bg-slate-100 py-1 px-4 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                          <div className="w-4 h-4 rounded bg-black" style={{backgroundColor: listSelected.themeColour}}></div>
                          <p className="block truncate pr-6">{listSelected.listName}</p>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                            <Code
                              className="h-3 w-3 text-gray-400 rotate-90"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {listNames.map((list, listIdx) => (
                              <Listbox.Option
                                key={listIdx}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                  }`
                                }
                                value={list}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {list.listName}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <Check className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                  </Listbox>
                ): (
                  <p>No lists found, create one to get started.</p>
                )}

{/* 
              <label htmlFor="dueDate">Due By</label><br></br>
              <input type="date" id="dueDate" name="dueDate" />
              <button type="submit">Submit</button> */}
            </form>

        </div>

     );
}

export default AddTask;