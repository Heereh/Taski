import { useEffect, useRef } from 'react';

function useOutsideClick(callback: () => void) {
	// Usar ref general que pueda ser para cualquier tipo de HTML element
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [callback]);

	return ref;
}

export default useOutsideClick;
