import React, { useEffect, useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import { AiOutlineMoon } from 'react-icons/ai';

const ToggleButton = () => {
	const [isDarkMode, SetIsDarkMode] = useState(false);

	useEffect(() => {
		const systemTheme = window.matchMedia(
			'(prefers-color-scheme:dark)',
		).matches;
		const saveTheme = localStorage.getItem('theme');

		if (!saveTheme) {
			SetIsDarkMode(systemTheme);
		} else {
			SetIsDarkMode(saveTheme === 'dark');
		}
	}, []);

	const toggleTheme = () => {
		SetIsDarkMode(!isDarkMode);
		localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
	};

	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.add('dark-mode');
		} else {
			document.body.classList.remove('dark-mode');
		}
	});

	return (
		<CustomButton onClick={toggleTheme}>
			<AiOutlineMoon className="svg-button" />
		</CustomButton>
	);
};

export default ToggleButton;
