import React, { useState } from 'react';
import './dropdown.css';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Link } from 'react-router';

interface DropdownProps {
	title: string;
	children: React.ReactNode;
	icon?: React.ReactNode;
}

interface DropdownItemProps {
	to?: string;
	children: React.ReactNode;
	onClick?: () => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
	to,
	children,
	onClick,
}) => {
	if (to) {
		return (
			<Link
				to={to}
				className="dropdown-item">
				{children}
			</Link>
		);
	}
	return (
		<div
			className="dropdown-item"
			onClick={onClick}>
			{children}
		</div>
	);
};

const Dropdown: React.FC<DropdownProps> = ({ title, children, icon }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={`custom-dropdown ${isOpen ? 'open' : ''}`}>
			<button
				className="dropdown-toggle item--aside"
				onClick={() => setIsOpen(!isOpen)}>
				{icon}
				{title}
				<RiArrowDownSLine className={`arrow-icon ${isOpen ? 'open' : ''}`} />
			</button>
			{isOpen && <div className="dropdown-menu">{children}</div>}
		</div>
	);
};

export default Dropdown;
