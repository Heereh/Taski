import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import { useBoardStore } from '../../../store/boardStore';
interface FormAddBoardProps {
	isOpen: boolean;
	onClose: () => void;
}

const FormAddBoard: React.FC<FormAddBoardProps> = ({ isOpen, onClose }) => {
	const { addBoard } = useBoardStore();

	const [title, setTitle] = useState('');
	const handleCancel = () => {
		setTitle('');
		onClose();
	};

	const handleSubmitBoard = (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim()) {
			addBoard({
				id: crypto.randomUUID(),
				title: title,
				lists: [],
			});
		}
		handleCancel();
	};
	if (!isOpen) return null;
	return (
		<div className="popup-overlay board">
			<div className="popup-content">
				<h2>Crear nuevo tablero</h2>
				<form onSubmit={handleSubmitBoard}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Titulo del board"
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>

					<div className="button-group">
						<CustomButton
							onClick={() => {
								handleCancel();
							}}>
							Cancelar
						</CustomButton>
						<CustomButton type="submit">Crear board</CustomButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FormAddBoard;
