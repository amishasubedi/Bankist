'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// display transaction history of user
const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // set inner HTML to empty string
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawl';
    // shaping each transaction by using html
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--deposit">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div> 
  </div>`;
  });

  containerMovements.insertAdjacentHTML('afterbegin', html); // add the layout in web page where afterbegin is the position
};
displayMovements(account1.movements);

// compute username for each user with their initials
const createUsername = accs => {
  //for (const i of accounts.owner) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split('')
      .map(name => name[0])
      .join('');
  });
};

// convert into USD
const eurToUsd = 1.1;
const movementsUSD = movements.map(mov => mov * eurToUsd);

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd); // manually created new array
}

// deposit and withdrawl message
const movementDescriptions = movements.map((mov, i, arr) => {
  `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
    mov
  )}`;
});

// filter withdrawl- display deposits
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

// filter deposit-display withdrawl
const withdrawl = movements.filter(function (mov) {
  return mov < 0;
});

// current balance of user
const currentBalance = function (account) {
  const balance = account.movements.reduce(function (
    accumulator,
    currentValue,
    i,
    arr
  ) {
    return accumulator + currentValue;
  },
  0);
};

const formattedBalance = new Intl.NumberFormat(account.locale, {
  style: 'currency',
  currency: account.currency,
}).format(balance);

labelBalance.textContent = `${formattedBalance}`;

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
