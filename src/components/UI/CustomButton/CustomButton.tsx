import React, { useRef } from 'react';
import './CustomButton.css';

interface CustomButtonProps {
	size?: 'small' | 'mediun' | 'large';
	backgroundColor?:
		| 'primary'
		| 'secondary'
		| 'danger'
		| 'neutral'
		| 'success'
		| 'custom';
	appearance?: 'solid' | 'outline' | 'ghost';
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	size = 'small',
	backgroundColor = 'primary',
	appearance = 'solid',
	children,
	type,
	onClick,
}) => {
	const className = `custom-button ${size} ${backgroundColor} ${appearance}`;
	return (
		<button
			className={className}
			type={type}
			onClick={onClick} // Llamamos al onClick que se pasa como props
		>
			{children}
		</button>
	);
};

export default CustomButton;
