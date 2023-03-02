import Checkbox from "../Checkbox/Checkbox";
import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { Trash2 } from "react-feather";


interface TaskItemProps {
  id: number;
  taskName: string;
  themeColour: string;
  isComplete: boolean;
  onDelete: (id: number) => void;
}

function TaskItem({ id, taskName, themeColour, isComplete, onDelete }: TaskItemProps) {
  const [isChecked, setIsChecked] = useState(isComplete);
  const [isPlaying, setIsPlaying] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [checkSound] = useSound('assets/check.wav', {volume: 0.5});
  const [unCheckSound] = useSound('assets/uncheck.wav', {volume: 0.5});



  // Detect left swipe
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50 
  const onTouchStart = (e) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = (e) => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      setSwipeDirection('left')
    } else if (isRightSwipe) {
      setSwipeDirection('right')
    } else {
      setSwipeDirection(null)
    }
  }


  const taskStyle = {
    transform: swipeDirection === 'left' ? 'translateX(-60px)' : 'none',
    transition: 'transform 0.2s ease-out',
  };

  const onCheckboxChange = () => {
    setIsChecked(prev => !prev);
    isChecked ? unCheckSound() : checkSound();
  };

  return ( 
    <div id={id.toString()+taskName.replace(' ', '')} className={`${isChecked ? 'opacity-50': ''} relative transition flex w-full h-12 items-center`} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className="flex items-center w-full gap-2 z-[1] overflow-hidden bg-white px-3 rounded-lg h-full" style={taskStyle}>
        <Checkbox isChecked={isChecked} onChange={onCheckboxChange} id={id} />
        <p className={`${isChecked ? 'line-through': ''} font-medium`}>{taskName}</p>
        <div className={`w-[0.75rem] h-[0.75rem] rounded ml-auto`} style={{ backgroundColor: themeColour}}></div>
        {/* <div className="bg-red-600 h-full flex justify-center items-center px-4 text-white"> */}
        {/* </div> */}
      </div>
      <Trash2 className="w-4 absolute right-3 z-[0] opacity-100" onClick={() => onDelete(id)} />
    </div>
  );
}

export default TaskItem;
