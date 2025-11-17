import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Task, Category, Status, FilterType } from './types';
import Header from './components/Header';
import TaskList from './components/TaskList';
import CalendarPanel from './components/CalendarPanel';
import TaskModal from './components/TaskModal';
import { PlusIcon } from './components/Icons';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    
    const [filter, setFilter] = useState<FilterType>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (task: Omit<Task, 'id'>) => {
        const newTask: Task = { id: Date.now().toString(), ...task };
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const handleUpdateTask = (updatedTask: Task) => {
        setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const handleSetStatus = (taskId: string, status: Status) => {
        setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, status } : task));
    };

    const openModalForEdit = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const openModalForNew = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleSelectDate = useCallback((date: Date) => {
        setSelectedDate(date);
        setFilter('DATE');
    }, []);

    const filteredTasks = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const selected = new Date(selectedDate);
        selected.setHours(0,0,0,0);

        let filtered = tasks;

        switch(filter) {
            case 'TODAY':
                filtered = tasks.filter(t => new Date(t.startDate).toDateString() === today.toDateString());
                break;
            case 'TOMORROW':
                filtered = tasks.filter(t => new Date(t.startDate).toDateString() === tomorrow.toDateString());
                break;
            case 'DATE':
                filtered = tasks.filter(t => new Date(t.startDate).toDateString() === selected.toDateString());
                break;
            case 'DAILY':
            case 'WEEKLY':
            case 'MONTHLY':
            case 'YEARLY':
                filtered = tasks.filter(t => t.category === filter);
                break;
        }

        if (searchTerm) {
            const lowercasedSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(t =>
                t.title.toLowerCase().includes(lowercasedSearch) ||
                t.category.toLowerCase().includes(lowercasedSearch)
            );
        }

        return filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    }, [tasks, filter, searchTerm, selectedDate]);

    return (
        <div>
            <div className="app-container">
                <Header 
                    onSearch={setSearchTerm} 
                    onAddTask={openModalForNew}
                    onFilterChange={setFilter}
                    currentFilter={filter}
                />
                <main className="main-layout">
                    <div>
                        <TaskList
                            tasks={filteredTasks}
                            onDelete={handleDeleteTask}
                            onEdit={openModalForEdit}
                            onStatusChange={handleSetStatus}
                        />
                    </div>
                    <aside>
                        <CalendarPanel 
                            tasks={tasks}
                            selectedDate={selectedDate}
                            onSelectDate={handleSelectDate}
                        />
                    </aside>
                </main>
            </div>

            <button
                onClick={openModalForNew}
                className="fab"
                aria-label="Add new task"
            >
                <PlusIcon />
            </button>

            {isModalOpen && (
                <TaskModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onAddTask={handleAddTask}
                    onUpdateTask={handleUpdateTask}
                    taskToEdit={editingTask}
                />
            )}
        </div>
    );
};

export default App;
