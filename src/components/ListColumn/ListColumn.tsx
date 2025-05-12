import React, { useEffect, useState } from 'react';
import { Dropdown } from 'rsuite';

import FormAddTask from '../UI/CreateForm/FormAddTask';
import Card from '../UI/Card/Card';
import './ListColumn.css';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useBoardStore } from '../../store/boardStore';
import { Task, List as ListType } from '@/types';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import ConfirmDialog from '../UI/ConfirmDialog/ConfirmDialog';
interface ListColumnProps {
	list: ListType;
	listId: string;
	title: string;
	tasks: Task[];
}

const ListColumn = ({ list, listId, title, tasks }: ListColumnProps) => {
	const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
	const [isConfirmDialog, setIsConfirmDialog] = useState(false);
	const { updateList, removeList } = useBoardStore();

	const { setNodeRef } = useDroppable({ id: list.id });

	const handleRemoveList = () => {
		removeList(listId);
	};

	const dropdownItems = [
		<Dropdown.Item
			key={1}
			onClick={() => setIsTaskFormOpen(true)}>
			Agregar Tarea
		</Dropdown.Item>,
		<Dropdown.Item
			key={3}
			onClick={() => setIsConfirmDialog(true)}>
			Borrar Lista
		</Dropdown.Item>,
		<Dropdown.Item key={2}>Editar Lista</Dropdown.Item>,
	];
	return (
		<div
			key={listId}
			className="completed list"
			id={`list-${listId}-tasks`}
			ref={setNodeRef}>
			<div className="list__title">
				<h2 className="title">{title}</h2>
				<Dropdown
					icon={<AiOutlineEllipsis style={{ width: 20, color: 'white' }} />}
					placement="rightStart"
					noCaret>
					{dropdownItems}
				</Dropdown>
				<FormAddTask
					isOpen={isTaskFormOpen}
					onClose={() => setIsTaskFormOpen(false)}
					listId={listId}
					onSubmit={() => setIsTaskFormOpen(false)}>
					Agregar tarea
				</FormAddTask>
			</div>

			<ul
				className="list__tasks"
				/* ref={setDroppableRef} */
				id={`list-${listId}-tasks`}
				data-list-id={listId}>
				<SortableContext
					items={tasks.map((task) => task.id)}
					strategy={verticalListSortingStrategy}>
					{tasks.map((task) => (
						<li key={task.id}>
							<Card
								task={task}
								isDragging={false}
							/>
						</li>
					))}
				</SortableContext>
			</ul>
			<ConfirmDialog
				isOpen={isConfirmDialog}
				onClose={() => setIsConfirmDialog(false)}
				onConfirm={handleRemoveList}
				message="¿Estás seguro de que deseas eliminar esta lista?"
			/>
		</div>
	);
};

export default ListColumn;
