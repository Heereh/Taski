import { useState } from 'react';
import { Badge, Calendar, HStack } from 'rsuite';
import './Calender.css';

import { renderCell } from '../../lib/getTodoList';

const Calender = () => {
	const [selectedDate, setSelectedDate] = useState(null);

	const handleSelect = (date) => {
		setSelectedDate(date);
	};

	return (
		<div className="calender_container">
			<div className="calender--daily">
				<HStack
					spacing={10}
					style={{ height: 320 }}
					alignItems="flex-start"
					wrap>
					<Calendar
						compact
						renderCell={renderCell}
						onSelect={handleSelect}
						style={{ width: 320 }}
					/>
					{/* <TodoList date={selectedDate} /> */}
				</HStack>
			</div>
			{/* <div>
				{' '}
				<Calendar
					bordered
					cellClassName={(date) => (date.getDay() % 2 ? 'bg-gray' : undefined)}
				/>
			</div> */}
		</div>
	);
};

export default Calender;
