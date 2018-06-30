// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import Checkbox from 'theme/assets/Checkbox';
import { api } from 'REST/api';

//Components
import Spinner from 'components/Spinner';
import Task from 'components/Task';

export default class Scheduler extends Component {

    state = {
        newTaskMessage:  '',
        tasksFilter:     '',
        isTasksFetching: false,
        tasks:           [],
    }

    componentDidMount () {
        this._fetchTasksAsync();
    }
    _updateTasksFilter = (e) => {
        const { value } = e.target;

        this.setState({ tasksFilter: value.toLocaleLowerCase() });
    }


    _updateNewTaskMessage = (e) => {
        const { value: newTaskMessage } = e.target;

        this.setState({ newTaskMessage });
    }

    _getAllCompleted = () => {
        const { tasks } = this.state;

        for (const task of tasks) {
            if (!task.completed) {
                return false;
            }
        }

        return true;
    }

    _setTasksFetchingState = (isTasksFetching) => {
        this.setState({ isTasksFetching });
    }

    _fetchTasksAsync = async () => {
        try {
            this._setTasksFetchingState(true);
            const tasks = await api.fetchTasks();

            this.setState({ tasks });
        } catch ({ message }) {
            console.log(message);
        } finally {
            this._setTasksFetchingState(false);
        }
    }

    _createTaskAsync = async (e) => {
        e.preventDefault();
        const { newTaskMessage } = this.state;

        if (newTaskMessage) {
            try {
                this._setTasksFetchingState(true);

                const task = await api.createTask(newTaskMessage);

                this.setState((prevState) => ({
                    // first argument prevState
                    tasks:          [task, ...prevState.tasks],
                    newTaskMessage: '',
                }));
            } catch ({ message }) {
                console.log(message);
            } finally {
                this._setTasksFetchingState(false);
            }
        }

        return null;
    }

    _updateTaskAsync = () => {

    }

    _removeTaskAsync = () => {

    }

    _completeAllTasksAsync = () => {

    }


    render () {
        const {
            tasksFilter,
            newTaskMessage,
            isTasksFetching,
            tasks,
        } = this.state;

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Spinner isSpinning = { isTasksFetching } />
                    <header>
                        <h1 className = { Styles.test }>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { tasksFilter }
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync }>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описaние моей новой задачи'
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button>
                                Добавить задачу
                            </button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>
                                { tasks.map((props) => {
                                    return <Task key = { props.id } { ...props } />;
                                }) }

                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { false }
                            color1 = '#363636'
                            color2 = '#fff'
                            height = { 25 }
                            width = { 25 }
                            onClick = { this._completeAllTasksAsync }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
