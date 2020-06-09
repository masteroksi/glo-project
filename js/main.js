'use strict';

let money = 10000,
    income = 'муж',
    addExpenses = 'машина,Дача,Шопинг',
    deposit = true,
    mission = 100000,
    period = 8;

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`, `Цель заработать ${mission} долларов`);

console.log(addExpenses.toLowerCase().split(','));

let budgetDay = money / 30;
console.log(budgetDay);

// lesson03
money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = prompt('Во сколько это обойдется?');

const budgetMonth = money - amount1 - amount2;
console.log('budgetMonth', budgetMonth);

console.log('month count to the mission: ', Math.ceil(mission / budgetMonth));
budgetDay = Math.floor(budgetMonth / 30);
console.log('budgetDay', budgetDay);

if (budgetDay >= 1200) {
    alert('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
    alert('У вас средний уровень дохода');
} else if (budgetDay < 600) {
    alert('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    alert('Что то пошло не так');
}
