import React from 'react';

import { Button, ButtonToolbar } from 'rsuite';
import { Input, InputGroup } from 'rsuite';

/*Icons and styles  */
import { AiFillGithub } from 'react-icons/ai';
import { AiOutlineMoon } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';

import './header.css';
import ToggleButton from '../UI/ToggleButton/ToggleButton';

const Header = () => {
	return (
		<header id="header">
			<nav className="nav__container">
				<div className="nav__search">
					{/* <Button appearance="default">
					</Button> */}

					<InputGroup inside>
						<Input placeholder="Busca tu trabajo" />
						<InputGroup.Button>
							<AiOutlineSearch />
						</InputGroup.Button>
					</InputGroup>
				</div>
				<div className="nav__items--contain">
					<ul className="nav__items">
						<li className="nav__item">
							<Button appearance="default">
								<AiFillGithub className="svg-button" />
							</Button>
						</li>
						<li className="nav__item">
							<ToggleButton></ToggleButton>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
