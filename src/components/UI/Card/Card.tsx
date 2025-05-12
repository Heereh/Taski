import { Badge, Dropdown } from 'rsuite';
import './card.css';
import { Task as TaskType } from '../../../types';

import { AiOutlineEllipsis } from 'react-icons/ai';
import { useBoardStore } from '../../../store/boardStore';
import { useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

interface CardProps {
	task: TaskType;
	isDragging: boolean;
}
const Card: React.FC<CardProps> = ({ task, isDragging = false }) => {
	const { id } = task;
	const [title, setTitle] = useState<string>(task.title);
	const { updateTask, removeTask } = useBoardStore();
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });
	const style = {
		transform: CSS.Transform.toString(transform) || undefined,
		transition,
	};
	const [isConfirmOpen, SetIsConfirmOpen] = useState(false);

	const handleDelate = () => {
		removeTask(task);
	};

	const handleConfirm = () => {
		SetIsConfirmOpen(true);
	};

	const items = [
		<Dropdown.Item key={1}>Editar tarea</Dropdown.Item>,
		<Dropdown.Item
			onClick={handleConfirm}
			key={2}>
			Borrar Tarea
		</Dropdown.Item>,
	];

	useEffect(() => {
		updateTask({
			...task,
			title,
		});
	}, [title]);

	return (
		<div
			className={`card__container ${isDragging ? 'isDragging' : ''}`}
			ref={setNodeRef}
			id={id}>
			<div
				className="card"
				{...attributes}
				{...listeners}>
				<div className="card__header__container">
					<h1 className="card__container--title">{task.title}</h1>
					<div className="card__container--badge">
						<Badge
							color="violet"
							content="Priority"
						/>
						<Badge
							color="cyan"
							content="In Progress"
						/>
					</div>
				</div>
				<div className="card__footer">
					<div className="card__footer--container">
						<p className="card__footer--container--descripcion">
							{task.descripcion}
						</p>
						<span className="line"></span>
						<p className="card__footer--date">15 Nov</p>
					</div>
				</div>
			</div>
			<div className="card__header--button">
				<Dropdown
					onPointerDown={(e) => {
						e.stopPropagation();
					}}
					icon={<AiOutlineEllipsis style={{ width: 14, color: 'white' }} />}
					placement="rightStart"
					noCaret
					active={false}>
					{items}
				</Dropdown>
			</div>

			<ConfirmDialog
				isOpen={isConfirmOpen}
				onClose={() => SetIsConfirmOpen(false)}
				onConfirm={handleDelate}
				title="¿Estás seguro?"
				message="Esta acción no se puede deshacer."
			/>
		</div>
	);
};

export default Card;
