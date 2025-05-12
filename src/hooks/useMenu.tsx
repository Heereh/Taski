import { useState } from 'react';

function useMenu() {
	const [activeMenu, setActiveMenu] = useState<string | null>(null);

	// Función para abrir un menú y cerrar el anterior
	const toggleMenu = (menu: string) => {
		setActiveMenu((prev) => (prev === menu ? null : menu));
	};

	return { activeMenu, toggleMenu };
}

export default useMenu;
