import './styles/StylesGlobal.css';
import './App.css';
import 'rsuite/dist/rsuite.min.css';
//components
import Aside from './components/aside/Aside';
import Header from './components/header/Header';
import Main from './pages/Board/Board';
import Footer from './components/footer/Footer';

//font
import '@fontsource-variable/yanone-kaffeesatz';
import '@fontsource/montserrat-alternates';
import '@fontsource-variable/maven-pro';

import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router';
import Board from './pages/Board/Board';
import Dashboard from './components/dashboard/Dashboard';
import Calender from './pages/Calender/Calender';

function App() {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className="app">
			<div className={`app-aside ${isOpen ? 'sidebarOpen' : 'sidebarClosed'}`}>
				<Aside
					isOpen={isOpen}
					toggleSidebar={toggleSidebar}></Aside>
			</div>

			<div className={`app-container ${isOpen ? 'expanded' : 'collapsed'}`}>
				<Header />
				<Routes>
					<Route
						path="/"
						element={<Dashboard />}
					/>
					<Route
						path="/board/:boardId"
						element={<Board />}
					/>
					<Route
						path="/calender"
						element={<Calender />}
					/>
				</Routes>
			</div>
		</div>
	);

	/* <div className={`container ${isOpen ? 'sidebarOpen' : 'sidebarClosed'}`}>
			<Aside
				isOpen={isOpen}
				toggleSidebar={toggleSidebar}
			/>
			<div className={`app ${isOpen ? 'expanded' : 'collapsed'}`}>
				<Header />
				<Outlet />
			</div>
		</div> */
}

export default App;
