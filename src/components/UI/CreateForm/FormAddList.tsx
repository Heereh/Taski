import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import { useBoardStore } from '../../../store/boardStore';
interface FormAddListProps {
	isOpen: boolean;
	onClose: () => void;
	boardId: string;
}

const FormAddList: React.FC<FormAddListProps> = ({
	isOpen,
	onClose,

	boardId,
}) => {
	const { addList } = useBoardStore();

	const [title, setTitle] = useState('');
	const handleCancel = () => {
		setTitle('');
		onClose();
	};

	const handleSubmitList = (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim()) {
			addList(boardId, {
				id: crypto.randomUUID(),
				title: title,
				tasks: [],
			});
		}
		handleCancel();
	};
	if (!isOpen) return null;
	return (
		<div className="popup-overlay">
			<div className="popup-content">
				<h2>List</h2>
				<form onSubmit={handleSubmitList}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Título de la lista"
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
						<CustomButton type="submit">Crear Lista</CustomButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FormAddList;
