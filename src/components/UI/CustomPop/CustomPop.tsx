import React, { useEffect, useState } from 'react';
import { useBoardStore } from '../../../store/boardStore';
import CustomButton from '../CustomButton/CustomButton';
import './CustomPop.css';
interface CustomPopProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	types?: 'task' | 'board' | 'list';
	listId: string;
	onSubmit: (title: string) => void;
}

const CustomPop: React.FC<CustomPopProps> = ({
	isOpen,
	onClose,
	types,
	children,
	onSubmit,
	listId,
}) => {
	const { addTask, updateList, boards } = useBoardStore();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleCancel = () => {
		setTitle('');
		setDescription('');
		onClose();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim() && description.trim()) {
			const newTasks = {
				id: crypto.randomUUID(),
				title,
				descripcion: description,
			};
			addTask(newTasks, listId);
		}

		handleCancel();
	};
	if (!isOpen) return null;

	return (
		<div className="popup-overlay">
			<div className="popup-content">
				<h2>
					{(() => {
						let title = 'Tarea';
						if (types === 'board') {
							title = 'Tablero';
						} else if (types === 'list') {
							title = 'Lista';
						}
						return title;
					})()}
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Título de la tarea"
							/* value="1" */
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					{types === 'task' && (
						<div className="form-group">
							<textarea
								placeholder="Descripción de la tarea"
								value={description}
								onChange={(e) => setDescription(e.target.value)}></textarea>
						</div>
					)}
					<div className="button-group">
						<CustomButton
							onClick={() => {
								handleCancel();
							}}>
							Cancelar
						</CustomButton>
						<CustomButton type="submit">Crear Tarea</CustomButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CustomPop;
