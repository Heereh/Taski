import { useBoardStore } from '../../../store/boardStore';
import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import './CustomForm.css';
interface FormAddTaskProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	listId: string;
	onSubmit: (title: string) => void;
}

const FormAddTask: React.FC<FormAddTaskProps> = ({
	isOpen,
	onClose,
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
				<h2>Tarea</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Título de la tarea"
							/* value="1" */
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<textarea
							placeholder="Descripción de la tarea"
							value={description}
							onChange={(e) => setDescription(e.target.value)}></textarea>
					</div>
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

export default FormAddTask;
