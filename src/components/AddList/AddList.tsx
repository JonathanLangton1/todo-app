import * as React from 'react';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { TwitterPicker  } from 'react-color';
import { Plus } from 'react-feather';


type AddListProps = {
    onSubmit: (listName: string, themeColour: string) => void
  };

function AddList({ onSubmit }: AddListProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [listColour, setListColour] = useState('#000000')
    const [colourPickerVisible, setColourPickerVisible] = useState(false)


    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }

    return ( 
        <>
            <div onClick={openModal} className="cursor-pointer hover:border-slate-300 transition flex min-w-[8rem] h-20 rounded-xl border-2 border-dashed justify-center items-center">
                <Plus />
            </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 mb-4"
                    >
                      Create List 📃
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className='flex items-center gap-2 h-10 cursor-pointer'>
                          <div className='bg-slate-100 h-full w-10 rounded-md flex justify-center items-center' onClick={() => setColourPickerVisible(prev => !prev)}>
                              <div className='w-4 h-4 rounded' style={{backgroundColor: listColour}}></div>
                          </div>
                          <input type="text" id="newTaskName" placeholder="List name" className='bg-slate-100 px-4 py-2 rounded-md'></input>
                      </div>
                      {colourPickerVisible && <TwitterPicker className='mt-4' color={listColour} onChangeComplete={(color:{hex:string}) => setListColour(color.hex)} />}
                    </div>

                    <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
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