'use strict';

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money = 0;
let start = () => {
    do {
        money = prompt('Ваш месячный доход?', 10000);
    } while (!isNumber(money));
};
start();

let appData = {
    income: {},
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 100000,
    period: 5,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    getBudgetDay() {
        this.budgetDay = Math.floor(this.getBudget() / 30);
        return this.budgetDay;
    },
    getBudget() {
        this.budgetMonth = money - this.expensesMonth;
        return this.budgetMonth;
    },
    getExpensesMonth() {
        let sum = 0;
        for (const key in this.expenses) {
            const spendMoney = this.expenses[key];
            if (isNumber(spendMoney)) {
                sum += spendMoney;
            }
        }
        return sum;
    },
    getTargetMonth() {
        return Math.ceil(this.mission / this.getBudget());
    },
    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else if (this.budgetDay < 0) {
            return 'Что то пошло не так';
        }
    },
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        this.addExpenses = addExpenses.toLowerCase().split(',');
        this.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            const expensesItem = prompt('Введите обязательную статью расходов?');
            const spendMoney = +prompt('Во сколько это обойдется?');
            this.expenses[expensesItem] = spendMoney;
        }
    },
};

appData.asking();
appData.getExpensesMonth();

console.log('Расходы за месяц: ', appData.getExpensesMonth());
console.log(`Цель будет достигнута через ${appData.getTargetMonth()} месяцов`);
console.log('Уровень дохода', appData.getBudget());

console.log("Наша программа включает в себя данные:");
for (const key in appData) {
    const value = appData[key];

    console.log(`${key} = ${value}`);
}
