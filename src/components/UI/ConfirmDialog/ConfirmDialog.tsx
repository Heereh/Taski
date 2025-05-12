// ConfirmDialog.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './ConfirmDialog.css';
import CustomButton from '../CustomButton/CustomButton';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
}

const ConfirmDialog: React.FC<Props> = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
}) => {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div
			className="confirm-dialog__overlay"
			onClick={onClose}>
			<div
				className="confirm-dialog"
				onClick={(e) => e.stopPropagation()}>
				<h2>{title}</h2>
				<p>{message}</p>
				<div className="confirm-dialog__buttons">
					<CustomButton
						backgroundColor="neutral"
						appearance="solid"
						onClick={onClose}>
						Cancelar
					</CustomButton>

					<CustomButton
						backgroundColor="danger"
						appearance="solid"
						onClick={() => {
							onConfirm();
							onClose();
						}}>
						Eliminar
					</CustomButton>
				</div>
			</div>
		</div>,
		document.body, // renderizado fuera del árbol drag-and-drop
	);
};

export default ConfirmDialog;
