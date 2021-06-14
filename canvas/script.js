const canvas = document.getElementById('canvas');

const ctx = canvas.getContext("2d");

ctx.fillStyle = "gray";
ctx.fillRect(0, 0, 300, 300);

ctx.strokeStyle = "yellow";
ctx.strokeRect(20, 40, 40, 40);

ctx.fillStyle = "green";
ctx.fillRect(70, 10, 50, 50);

ctx.beginPath(); // Создаёт новый контур
ctx.moveTo(105,80); // Перемещает перо в точку с координатами x и y
ctx.lineTo(130,105); // Рисует линию с текущей позиции до позиции, определённой x и y
ctx.lineTo(130,55);
ctx.fillStyle = "red"; // Заливаем выбранным цветом фигуру
ctx.fill(); // Рисует фигуру с заливкой внутренней области.