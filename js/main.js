const money = 10,
    income = 'муж',
    addExpenses = 'машина,Дача,Шопинг',
    deposit = true,
    mission = 100000,
    period = 8;

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`, `Цель заработать ${mission} долларов`);

console.log(addExpenses.toLowerCase().split(','));

const budgetDay = money / 30;
console.log(budgetDay);
