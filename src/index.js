import './styles.css';

import { Todo, TodoList } from './classes'
import { crearTodoHTML } from './js/componentes'

export const todoList = new TodoList();

//todoList.todos.forEach(todo => crearTodoHTML(todo));
todoList.todos.forEach( crearTodoHTML );

console.log('Listo', todoList.todos);