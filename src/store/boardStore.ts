import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
	Task as TasksTypes,
	Boards as BoardsTypes,
	List as ListTypes,
} from '../types';
import Board from '@/pages/Board/Board';

interface BoardStore {
	boards: BoardsTypes[];
	getBoards: () => BoardsTypes[];
	addBoard: (board: BoardsTypes) => void;
	updateBoard: (board: BoardsTypes) => void;
	removeBoard: (boardId: string) => void;
	addList: (boardId: string, list: ListTypes) => void;
	removeList: (listId: string) => void;
	updateList: (list: ListTypes) => void;
	addTask: (task: TasksTypes, listId: string) => void;
	updateTask: (task: TasksTypes) => void;
	removeTask: (task: TasksTypes) => void;
}

export const useBoardStore = create(
	persist<BoardStore>(
		(set, get) => ({
			boards: [] as BoardsTypes[],

			addBoard: (board) => {
				set(({ boards }) => {
					const newBoards = [...boards, board];
					return { boards: newBoards };
				});
			},

			removeBoard: (boardId: string) => {
				set(({ boards }) => {
					const newBoards = boards.filter((board) => board.id !== boardId);
					return { boards: newBoards };
				});
			},

			updateBoard: (board) => {
				set(({ boards }) => {
					const newBoards = boards.map((b) => (b.id === board.id ? board : b));
					return { boards: newBoards };
				});
			},

			addList: (boardId, list) =>
				set(({ boards }) => {
					const newBoards = boards.map((board) =>
						board.id === boardId
							? { ...board, lists: [...board.lists, list] }
							: board,
					);
					return { boards: newBoards };
				}),

			removeList: (listId: string) => {
				set(({ boards }) => {
					const newBoards = boards.map((board) => {
						board.lists = board.lists.filter((list) => list.id !== listId);
						return board;
					});
					return { boards: newBoards };
				});
			},

			updateList: (list) =>
				set(({ boards }) => {
					const newBoards = boards.map((board) => ({
						...board,
						lists: board.lists.map((l) => (l.id === list.id ? list : l)),
					}));
					return { boards: newBoards };
				}),

			addTask: (task, listId: string) => {
				set(({ boards }) => {
					const newBoards = boards.map((board) => ({
						...board,
						lists: board.lists.map((list) =>
							list.id === listId
								? { ...list, tasks: [...list.tasks, task] }
								: list,
						),
					}));
					return { boards: newBoards };
				});
			},

			updateTask: (task) => {
				set(({ boards }) => ({
					boards: boards.map((board) => ({
						...board,
						lists: board.lists.map((list) => ({
							...list,
							tasks: list.tasks.map((t) => (t.id === task.id ? task : t)),
						})),
					})),
				}));
			},
			removeTask: (task) => {
				set(({ boards }) => {
					const newBoards = boards.map((board) => ({
						...board,
						lists: board.lists.map((list) => ({
							...list,
							tasks: list.tasks.filter((t) => t.id !== task.id),
						})),
					}));
					return { boards: newBoards };
				});
			},

			getBoards: () => get().boards,
		}),
		{
			name: 'board-storage',
		},
	),
);
