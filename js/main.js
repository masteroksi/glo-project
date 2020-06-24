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

const handleChangeSallaryAbount = () => {
    buttonStart.disabled = salaryAmount.value === '';
};

const AppData = function () {
    this.income = {};
    this.expenses = {};
    this.addExpenses = [];
    this.addIncome = [];
    this.incomeMonth = 0;
    this.deposit = false;
    this.period = 5;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};
AppData.prototype.start = function () {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getExpensesMonth();
    this.getIncome();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudgetDay();
    this.showResults();

    this.toggleDataInputs(true);
    this.toggleRestartBtn(true);
};
AppData.prototype.reset = function () {
    this.resetDataInputs();
    this.toggleDataInputs(false);
    this.toggleRestartBtn(false);
    handleChangeSallaryAbount();
};
AppData.prototype.showResults = function () {
    inputBudgetMonthValue.value = this.budgetMonth;
    inputBudgetDayValue.value = this.budgetDay;
    inputExpensesMonthValue.value = this.expensesMonth;
    inputAdditionalExpensesValue.value = this.addExpenses.join(', ');
    inputAdditionalIncomeValue.value = this.addIncome.join(', ');
    inputTargetMonthValue.value = this.getTargetMonth();
    inputIncomePeriodValue.value = this.calcPeriod();
};
AppData.prototype.toggleDataInputs = function (isDisabled) {
    const allDataTextInputs = document.querySelectorAll('.data input[type=text]');
    allDataTextInputs.forEach(inputItem => {
        inputItem.disabled = isDisabled;
    });
};
AppData.prototype.resetDataInputs = function () {
    const allDataTextInputs = document.querySelectorAll('.data input[type=text]');
    allDataTextInputs.forEach(inputItem => {
        inputItem.value = '';
    });
};
AppData.prototype.toggleRestartBtn = function (isEndOfProgram) {
    if (isEndOfProgram) {
        buttonStart.style.display = 'none';
        buttonCancel.style.display = 'block';
    } else {
        buttonStart.style.display = 'block';
        buttonCancel.style.display = 'none';
    }
};
AppData.prototype.getAddIncome = function () {
    additionalIncomeItem.forEach(item => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getIncome = function () {
    incomeItems.forEach((item) => {
        const itemIncome = item.querySelector('.income-title').value.trim();
        const cashIncome = Number(item.querySelector('.income-amount').value.trim());
        if (itemIncome && cashIncome) {
            this.income[itemIncome] = cashIncome;
            this.incomeMonth += cashIncome;
        }
    });
};
AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, buttonPlusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        buttonPlusIncome.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function () {
    expensesItems.forEach((item) => {
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = +item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, buttonPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        buttonPlusExpenses.style.display = 'none';
    }
};
AppData.prototype.getAddExpenses = function () {
    let addExpenses = inputAdditionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getBudgetDay = function () {
    this.budgetDay = Math.floor(this.getBudget() / 30);
    return this.budgetDay;
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    return this.budgetMonth;
};
AppData.prototype.getExpensesMonth = function () {
    let sum = 0;
    for (const key in this.expenses) {
        const spendMoney = this.expenses[key];
        if (isNumber(spendMoney)) {
            sum += spendMoney;
        }
    }
    this.expensesMonth = sum;
    return sum;
};
AppData.prototype.getTargetMonth = function () {
    return Math.ceil(targetAmount.value / this.getBudget());
};
AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else if (this.budgetDay < 0) {
        return 'Что то пошло не так';
    }
};
AppData.prototype.getInfoDeposit = function () {
    if (appData.deposit) {
        do {
            this.percentDeposit = +prompt('годовой процент депозита?', '12');
        } while (isInvalidRequiredMoney(appData.percentDeposit));
        do {
            this.moneyDeposit = +prompt('   - сумма депозита?', '10000');
        } while (isInvalidRequiredMoney(appData.moneyDeposit));
    }
};
AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.asking = function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    this.addExpenses = addExpenses.toLowerCase().split(',');
    this.deposit = confirm('Есть ли у вас депозит в банке?');

    this.getInfoDeposit();
};
AppData.prototype.eventsListeners = function () {
    salaryAmount.addEventListener('input', handleChangeSallaryAbount);
    handleChangeSallaryAbount();

    buttonStart.addEventListener('click', this.start.bind(this));
    buttonPlusExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
    buttonPlusIncome.addEventListener('click', this.addIncomeBlock.bind(this));

    buttonCancel.addEventListener('click', this.reset.bind(this));

    const _this = this;
    periodSelect.addEventListener('input', function (ev) {
        periodAmount.innerText = ev.target.value;
        inputIncomePeriodValue.value = _this.calcPeriod();
    });
};

const appData = new AppData();
appData.eventsListeners();
console.log(appData);


