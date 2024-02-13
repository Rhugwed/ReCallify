let draggedItem = null;

document.addEventListener('DOMContentLoaded', function () {
    const dragItems = document.querySelectorAll('.drag-item');

    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
    });

    const submitButton = document.querySelector('button');
    submitButton.addEventListener('click', checkOrder);
});

function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    if (draggedItem !== e.target) {
        const container = document.getElementById('drag-container');
        const index1 = Array.from(container.children).indexOf(draggedItem);
        const index2 = Array.from(container.children).indexOf(e.target);
        container.insertBefore(draggedItem, e.target);
        updateItemIndexes(index1, index2);
    }
}

function updateItemIndexes(index1, index2) {
    const items = document.querySelectorAll('.drag-item');
    const temp = items[index1].dataset.index;
    items[index1].dataset.index = items[index2].dataset.index;
    items[index2].dataset.index = temp;
}

function checkOrder() {
    const correctOrder = [1, 2, 3, 4];
    const userOrder = Array.from(document.querySelectorAll('.drag-item')).map(item => parseInt(item.dataset.index));
    
    if (JSON.stringify(correctOrder) === JSON.stringify(userOrder)) {
        alert('Correct order! Well done!');
    } else {
        alert('Incorrect order. Try again!');
    }
}
