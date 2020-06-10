'use strict';

let money = 10000,
    income = 'муж',
    addExpenses = 'машина,Дача,Шопинг',
    deposit = true,
    mission = 100000,
    period = 8;


// lesson05
// money = prompt('Ваш месячный доход?');
// addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// deposit = confirm('Есть ли у вас депозит в банке?');

const showTypeOf = () => [typeof money, typeof income, typeof deposit];
console.log('showTypeOf', showTypeOf().toString());

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = () => {
    do {
        money = prompt('Ваш месячный доход?', 10000);
    } while (!isNumber(money));
};
start();

let expenses = [];

const getExpensesMonth = () => {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        const spendMoney = +prompt('Во сколько это обойдется?');
        if (isNumber(spendMoney)) {
            sum += spendMoney;
        }
        console.log(expenses);
    }
    return sum;
};
const expensesAmount = getExpensesMonth();


const getAccumulatedMonth = () => money - expensesAmount;
const accumulatedMonth = getAccumulatedMonth();
const getTargetMonth = () => Math.ceil(mission / accumulatedMonth);

let targetMonth = getTargetMonth();
targetMonth = isNumber(targetMonth) ? targetMonth : 0;
console.log(expenses);

console.log('getTargetMonth', targetMonth);

const budgetDay = Math.floor(accumulatedMonth / 30);
console.log('budgetDay', budgetDay);

const getStatusIncome = () => {
    if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else if (budgetDay < 0) {
        return 'Что то пошло не так';
    }
};

const targetWillBeDone = () => {
    if (targetMonth > 0) {
        return `Цель будет достигнута через ${targetMonth} месяцов`;
    } else {
        return 'Цель не будет достигнута';
    }
};

alert(getStatusIncome());
alert(targetWillBeDone());


