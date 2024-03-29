/*
// Задание #1

// 1. помещает console.log в callback queue
// 5. возвращается в callback queue, достает это, помещает в call stack, выполняет, и удаляет из call stack - соответственно setTimeout - 4-я строчка, которая выведится в консоль
setTimeout(() => {
  console.log("setTimeout");
}, 0);

// 2. макрозадача - выводит в консоль слово Promise - соответственно - это первое что будет выведено в консоль
const promise = new Promise((resolve) => {
  console.log("Promise");
  resolve();
});

// 3. микрозадача, созданная Промисом, ее движок поместит в microtask queue, и соответственно это задача выполнится сразу после макрозадачи - то есть Promise resolve - это третья строчка, которая выведится в консоль
promise.then(() => {
  console.log("Promise resolve");
});

// 4. макрозадача - самая главная макрозадача - это выполнение кода, то есть когда код идет от первой строчки до последней соответсвенно End - это вторая строчка, которая выведится в консоль
console.log("End");
*/
/*
Итого по заданию 1, будет вывод в следующем порядке:
Promise
End
Promise resolve
setTimeout

????? Вопрос: в видео-лекции говорилось про порядок вызова у Event Loop - и по этой логике, ответ как выше, и так и выводится в консоль если запустить код,
но текстовой лекции было написано, что сразу после КАЖДОЙ макрозадачи движок выполняет все задачи из очереди микрозадач перед тем как выполнить следующую макрозадачу.
Соответственно вопрос весь код от первой строчки до последней - это считается как ОДНА макрозадача? Потому что после первой макрозадачи Promise кажется что должна выполниться микрозадача Promise resolve, и только затем переходить к следующей макрозадачи слову End. Чуть-чуть сбивает значение слова КАЖДОЙ макрозадачи. Что подразумевается под КАЖДОЙ макрозадачей? Спасибо.
*/
/*
// Задание #2

function runCode() {
  console.log("before promise");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Zero Promise");
      resolve();
    }, 0);
  });
}

// 1. Помещает это в callback queue
// 4. Из callback queue достается в порядке очериди и выводится третьим в консоль Zero
setTimeout(() => {
  console.log("Zero");
}, 0);

// 2. Вызывает функцию, первым выводится в консоль before promise так как макрозадача, далее помещает setTimeout в callback queue
// 5. из callback queue достается в порядке очериди и четвертым выводится в консоль Zero Promise
// 6. исполняется Промис fulfilled и помещается в microtask queue, так как других задач больше нет, сразу исполняется и пятым выводится в консоль Zero Promise Invoked
runCode().then(() => console.log("Zero Promise Invoked"));

// 3. вторым выводится One так как макрозадача
console.log("One");
*/
/*
Итого по заданию #2 в консоль выведится в следующем порядке:
before promise
One
Zero
Zero Promise
Zero Promise Invoked
*/

// Задание #3
const getData = (callback) => {
  fetch("https://jsonplaceholder.typicode.com/users/1")
    //   3. помещается в microtask queue и выполняется после выполнения макрозадач
    .then((response) => response.json())
    //   4. помещается в microtask queue и выполняется после выполнения макрозадач
    .then((user) => {
      // 5. вторым выводится в консоль Success
      console.log("Success");
      //   6. помещается в callback queue и выполняется после выполнения микротасков
      callback(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

getData(() => {
  // 2. здесь передается callback и код что ниже начнет выполнятся как код в функции достигнет callback(user)
  //   6.1. начинает исполнятся callback и третьим в консоль выведится user received
  console.log("user received");
  const promise = new Promise((resolve) => {
    // 7. помещается в callback queue и выполняется через 500 милисекунд и после микротасков
    setTimeout(() => {
      // 11. через 500 милисекунд исполняется промис, удаляется из callback queue и переход на пункт 12.
      resolve("promise resolved");
    }, 500);
    // 8. четвертым выводится в консоль in promise
    console.log("in promise");
    // 9. помещается в callback queue и выполняется через 400 милисекунд и после микротасков
    setTimeout(() => {
      // 10. пятым в консоль выводится last set timeout
      console.log("last set timeout");
    }, 400);
  });
  //  12. помещается в microtask queue и выполняется после выполнения макрозадач
  promise.then((result) => {
    // 13. шестым в консоль выводится promise resolved
    console.log(result);
  });
});

// 1. макрозадача - первым в консоль выведится End
console.log("End");

/*
Итого по заданию #3 в консоль будет вывод в следующем порядке:
End
Success
user received
in promise
last set timeout
promise resolved
*/
