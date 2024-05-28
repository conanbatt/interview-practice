import { useState } from "react";
import styles from "./questionnaire.module.css";

function AddQuestion({ onSubmit }) {
  const [question, setQuestion] = useState();
  const [isMultiple, setIsMultiple] = useState(false);
  const [options, setOptions] = useState([{ value: "", isCorrect: false }]);

  const removeOption = (index) => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };

  const disabled = options.every(({ isCorrect }) => !isCorrect) || !question;

  const handleSubmit = () => {
    if (disabled) return;
    onSubmit({
      question,
      isMultiple,
      options,
    });
    setQuestion("");
    setIsMultiple(false);
    setOptions([{ value: "", isCorrect: false }]);
  };

  return (
    <div className={styles.AddQuestion}>
      <h4>Question</h4>
      <input
        type="text"
        value={question}
        onChange={({ target }) => setQuestion(target.value)}
      />
      <div>
        <h4>Answers</h4>
        <p>Write options and check the ones that are correct</p>
        <div>
          <input
            type="checkbox"
            checked={isMultiple}
            onChange={() => {
              setOptions((prev) =>
                prev.map((o) => ({ ...o, isCorrect: false }))
              );
              setIsMultiple((p) => !p);
            }}
          />
          <label>There is more than one correct answer</label>
        </div>
      </div>

      <div className={styles.options}>
        {options.map((option, index) => (
          <div className={styles.option} key={`${option}-${index}`}>
            <input
              type="text"
              value={option.value}
              onChange={({ target }) => {
                const optionsCopy = [...options];
                optionsCopy[index].value = target.value;
                setOptions(optionsCopy);
              }}
            />
            <button
              className={styles.secondary}
              onClick={() => removeOption(index)}
            >
              Delete
            </button>
            <input
              checked={option.isCorrect}
              onChange={() => {
                const optionsCopy = [...options];
                if (isMultiple) {
                  optionsCopy[index].isCorrect = !optionsCopy[index].isCorrect;
                  setOptions(optionsCopy);
                  return;
                }
                const unchecked = options.map((o) => ({
                  ...o,
                  isCorrect: false,
                }));
                unchecked[index].isCorrect = true;
                setOptions(unchecked);
              }}
              type={isMultiple ? "checkbox" : "radio"}
            />
          </div>
        ))}
        <button
          className={styles.secondary}
          onClick={() =>
            setOptions((prev) => [...prev, { value: "", isCorrect: false }])
          }
        >
          Add Option
        </button>
      </div>

      <button
        className={disabled ? styles.disabled : undefined}
        onClick={handleSubmit}
      >
        Submit question
      </button>
    </div>
  );
}

function Quiz({ questions }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(
    questions.map((question) => question.options.map((_) => false))
  );

  const currentQuestion = questions[index];

  const checkAnswers = () => {
    let correctAnswers = 0;

    for (let i = 0; i <= questions.length; i++) {
      const real = questions[i];
      const user = answers[i];

      if (JSON.stringify(real) === JSON.stringify(user)) {
        correctAnswers++;
      }
    }
    const score = 100 / (questions.length / correctAnswers);
    alert(`Your score is ${score}`);
  };

  return (
    <div className={styles.Quiz}>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.options.map((option, optionIndex) => (
        <div key={option} className={styles.option}>
          <input
            type={currentQuestion.isMultiple ? "checkbox" : "radio"}
            checked={answers[index][optionIndex]}
            onChange={() => {
              if (currentQuestion.isMultiple) {
                const copy = [...answers];
                copy[index][optionIndex] = !copy[index][optionIndex];
                setAnswers(copy);
                return;
              }
              const copy = [...answers];
              copy[index] = copy[index].map((_) => false);
              copy[index][optionIndex] = true;
              setAnswers(copy);
              return;
            }}
          />
          {option.value}
        </div>
      ))}
      {index < questions.length - 1 ? (
        <button onClick={() => setIndex((p) => p + 1)}>Next question</button>
      ) : (
        <button onClick={checkAnswers}>Done</button>
      )}
    </div>
  );
}

export default function Questionnaire() {
  const [screen, setScreen] = useState("setup");
  const [questions, setQuestions] = useState([]);
  return (
    <div className={styles.Questionnaire}>
      {screen === "setup" ? (
        <div>
          <h2>Questions</h2>

          <button onClick={() => setScreen("add-question")}>
            Add Question
          </button>
          <ol>
            {questions.map(({ question }) => (
              <li>{question}</li>
            ))}
          </ol>
          {questions.length > 0 && (
            <button onClick={() => setScreen("quiz")}>Next</button>
          )}
        </div>
      ) : screen === "add-question" ? (
        <AddQuestion
          onSubmit={(question) => {
            setQuestions((prev) => [
              ...prev,
              JSON.parse(JSON.stringify(question)),
            ]);
            setScreen("overview");
          }}
        />
      ) : (
        <Quiz questions={questions} />
      )}
    </div>
  );
}
