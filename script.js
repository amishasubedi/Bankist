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

// total interest
const interest = account.movements
  .filter(function (movement) {
    return movement > 0;
  })
  .map(function (deposit) {
    return (deposit * account.interestRate) / 100;
  })
  .filter(function (int) {
    return int >= 1;
  })
  .reduce(function (accumulator, int) {
    return accumulator + int;
  }, 0);

const formattedInterest = new Intl.NumberFormat(account.locale, {
  style: 'currency',
  currency: account.currency,
}).format(interest);
labelSumInterest.textContent = `${formattedInterest}`;

//update UI
const updateUI = function (account) {
  // display movements
  displayMovements(account);

  // display balance
  calcDisplayBalance(account);

  // display summary
  calcDisplaySummary(account);
};

// set 5 minute Log Out Timer
const startLogOutTimer = function () {
  // initialize time to 5 minutes
  let time = 300;

  const timer = setInterval(function () {
    // call the timer every second
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // print remaining time in dashboard
    labelTimer.textContent = `${min}:${sec}`;

    // decrease time by 1 second
    time--;

    // when 0 seconds, log out user
    if (time === -1) {
      clearInterval(timer);

      // go back to login page
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
  }, 1000);

  return timer;
};

let currentAccount, timer;

btnLogin.addEventListener('click', function (event) {
  // prevent form from submitting (page reload)
  event.preventDefault();

  currentAccount = accounts.find(function (account) {
    return account.username === inputLoginUsername.value;
  });

  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    // display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Display Current Date under 'Current Balance' heading
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); // because it is zero based
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${month}/${day}/${year}, ${hour}:${min}`;
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    // start logout timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // update UI
    updateUI(currentAccount);
  }
});

  // Transfer Money
btnTransfer.addEventListener("click", function (event) {
  event.preventDefault(); // reload same page

  const amount = Math.floor(inputTransferAmount.value); // transfer amount

  const recieverAccount = accounts.find(function (account) { // find receiver by comparing username
    return account.username === inputTransferTo.value;
  });

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
