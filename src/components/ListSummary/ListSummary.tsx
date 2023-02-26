import { ArrowRight } from 'react-feather'


function ListSummary({ listName='', noOfTask=0, themeColour='#EC4899' }) {
    return ( 
        <>
            <div className="cursor-pointer group snap-start flex flex-col min-w-[9rem] max-w-[9rem] h-20 rounded-xl bg-white p-3 justify-between">
                <div className="flex items-center gap-2">
                  <div className="min-w-[0.75rem] min-h-[0.75rem] rounded" style={{ backgroundColor:themeColour }}></div>
                  <p className="text-xs font-medium text-ellipsis overflow-hidden whitespace-nowrap">{listName}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium whitespace-nowrap">{`${noOfTask} ${noOfTask === 1 ? 'Task' : 'Tasks'}`}</p>
                  <ArrowRight className="min-w-[1.5rem] group-hover:translate-x-1 transition" />
                </div>
            </div>
        </>
     );
}

export default ListSummary;