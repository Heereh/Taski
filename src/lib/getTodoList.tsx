import { Badge } from 'rsuite';

export function getTodoList(date: any) {
	if (!date) {
		return [];
	}
	const day = date.getDate();

	switch (day) {
		case 10:
			return [
				{ time: '10:30 am', title: 'Meeting', id: 1 },
				{ time: '12:00 pm', title: 'Lunch', id: 2 },
			];
		case 15:
			return [
				{ time: '09:30 pm', title: 'Products Introduction Meeting', id: 3 },
				{ time: '12:30 pm', title: 'Client entertaining', id: 4 },
				{ time: '02:00 pm', title: 'Product design discussion', id: 5 },
				{ time: '05:00 pm', title: 'Product test and acceptance', id: 6 },
				{ time: '06:30 pm', title: 'Reporting', id: 7 },
			];
		default:
			return [];
	}
}

export function renderCell(date: any) {
	const list = getTodoList(date);

	if (list.length) {
		return <Badge className="calendar-todo-item-badge" />;
	}

	return null;
}
