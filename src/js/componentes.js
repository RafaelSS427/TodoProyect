import { Todo } from '../classes/todo.class'
import { todoList } from '../index'

const ulTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarComp = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters'); 
const anchorFiltros = document.querySelectorAll('.filtro');
const strongP = document.querySelector('strong');

export const setStrongPendiente = () => strongP.innerText = todoList.numeroPendientes();

export const crearTodoHTML = ( todo ) => { 
    const todoHtml = `
    <li class="${ (todo.completado) ? 'completed':''} " data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked':''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>   
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = todoHtml;
    ulTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

//eventos
txtInput.addEventListener('keyup', ( event ) => {

    if( event.keyCode === 13 && txtInput.value.length > 0 ){
        const todo = new Todo( txtInput.value );
        todoList.nuevoTodo( todo );

        crearTodoHTML( todo );
        setStrongPendiente();
        txtInput.value = '';
    }

});

ulTodoList.addEventListener('click', ( event ) => {
    
    const nombreElemento = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');

    if( nombreElemento.includes('input') ){
        todoList.marcarCompletado( todoId );
        todoElement.classList.toggle('completed');
        setStrongPendiente();    
    } else if( nombreElemento.includes('button') ){
        todoList.eliminarTodo( todoId );
        ulTodoList.removeChild( todoElement );
        setStrongPendiente();
    }
});

btnBorrarComp.addEventListener('click', (e) => {

    todoList.eliminarCompletados();
    todoList.numeroPendientes();
    //Mi forma de eliminar las tareas completadas
    // const elementosCompletados = document.querySelectorAll('.completed');
    // for (let i = 0; i < elementosCompletados.length; i++) {
    //     ulTodoList.removeChild(elementosCompletados[i])
    // }

    //Forma de eliminar las tareas por parte del profesor
    for (let i = ulTodoList.children.length-1; i >= 0; i--) {
        const elemento = ulTodoList.children[i];

        if(elemento.classList.contains('completed')){
            ulTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if(!filtro) return;

    anchorFiltros.forEach(elemento => elemento.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of ulTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});
    