/**
  Naming
  Privacy
  separation of concerns
  Invalid states
  Composition(& Delegation) over Inheritance
*/

function codeRunner(submission) {
  return submission;
}

class Candidate {
  interviews = [];
  passedInterview;
  name;

  constructor(name) {
    this.name = name;
  }
}

class BaseInterview {
  expectation;
  candidate;
  submission;

  constructor(candidate) {
    this.candidate = candidate;
  }

  processSubmission(submission) {
    this.submission = submission;
    if (submission === expectation) {
      this.candidate.passedInterview = true;
    }
  }
}

class LiveCodingInterview extends BaseInterview {
  processSubmission(submission) {
    this.submission = submission;
    const result = this.codeRunner();
    if (result === this.expectation) {
      this.candidate.passedInterview = true;
    }
  }

  codeRunner() {
    return codeRunner(this.submission);
  }
}

const cand = new Candidate("Gabriel");
const interview = new LiveCodingInterview(cand);
cand.interviews.push(interview);
interview.processSubmission("submission");
console.assert(candidate.passedInterview);

// Alternative implementation

class Candidate {
  #interviews = [];
  #name;

  constructor(name) {
    this.name = name;
  }

  get name() {
    this.#name;
  }

  startInterview() {
    if (this.currentInterview()) {
      throw new Error(
        "Candidate has an active Interview. Do not start a new one",
      );
    }
    const interview = new LiveCodingInterview();
    this.#interviews.push(interview);
  }

  submit(code) {
    this.currentInterview.processSubmission(code);
  }

  get interviewStatus() {
    this.currentInterview.status();
  }

  currentInterview() {
    return this.#interviews.filter((int) => int.status === "pending")[0];
  }
}

class InterviewStatus {
  #expectation;
  #status = "pending";

  constructor(expectation) {
    this.#expectation = expectation;
  }

  processResults(results) {
    const passed = results === this.#expectation;
    this.#status = passed ? "passed" : "failed";
    return this.#status;
  }
}

class LiveCodingInterview {
  #interviewStatus;
  constructor() {
    this.#interviewStatus = new InterviewStatus("passed");
  }

  processSubmission(submission) {
    this.#interviewStatus.processResults(this.getResults());
    return this.#interviewStatus.status;
  }

  getResults() {
    return codeRunner(this.submission);
  }

  get status() {
    this.#interviewStatus.status();
  }
}

const candidate = new Candidate("Gabriel");
candidate.startLiveCodingInterview();
candidate.submit("code");
candidate.getInterviewStatus();
