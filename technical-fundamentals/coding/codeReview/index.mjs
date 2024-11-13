// non-declarative naming
function mapArray(array) {
  return array.map((el) => !!el);
}

// use named parameters
function evaluateChallenge(challenge, result, candidate, difficulty) {
  if (challenge === result) {
    return `${candidate} has successfully completed the ${difficulty} challenge`;
  }
  return `${candidate}'s submission is incorrect`;
}

// Oversplitting functions - "The rule of 3"

function splitWords(str) {
  return str.split(" ");
}
function wordMapper(words) {
  hash = {};
  return words.map((word) => (hash[word] = hash[word] ? 0 : (hash[word] += 1)));
}

function wordCounter(string) {
  return wordMapper(splitWords(string));
}

// Avoid sideEffects

const tracker = {};

function countViews(key) {
  if (!tracker[key]) {
    tracker[key] = 0;
  }
  return tracker[key]++;
}

// Variables & Control Flow
/**
- Declarative Variable Naming
- Avoid Magic Numbers
- Avoid comments - code as documentation
- Avoid while loops
- Avoid large Conditional clauses
- Variable scoping
- Do not modify inputs
- Cyclomatic Complexity
    - Early returns
    - Replace nesting with variables or top level fn calls
*/

function parsePeople(people) {
  const groupA = []; // minors
  const groupB = []; // adults
  const groupC = []; // elderly

  let i = 0;
  while (i < people.length) {
    const person = people[i];
    if (person.age && person.age > 18) {
      if (person.age && person.age > 60) {
        groupC.push(person);
      } else {
        groupB.push(person);
      }
    } else if (person.age) {
      groupA.push(person);
    } else {
      delete people[i]; // remove invalid records
    }
    i++;
  }

  return [groupA, groupB, groupC];
}

// General Programming

// Dry

function initTicTacToe() {
  const board = Array(3)
    .fill(0)
    .map(() => Array(3));
  board[1][1] = "X";
  return board;
}

function initConnect4() {
  const board = Array(6)
    .fill(0)
    .map(() => Array(7));
  board[0][0] = "O";
  return board;
}

function initSudoku() {
  return Array(9)
    .fill(0)
    .map(() => Array(9));
}

// Over-abstractions

function passInterview(candidate, interview) {
  interview.finished();
  candidate.passed();
  candidate.submitOffer();
}

function failInterview(candidate, interview) {
  interview.finished();
  candidate.failed();
  candidate.submitFeedback();
}

function completeInterview(candidate, interview, result) {
  interview.finished();

  if (result === "passed") {
    candidate.passed();
    candidate.submitOffer();
  } else {
    candidate.failed();
    candidate.submitFeedback();
  }
}

// Atomicity

function transferMoney(sender, receiver, amount) {
  sender.funds -= amount;

  if (sender.funds < 0) {
    sender.funds += amount;
    throw new Error("Insufficient funds");
  }

  if (receiver.disabledUser()) {
    throw new Error("Receiver is unable to receive funds");
  }

  receiver.funds += amount;
  return [sender, receiver];
}

// General over specific

function formatSerialNames(name, version) {
  return `series-${name}-${version}`;
}

function formatProductNames(name, series) {
  return `${series}-product-${name}`;
}

// Error handling

// Defensive Programming (Bad!)

function validateUser(user) {
  if (typeof user !== "object" || user.constructor.name !== "User") {
    return false;
  }
  const hasName = !!user.name;
  return hasName;
}

// Invariant Programming (Good!)

function validateUser(user) {
  const validUser =
    typeof user === "object" && user.constructor.name === "User";
  console.assert(validUser, "Invalid user object", user);
  const hasName = !!user.name;
  return hasName;
}

// Error Management

// Catch what you can handle
// Add context
// Do not eat errors

const MAX_RETRIES = 3;

async function updateUserBad(user, retries) {
  try {
    await API.updateUser(user);
  } catch (e) {
    if (MAX_RETRIES === 3) {
      return;
    }

    if (isFetchError(e)) {
      return updateUserBad(user, retries + 1);
    }
    throw e;
  }

  return user;
}

async function updateUserGood(user, retries) {
  try {
    await API.updateUser(user);
  } catch (e) {
    if (MAX_RETRIES === 3) {
      throw new Error(
        `User ${user.id} was not updated after ${retries} retries.`,
      );
    }

    if (isFetchError(e)) {
      return updateUserGood(user, retries + 1);
    }
    console.warn(
      "Updating user ${user.id} has faield. Trying again after ${retries} retries.",
    );
    throw e;
  }

  return user;
}

// Cohesion vs Dependency

class StringUtils {
  stringCleaner(string) {
    return string.trim().replaceAll("%20", " ");
  }

  formatEmail(emailService) {
    let result = emailService.message;
    if (emailService.options.trim) {
      result = stringCleaner(string);
    }
    return result;
  }
}

class EmailService {
  message;
  options = { trim: true };

  constructor(message, options) {
    this.message = message;
    this.options = options;
  }
  sendEmail() {
    StringUtils.formatEmail(this);
  }
}

const emailService = new EmailService(" test email ", { trim: true });
emailService.sendEmail();
