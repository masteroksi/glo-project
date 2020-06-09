'use strict';

let money = 10000,
    income = 'муж',
    addExpenses = 'машина,Дача,Шопинг',
    deposit = true,
    mission = 100000,
    period = 8;


// lesson04
money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = prompt('Во сколько это обойдется?');

const showTypeOf = () => [typeof money, typeof income, typeof deposit];
console.log('showTypeOf', showTypeOf().toString());

const getExpensesMonth = () => Number(amount1) + Number(amount2);
console.log('getExpensesMonth', getExpensesMonth());

const getAccumulatedMonth = () => money - getExpensesMonth();
const accumulatedMonth = getAccumulatedMonth();
const getTargetMonth = () => Math.ceil(mission / accumulatedMonth);

console.log(addExpenses.split(','));

console.log('getTargetMonth', getTargetMonth());

const budgetDay = Math.floor(accumulatedMonth / 30);
console.log('budgetDay', budgetDay);

const getStatusIncome = () => {
    if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (budgetDay < 600) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else if (budgetDay < 0) {
        return 'Что то пошло не так';
    }
};

alert(getStatusIncome());
