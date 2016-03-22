import { createStore } from 'redux';

const defaultTodos = [
    {
        task: 'Initial todo in store',
        state: 'pending',
    },
];

const defaultState = {
    todos: defaultTodos,
    allTodos: defaultTodos,
    filter: 'pending',
};

function todoStore(state = defaultState, action) {
    switch (action.type) {
    case 'ADD_TODO': {
        const allTodos = state.allTodos.concat([{
            task: action.task,
            state: 'pending',
        }]);
        return Object.assign({}, state, {
            allTodos,
            todos: allTodos.filter(todo => todo.state === state.filter),
        });
    }
    case 'DONE_TODO': {
        const doneTodo = Object.assign({}, action.todo, {
            state: 'done',
        });
        const updatedAllTodos = state.allTodos.map((todo) => {
            return todo === action.todo ? doneTodo : todo; // if the todo is the one from the action, replace it with the done todo, else leave it alone
        });
        return Object.assign({}, state, {
            allTodos: updatedAllTodos,
            todos: updatedAllTodos.filter(todo => todo !== action.todo), // this says keeps all the todos except for the one that was removed
        });
    }
    case 'TOGGLE_STATE':
        const filter = state.filter === 'pending' ? 'done' : 'pending';
        return Object.assign({}, state, {
            filter,
            todos: state.allTodos.filter(todo => todo.state === filter),
        });
    default:
        return state;
    }
}

export default createStore(todoStore);
