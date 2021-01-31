const menuLink1 = document.querySelector('#menuLink1')
const menuLink2 = document.querySelector('#menuLink2')
const menuLink3 = document.querySelector('#menuLink3')
const menuLink4 = document.querySelector('#menuLink4')

const sectionIndex = document.querySelector('#index');
const sectionCalendar = document.querySelector('#calendar');
const sectionTodolist = document.querySelector('#todolistContainer');
// const sectionAddevent

menuLink1.addEventListener('click', () => {
    sectionCalendar.style.display = 'none';
    sectionTodolist.style.display = 'none';
    sectionIndex.style.display = 'block';
})

menuLink2.addEventListener('click', () => {
    sectionCalendar.style.display = 'block';
    sectionTodolist.style.display = 'none';
    sectionIndex.style.display = 'none';
})

menuLink4.addEventListener('click', () => {
    sectionCalendar.style.display = 'none';
    sectionTodolist.style.display = 'block';
    sectionIndex.style.display = 'none';
})