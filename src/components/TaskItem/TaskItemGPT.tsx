import { useState } from 'react';


interface TaskItemProps {
  id: number;
  taskName: string;
  themeColour: string;
  isComplete: boolean;
  onDelete: (id: number) => void;
}

function TaskItem({ id, taskName, themeColour, isComplete, onDelete }: TaskItemProps) {

  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    const startPos = touch.clientX;
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      const dist = touch.clientX - startPos;
      if (dist > 0) {
        setSwipeDirection('right');
      } else if (dist < 0) {
        setSwipeDirection('left');
      }
    };
    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (swipeDirection === 'left') {
        onDelete(id);
      }
      setSwipeDirection(null);
    };
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchCancel = () => {
    setSwipeDirection(null);
  };

  const taskStyle = {
    transform: swipeDirection === 'left' ? 'translateX(-60px)' : 'none',
    transition: 'transform 0.2s ease-out',
  };

  return (
    <div
      className="task flex justify-between items-center p-4 bg-white border-b border-gray-200"
      onTouchStart={handleTouchStart}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchCancel}
      style={taskStyle}
    >
      <div className="task-title text-gray-800">{taskName}</div>
      <button
        className={`task-delete ml-4 text-white bg-red-500 rounded px-4 py-2 hover:bg-red-600 ${''}`}
        onClick={() => {onDelete(id), console.log('delete')}}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
