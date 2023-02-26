import Checkbox from "../Checkbox/Checkbox";
import React, { useState } from 'react';
import useSound from 'use-sound';


interface TaskItemProps {
  id: number;
  taskName: string;
  themeColour: string;
  isComplete: boolean;
}

function TaskItem({ id, taskName, themeColour, isComplete }: TaskItemProps) {
    const [isChecked, setIsChecked] = useState(isComplete);
    const [checkSound] = useSound('assets/check.wav', {volume: 0.5});
    const [unCheckSound] = useSound('assets/uncheck.wav', {volume: 0.5});
    const [isPlaying, setIsPlaying] = useState(false);

  const onCheckboxChange = () => {
    setIsChecked(prev => !prev);
    isChecked ? unCheckSound() : checkSound();
  };

  return ( 
    <div className={`${isChecked ? 'opacity-50': ''} transition flex bg-white p-3 rounded-lg gap-2 items-center`}>
      <Checkbox isChecked={isChecked} onChange={onCheckboxChange} id={id} />
      <p className={`${isChecked ? 'line-through': ''} font-medium`}>{taskName}</p>
      <div className={`w-[0.75rem] h-[0.75rem] rounded ml-auto`} style={{ backgroundColor: themeColour}}></div>
    </div>
  );
}

export default TaskItem;
