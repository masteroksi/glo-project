'use strict';

const buttonStart = document.getElementById('start');
const buttonCancel = document.getElementById('cancel');
const buttonPlusIncome = document.getElementsByTagName('button')[0];
const buttonPlusExpenses = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
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

const handleChangeSallaryAmount = () => {
    buttonStart.disabled = salaryAmount.value === '';
};

class AppData {
    constructor() {
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
    }

    start() {
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getExpensesMonth();
        this.getIncome();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudgetDay();

        if (!this.isValidData()) {
            this.toggleDataInputs(true);
            this.toggleRestartBtn(true);
            alert("Введите корректное значение")
        }
        if (!this.isValidPercent()) {
            this.toggleDataInputs(true);
            this.toggleRestartBtn(true);
            alert('Введите корректное значение в поле проценты')
        }

        this.showResults();

        this.toggleDataInputs(true);
        this.toggleRestartBtn(true);
    }

    reset() {
        this.resetDataInputs();
        this.toggleDataInputs(false);
        this.toggleRestartBtn(false);
        handleChangeSallaryAmount();

        depositCheck.checked = false;
        this.depositHandler();
    }

    showResults() {
        inputBudgetMonthValue.value = this.budgetMonth;
        inputBudgetDayValue.value = this.budgetDay;
        inputExpensesMonthValue.value = this.expensesMonth;
        inputAdditionalExpensesValue.value = this.addExpenses.join(', ');
        inputAdditionalIncomeValue.value = this.addIncome.join(', ');
        inputTargetMonthValue.value = this.getTargetMonth();
        inputIncomePeriodValue.value = this.calcPeriod();
    }

    isValidPercent() {
        return +this.percentDeposit >= 0 && +this.percentDeposit <= 100
    }

    isValidData() {
        return ![
            isNumber(+this.budget),
            isNumber(+this.budgetDay),
            isNumber(+this.budgetMonth),
            isNumber(+this.incomeMonth),
            isNumber(+this.expensesMonth),
            isNumber(+this.percentDeposit),
            isNumber(+this.moneyDeposit),
        ].includes(false)
    }

    toggleDataInputs(isDisabled) {
        const allDataTextInputs = document.querySelectorAll('.data input[type=text]');
        allDataTextInputs.forEach(inputItem => {
            inputItem.disabled = isDisabled;
        });
    }

    resetDataInputs() {
        const allDataTextInputs = document.querySelectorAll('.data input[type=text]');
        allDataTextInputs.forEach(inputItem => {
            inputItem.value = '';
        });
    }

    toggleRestartBtn(isEndOfProgram) {
        if (isEndOfProgram) {
            buttonStart.style.display = 'none';
            buttonCancel.style.display = 'block';
        } else {
            buttonStart.style.display = 'block';
            buttonCancel.style.display = 'none';
        }
    }

    getAddIncome() {
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getIncome() {
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value.trim();
            const cashIncome = Number(item.querySelector('.income-amount').value.trim());
            if (itemIncome && cashIncome) {
                this.income[itemIncome] = cashIncome;
                this.incomeMonth += cashIncome;
            }
        });
    }

    addIncomeBlock() {
        const cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, buttonPlusIncome);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonPlusIncome.style.display = 'none';
        }
    }

    getExpenses() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = +item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    addExpensesBlock() {
        const cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, buttonPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonPlusExpenses.style.display = 'none';
        }
    }

    getAddExpenses() {
        const addExpenses = inputAdditionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    getBudgetDay() {
        this.budgetDay = Math.floor(this.getBudget() / 30);
        return this.budgetDay;
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        return this.budgetMonth;
    }

    getExpensesMonth() {
        let sum = 0;
        for (const key in this.expenses) {
            if (this.expenses.hasOwnProperty(key)) {
                const spendMoney = this.expenses[key];
                if (isNumber(spendMoney)) {
                    sum += spendMoney;
                }
            }
        }
        this.expensesMonth = sum;
        return sum;
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.getBudget());
    }

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
    }

    getInfoDeposit() {
        if (appData.deposit) {
            do {
                this.percentDeposit = +prompt('годовой процент депозита?', '12');
            } while (isInvalidRequiredMoney(appData.percentDeposit));
            do {
                this.moneyDeposit = +prompt('   - сумма депозита?', '10000');
            } while (isInvalidRequiredMoney(appData.moneyDeposit));
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            // home-worck
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositBank.removeEventListener('change', this.changePercent);
        }
        this.deposit = depositCheck.checked;
    }

    eventsListeners() {
        salaryAmount.addEventListener('input', handleChangeSallaryAmount);
        handleChangeSallaryAmount();

        buttonStart.addEventListener('click', this.start.bind(this));
        buttonPlusExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
        buttonPlusIncome.addEventListener('click', this.addIncomeBlock.bind(this));

        buttonCancel.addEventListener('click', this.reset.bind(this));

        periodSelect.addEventListener('input', (ev) => {
            this.period = ev.target.value;
            periodAmount.innerText = ev.target.value;
            inputIncomePeriodValue.value = this.calcPeriod();
        });

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}

const appData = new AppData();
appData.eventsListeners();
console.log(appData);


