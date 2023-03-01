import * as React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { TwitterPicker  } from 'react-color';
import { Plus, ChevronDown, X } from 'react-feather';


type AddListProps = {
    onSubmit: (listName: string, themeColour: string) => void
  };

function AddList({ onSubmit }: AddListProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [listColour, setListColour] = useState('#000000')
    const [colourPickerVisible, setColourPickerVisible] = useState(false)

    const toggleColourPicker = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setColourPickerVisible(prev => !prev)
      // Prevent keyboard from going, causing janky UX
      document.getElementById('newTaskName')?.focus()
    }

    function closeModal() {
        setIsOpen(false)
        setColourPickerVisible(false)
      }
    
    function openModal() {
      setIsOpen(true)
    }

    return ( 
        <>
            {/* Add list button */}
            <div onClick={openModal} className="cursor-pointer hover:border-slate-300 transition flex min-w-[8rem] h-20 rounded-xl border-2 border-dashed justify-center items-center">
                <Plus />
            </div>

          {/* Modal box to add new list */}
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => undefined}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="fixed bottom-0 w-full max-w-md transform overflow-visible rounded-t-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <X className='absolute right-6 cursor-pointer' onClick={closeModal} />
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 mb-8"
                        >
                          Create List 📃
                        </Dialog.Title>
                        <div className="mt-2">
                          {colourPickerVisible && <TwitterPicker triangle='hide' color={listColour} className='bottom-[8rem] z-20' onChange={(color:{hex:string}) => {setListColour(color.hex); setColourPickerVisible(false); document.getElementById('newTaskName')?.focus()}} />}
                          <div className='flex items-center gap-2 h-10 cursor-pointer'>
                              <div className='bg-slate-100 h-full w-20 rounded-md flex justify-evenly items-center' onClick={(e: React.MouseEvent<HTMLDivElement>) => toggleColourPicker(e)} >
                                  <div className='w-4 h-4 rounded' style={{backgroundColor: listColour}}></div>
                                  <ChevronDown className={`stroke-2 w-4 transition ${colourPickerVisible ? 'rotate-180' : ''}`} />
                              </div>
                              <input type="text" id="newTaskName" placeholder="List name" className='bg-slate-100 px-4 py-2 rounded-md w-full'></input>
                          </div>
                        </div>

                        <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            closeModal();
                            const newTaskNameElement = document.getElementById('newTaskName') as HTMLInputElement;
                            if (newTaskNameElement !== null) {
                              onSubmit(newTaskNameElement.value, listColour);
                            }
                          }}
                        >
                          Create
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
     );
}

export default AddList;