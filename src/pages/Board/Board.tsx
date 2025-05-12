//Types & Hooks
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useBoardStore } from '../../store/boardStore';
import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

//styles & UI
import './board.css';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import ListColumn from '../../components/ListColumn/ListColumn';
import Card from '../../components/UI/Card/Card';
import FormAddList from '../../components/UI/CreateForm/FormAddList';
import ConfirmDialog from '../../components/UI/ConfirmDialog/ConfirmDialog';

//icon

const Board = () => {
	const navigate = useNavigate();
	const { boardId } = useParams();
	const sensors = useSensors(useSensor(PointerSensor));
	const { boards, removeBoard,  } =
		useBoardStore();
	const board = useMemo(
		() => boards.find((b) => b.id === boardId),
		[boards, boardId],
	);
	const [isListFormOpen, setIsListFormOpen] = useState(false);
	const [isConfirmDialog, SetIsConfirmDialog] = useState(false);

	const handleCreateList = () => {
		setIsListFormOpen(true);
	};

	const handleDelateBoard = (boardId: string) => {
		removeBoard(boardId);
		navigate('/');
	};

	const [draggedTask, setDraggedTask] = useState<Task | null>(null);
	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;

		const { boards } = useBoardStore.getState();

		for (const board of boards) {
			for (const list of board.lists) {
				const task = list.tasks.find((t) => t.id === active.id);
				if (task) {
					setDraggedTask(task);
					return;
				}
			}
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const { boards, updateList } = useBoardStore.getState();

		let sourceList: List | null = null;
		let destinationList: List | null = null;
		let activeTask: Task | null = null;

		for (const board of boards) {
			for (const list of board.lists) {
				const taskIndex = list.tasks.findIndex((t) => t.id === active.id);
				if (taskIndex !== -1) {
					sourceList = list;
					activeTask = list.tasks[taskIndex];
				}

				if (list.id === over.id || list.tasks.some((t) => t.id === over.id)) {
					destinationList = list;
				}
			}
		}

		if (!sourceList || !destinationList || !activeTask) return;

		// 👇 Si es la misma lista, usamos arrayMove para reordenar
		if (sourceList.id === destinationList.id) {
			const oldIndex = sourceList.tasks.findIndex((t) => t.id === active.id);
			const newIndex = destinationList.tasks.findIndex((t) => t.id === over.id);

			if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
				const reorderedTasks = arrayMove(sourceList.tasks, oldIndex, newIndex);
				updateList({ ...sourceList, tasks: reorderedTasks });
			}
			return;
		}

		// 👇 Si es entre listas diferentes
		const updatedSourceTasks = sourceList.tasks.filter(
			(t) => t.id !== active.id,
		);

		const overIndex = destinationList.tasks.findIndex((t) => t.id === over.id);
		const insertIndex =
			overIndex >= 0 ? overIndex : destinationList.tasks.length;

		const updatedDestinationTasks = [...destinationList.tasks];
		updatedDestinationTasks.splice(insertIndex, 0, activeTask);

		updateList({ ...sourceList, tasks: updatedSourceTasks });
		updateList({ ...destinationList, tasks: updatedDestinationTasks });
		setDraggedTask(null);
	};

	if (boardId && !boards) {
		return <div>Board not found</div>;
	}

	return (
		<DndContext
			sensors={sensors}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}>
			<main>
				<div className="main__Content">
					{board?.lists.map((list) => (
						<ListColumn
							key={list.id}
							listId={list.id}
							title={list.title}
							tasks={list.tasks}
							list={list}
						/>
					))}
					<div className="add-list-container">
						<CustomButton
							onClick={() => {
								handleCreateList();
							}}
							backgroundColor="primary"
							appearance="ghost">
							+ Añadir nueva lista
						</CustomButton>
					</div>
				</div>
				<div>
					<FormAddList
						isOpen={isListFormOpen}
						onClose={() => setIsListFormOpen(false)}
						boardId={boardId!}
					/>
					<CustomButton
						onClick={() => SetIsConfirmDialog(true)}
						backgroundColor="danger"
						appearance="outline">
						Borrar tablero
					</CustomButton>
					<ConfirmDialog
						isOpen={isConfirmDialog}
						onClose={() => SetIsConfirmDialog(false)}
						onConfirm={() => handleDelateBoard(boardId!)}
					/>
				</div>
			</main>
			<DragOverlay>
				{draggedTask ? (
					<Card
						task={draggedTask}
						isDragging={true}
					/>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

export default Board;
