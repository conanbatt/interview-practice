import { useState } from "react"

const qyas = [
  {
    question: 'is this bla?',
    type: 'single', // radio
    options: [
      { key: 'a', value: 'es la opcion a' },
      { key: 'b', value: 'es la opcion b' },
      { key: 'c', value: 'es la opcion c' },
    ],
    answers: ['a']
  },
  {
    question: 'is this bla bla bla?',
    type: 'multiple', // check
    options: [
      { key: 'a', value: 'es la opcion a' },
      { key: 'b', value: 'es la opcion b' },
      { key: 'c', value: 'es la opcion c' },
      { key: 'd', value: 'es la opcion d' },
    ],
    answers: ['b', 'd']
  }
]

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  arr1.sort();
  arr2.sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

export default function Questionnaire() {
  const [answers, setAnswers] = useState([])
  const [points, setPoints] = useState(undefined)

  const handleChange = (itemI, option, persist) => () => {
    const newAnswers = [...answers]
    if (persist){
      if (!newAnswers[itemI]) {
        newAnswers[itemI] = [option?.key]
      } else {
        if (newAnswers[itemI].includes(option.key)) {
          newAnswers[itemI] = newAnswers[itemI].filter(item => item !== option.key)
        } else {
          newAnswers[itemI].push(option.key)
        }
      }
    } else {
      newAnswers[itemI] = [option?.key]
    }

    setAnswers(newAnswers)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let _points = 0
    for(let i = 0; i < answers.length; i++) {
      if (arraysAreEqual(answers[i], qyas[i].answers)) {
        _points += 10
      }
    }
    setPoints(_points)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>
        Questionnaire solution
      </h1>
      {qyas.map((item, itemI) => {
        return <div key={item.question}>
          <h3>{item.question}</h3>
          {item.options.map(option => (
            <div key={option.key}>
              <label>
                {option.value}
                <input name={item.question} type={item.type === 'single' ? 'radio' : 'checkbox'} onChange={handleChange(itemI, option, item.type === 'multiple')} />
              </label>
            </div>
          ))}
        </div>
      })}
      <h3>
        <input type="submit" disabled={answers.filter(item => !!item).length !== qyas.length} />
      </h3>
      {points && <h2>Your points: {points}</h2>}
    </form>
  )
}
