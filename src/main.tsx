import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router';
import { DndContext } from '@dnd-kit/core';

import App from './App';
import Calender from './pages/Calender/Calender';
import Main from './pages/Board/Board';
import Dashboard from './components/dashboard/Dashboard';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true, // Esta es la ruta por defecto ("/")
				element: <Dashboard />,
			},
			{
				path: '/calender',
				element: <Calender />,
			},
			{ path: '/board/:boardId', element: <Main /> },
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
