import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useBoardStore } from '../../store/boardStore';

/* Component */
import Dropdown, { DropdownItem } from '../UI/Dropdown/Dropdown';

/* Icons & Styles */
import './aside.css';
import { RiArrowDownSLine } from 'react-icons/ri';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdSpaceDashboard } from 'react-icons/md';
import { MdListAlt } from 'react-icons/md';
import { MdCalendarMonth } from 'react-icons/md';
import FormAddBoard from '../UI/CreateForm/FormAddBoard';
import CustomButton from '../UI/CustomButton/CustomButton';

interface SidebarProps {
	isOpen: boolean;
	toggleSidebar: () => void;
}

const Aside: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
	const { boards, updateBoard } = useBoardStore();
	const [isOpenForm, setIsOpenForm] = useState(false);
	const handleCreateBoard = () => {
		setIsOpenForm(true);
	};
	const handleCancelForm = () => {
		setIsOpenForm(false);
	};

	return (
		<div className={`aside ${isOpen ? 'closed' : 'open'}`}>
			<div className="title__container">
				<Link
					to="/"
					className="title">
					Taski
				</Link>
				<button
					className="show__container"
					onClick={toggleSidebar}>
					<AiOutlineMenu className="toggle-btn" />
				</button>
			</div>

			<nav className="items__container">
				<Link
					to="/"
					className="item--aside">
					<MdSpaceDashboard />
					Dashboard
				</Link>
				<Dropdown
					title="Projectos"
					icon={<AiOutlineMenu />}>
					{boards.map((board) => (
						<DropdownItem
							key={board.id}
							to={`/board/${board.id}`}>
							{board.title}
						</DropdownItem>
					))}
					<DropdownItem
						onClick={() => {
							handleCreateBoard();
						}}>
						Nuevo Tablero
					</DropdownItem>
				</Dropdown>
				<li className="item--aside">
					<MdListAlt />
					Tareas
				</li>
				<Link
					to="/calender"
					className="item--aside">
					<MdCalendarMonth />
					Calendario
				</Link>
			</nav>

			<FormAddBoard
				isOpen={isOpenForm}
				onClose={() => {
					handleCancelForm();
				}}
			/>
		</div>
	);
};

export default Aside;
