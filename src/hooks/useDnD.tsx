import { Task } from '@/types';
import { dragAndDrop } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';

import React from 'react';

interface useDnDProps {
	listId: string;
}

const useDnD: React.FC<useDnDProps> = ({ listId }) => {
	const [dragRef] = dragAndDrop<HTMLUListElement, Task>({});
};

export default useDnD;
