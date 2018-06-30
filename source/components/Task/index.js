// Core
import React, { PureComponent } from 'react';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {
    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _setTaskEditingState = () => {

    }

    _updateTask = () => {

    }

    _getTaskShape = () => {

    }

    _updateNewTaskMessage = () => {

    }

    _updateTaskMessageOnClick = () => {

    }

    _cancelUpdatingTaskMessage = () => {

    }

    _updateTaskMessageOnKeyDown = () => {

    }

    _toggleTaskCompletedState = () => {

    }

    _toggleTaskFavoriteState = () => {

    }

    _toggleTaskCompletedState = () => {

    }

    _removeTask = () => {

    }

    render () {
        return <li className = { Styles.task }>Задача: стартовая точка</li>;
    }
}
