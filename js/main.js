'use strict';

const buttonStart = document.getElementById('start');
const buttonCancel = document.getElementById('cancel');
const buttonPlusIncome = document.getElementsByTagName('button')[0];
const buttonPlusExpenses = document.getElementsByTagName('button')[1];
const checkbox = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

const inputBudgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const inputBudgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const inputExpensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const inputAdditionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const inputAdditionalIncomeItem = document.querySelectorAll('.additional_income-item');
const inputAdditionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputIncomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const inputTargetMonthValue = document.getElementsByClassName('target_month-value')[0];

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');


const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
let incomeItems = document.querySelectorAll('.income-items');

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


function isInvalidRequiredText(text) {
    return text === null || text.trim() === '';
}

function isInvalidRequiredMoney(number) {
    return number === null || !isNumber(number) || number <= 0;
}

//
let appData = {
    income: {},
    expenses: {},
    addExpenses: [],
    addIncome: [],
    incomeMonth: 0,
    deposit: false,
    period: 5,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    percentDeposit: 0,
    moneyDeposit: 0,

    start() {
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getExpensesMonth();
        this.getIncome();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudgetDay();
        this.showResults();
    },
    showResults() {
        inputBudgetMonthValue.value = this.budgetMonth;
        inputBudgetDayValue.value = this.budgetDay;
        inputExpensesMonthValue.value = this.expensesMonth;
        inputAdditionalExpensesValue.value = this.addExpenses.join(', ');
        inputAdditionalIncomeValue.value = this.addIncome.join(', ');
        inputTargetMonthValue.value = this.getTargetMonth();
        inputIncomePeriodValue.value = this.calcPeriod();
    },

    getAddIncome() {
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    },
    getIncome() {
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value.trim();
            const cashIncome = Number(item.querySelector('.income-amount').value.trim());
            if (itemIncome && cashIncome) {
                this.income[itemIncome] = cashIncome;
                this.incomeMonth += cashIncome;
            }
        });
    },
    addIncomeBlock() {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, buttonPlusIncome);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonPlusIncome.style.display = 'none';
        }
    },
    getExpenses() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = +item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addExpensesBlock: function () {
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, buttonPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonPlusExpenses.style.display = 'none';
        }
    },
    getAddExpenses: function () {
        let addExpenses = inputAdditionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    },
    getBudgetDay() {
        this.budgetDay = Math.floor(this.getBudget() / 30);
        return this.budgetDay;
    },
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
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
        this.expensesMonth = sum;
        return sum;
    },
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.getBudget());
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

    getInfoDeposit() {
        if (appData.deposit) {
            do {
                this.percentDeposit = +prompt('годовой процент депозита?', '12');
            } while (isInvalidRequiredMoney(appData.percentDeposit));
            do {
                this.moneyDeposit = +prompt('   - сумма депозита?', '10000');
            } while (isInvalidRequiredMoney(appData.moneyDeposit));
        }
    },
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    },
    asking() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        this.addExpenses = addExpenses.toLowerCase().split(',');
        this.deposit = confirm('Есть ли у вас депозит в банке?');


        this.getInfoDeposit();
    },
};

buttonStart.disabled = true;
salaryAmount.addEventListener('input', () => {
    buttonStart.disabled = salaryAmount.value === '';
});

buttonStart.addEventListener('click', () => {
    appData.start();
});
buttonPlusExpenses.addEventListener('click', () => {
    appData.addExpensesBlock();
});
buttonPlusIncome.addEventListener('click', () => {
    appData.addIncomeBlock();
});

periodSelect.addEventListener('input', (ev) => {
    periodAmount.innerText = ev.target.value;
    inputIncomePeriodValue.value = appData.calcPeriod();
});


// const newArr = [];
// for (let i = 0; i < appData.addExpenses.length; i++) {
//     const value = appData.addExpenses[i].trim();
//     const firstLetter = value[0];
//     const restLetters = value.substr(1, value.length - 1);
//     newArr[i] = firstLetter.toUpperCase() + restLetters;
// }

// console.log('Возможные расходы', newArr.join(', '));
//
//
// console.log('Расходы за месяц: ', appData.getExpensesMonth());
// console.log(`Цель будет достигнута через ${appData.getTargetMonth()} месяцов`);
// console.log('Уровень дохода', appData.getBudget());
//
// console.log('Наша программа включает в себя данные:');
// for (const key in appData) {
//     const value = appData[key];
//
//     console.log(`${key} = ${value}`);
// }
