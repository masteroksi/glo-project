'use strict';

const buttonStart = document.getElementById('start');
const buttonCancel = document.getElementById('cancel');
const buttonPlusIncome = document.getElementsByTagName('button')[0];
const buttonPlusExpenses = document.getElementsByTagName('button')[1];
const checkbox = document.querySelector('#deposit-check');
const [fieldIncomeItem1, fieldIncomeItem2] = document.querySelectorAll('.additional_income-item');

const inputBudgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const inputBudgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const inputExpensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const inputAdditionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const inputAdditionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const inputIncomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const inputTargetMonthValue = document.getElementsByClassName('target_month-value')[0];

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');


console.log(buttonStart);
console.log(buttonCancel);
console.log(buttonPlusIncome);
console.log(buttonPlusExpenses);
console.log(checkbox);
console.log(fieldIncomeItem1);
console.log(fieldIncomeItem2);

console.log(
    inputBudgetMonthValue,
    inputBudgetDayValue,
    inputExpensesMonthValue,
    inputAdditionalIncomeValue,
    inputAdditionalExpensesValue,
    inputIncomePeriodValue,
    inputTargetMonthValue,
);


// const isNumber = (n) => {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// };
//
//
// let money = 0;
// let start = () => {
//     do {
//         money = prompt('Ваш месячный доход?', 10000);
//     } while (!isNumber(money));
// };
// start();
//
// function isInvalidRequiredText(text) {
//     return text === null || text.trim() === '';
// }
//
// function isInvalidRequiredMoney(number) {
//     return number === null || !isNumber(number) || number <= 0;
// }
//
// let appData = {
//     income: {},
//     expenses: {},
//     addExpenses: [],
//     deposit: false,
//     mission: 100000,
//     period: 5,
//     budget: money,
//     budgetDay: 0,
//     budgetMonth: 0,
//     expensesMonth: 0,
//
//     percentDeposit: 0,
//     moneyDeposit: 0,
//
//     getBudgetDay() {
//         this.budgetDay = Math.floor(this.getBudget() / 30);
//         return this.budgetDay;
//     },
//     getBudget() {
//         this.budgetMonth = money - this.expensesMonth;
//         return this.budgetMonth;
//     },
//     getExpensesMonth() {
//         let sum = 0;
//         for (const key in this.expenses) {
//             const spendMoney = this.expenses[key];
//             if (isNumber(spendMoney)) {
//                 sum += spendMoney;
//             }
//         }
//         return sum;
//     },
//     getTargetMonth() {
//         return Math.ceil(this.mission / this.getBudget());
//     },
//     getStatusIncome() {
//         if (this.budgetDay >= 1200) {
//             return 'У вас высокий уровень дохода';
//         } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
//             return 'У вас средний уровень дохода';
//         } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
//             return 'К сожалению у вас уровень дохода ниже среднего';
//         } else if (this.budgetDay < 0) {
//             return 'Что то пошло не так';
//         }
//     },
//
//     getInfoDeposit() {
//         if (appData.deposit) {
//             do {
//                 appData.percentDeposit = +prompt('годовой процент депозита?', '12');
//             } while (isInvalidRequiredMoney(appData.percentDeposit));
//             do {
//                 appData.moneyDeposit = +prompt('   - сумма депозита?', '10000');
//             } while (isInvalidRequiredMoney(appData.moneyDeposit));
//         }
//     },
//     calcSavedMoney() {
//         return appData.budgetMonth * appData.period;
//     },
//     asking() {
//         let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
//         this.addExpenses = addExpenses.toLowerCase().split(',');
//         this.deposit = confirm('Есть ли у вас депозит в банке?');
//
//         for (let i = 0; i < 2; i++) {
//             let expensesItem;
//             do {
//                 expensesItem = prompt('Введите обязательную статью расходов?');
//             } while (isInvalidRequiredText(expensesItem));
//
//
//             let spendMoney;
//             do {
//                 spendMoney = +prompt('Во сколько это обойдется?');
//             } while (isInvalidRequiredMoney(spendMoney));
//
//             this.expenses[expensesItem] = spendMoney;
//         }
//
//         if (confirm('Есть ли дополнительный источник заработка ?')) {
//             let itemIncome;
//             do {
//                 itemIncome = prompt('наименование дополнительного источника заработка', 'English tutor');
//             } while (isInvalidRequiredText(itemIncome));
//
//             let cashIncome;
//             do {
//                 cashIncome = +prompt('сумма дополнительного заработка', '10000');
//             } while (isInvalidRequiredMoney(cashIncome));
//             appData.income[itemIncome] = cashIncome;
//             this.budget += cashIncome;
//         }
//
//         this.getInfoDeposit();
//     },
// };
// appData.asking();
// appData.getExpensesMonth();
//
// const newArr = [];
// for (let i = 0; i < appData.addExpenses.length; i++) {
//     const value = appData.addExpenses[i].trim();
//     const firstLetter = value[0];
//     const restLetters = value.substr(1, value.length - 1);
//     newArr[i] = firstLetter.toUpperCase() + restLetters;
// }
//
// console.log('Возможные расходы', newArr.join(', '));
// //
// //
// console.log('Расходы за месяц: ', appData.getExpensesMonth());
// console.log(`Цель будет достигнута через ${appData.getTargetMonth()} месяцов`);
// console.log('Уровень дохода', appData.getBudget());
// //
// console.log('Наша программа включает в себя данные:');
// for (const key in appData) {
//     const value = appData[key];
//
//     console.log(`${key} = ${value}`);
// }
