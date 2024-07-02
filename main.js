// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива,
//который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
(function () {
  function createNumbersArray(count) {
    let arr = [];
    for (let i = 1; i <= (count * count / 2); i++) {
      arr.push(i);
      arr.push(i);
    }
    return arr;
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив
  // и возвращает перемешанный массив. arr - массив чисел

  function shuffle(arr) {
    let m = arr.length;
    let t, i;

    while (m) {

      i = Math.floor(Math.random() * m--);
      t = arr[m];
      arr[m] = arr[i];
      arr[i] = t;
    }

    return arr;
  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами.
  //На основе этого массива вы можете создать DOM-элементы карточек.
  //У каждой карточки будет свой номер из массива произвольных чисел.
  //Вы также можете создать для этого специальную функцию. count - количество пар.

  function createBoard(count, arr) {
    let board = document.getElementById('game-board');
    for (let child of board.children) {
      child.remove()
    };
    let list = document.createElement('ul');
    list.classList.add('list');


    for (let i = 0; i < (count * count); i++) {
      let elem = document.createElement('li');
      elem.classList.add('list__elem');
      let size = (1000 - (count * 5)) / count;
      elem.style.width = size + 'px';
      elem.style.height = size + 'px';
      elem.style.fontSize = (300 / count) + 'px';
      elem.textContent = arr[i];
      elem.addEventListener('click', () => {
        elem.classList.add('open');
      })
      list.append(elem);
    }

    board.addEventListener('click', () => {
      let cards = document.getElementsByClassName('open');
      if (cards.length === 2) {
        let a = parseInt(cards[0].textContent);
        let b = parseInt(cards[1].textContent);
        if (a === b) {
          cards[0].classList.add('yes');
          cards[1].classList.add('yes');
        }
        setTimeout(() => {
          cards = document.getElementsByClassName('open');
          while(cards.length>0) {
            cards[0].classList.remove('open');
          }
        }, 300);

      }
      cards = document.getElementsByClassName('yes');
      if (cards.length === (count * count)) {
        document.getElementById('win-btn').style.display = 'inherit';
        document.getElementById('win-text').style.display = 'inherit';
      }
    })
    board.append(list);
    return board;
  };

  function startGame(count) {
    console.log("start!");
    let arr = createNumbersArray(count);
    arr = shuffle(arr);
    let board = createBoard(count, arr);

  }

  function createGame() {

    const btn = document.getElementById('start-btn');

    let count = 4;
    btn.addEventListener('click', function () {
      count = document.getElementById('row-count').value;
      if ((count % 2) || (count < 2) || (count > 10)) {
        count = 4;
        document.getElementById('row-count').value = 4;
      }
      startGame(count);
      setInterval(() => startGame(count), 60000);
      const btn2 = document.getElementById('win-btn');
      btn2.addEventListener('click', () => {
        startGame(count);
        btn2.style.display = 'none';
        document.getElementById('win-text').style.display = 'none';
      });
    });


  }

  window.createGame = createGame;

})();
