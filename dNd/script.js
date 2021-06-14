const square = document.querySelector('.square');
square.ondragstart = () => false;

const getCoords = (item) => {
    const box = item.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

square.addEventListener('mousedown', (event) => {
    const coords = getCoords(square);
    const shiftX = event.pageX - coords.left;
    const shiftY = event.pageY - coords.top;

    square.classList.add('move');

    const moveAt = (event) => {
        square.style.left = event.pageX - shiftX +'px';
        square.style.top = event.pageY - shiftY +'px';
    }
    
    const theEnd = () => {
        document.removeEventListener('mousemove', moveAt);
        document.removeEventListener('mouseup', theEnd);
        square.classList.remove('move');
    }
    
    square.style.position = 'absolute';
    
    moveAt(event);
    square.style.zIndex = 1000;

    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', theEnd);
})

// console.log(getCoords(square));