import * as React from 'react';
import useBoolean from './hooks/useBoolean';
import useInterval from './hooks/useInterval';
import useDebounce from './hooks/useDebounce';

export function UseIntervalExample() {
  const [count, setCount] = React.useState(0);
  const [delay, setDelay] = React.useState(1000);
  const [isRunning, toggleIsRunning] = useBoolean(true);

  useInterval(
    () => {
      setCount(prev => prev + 1);
    },
    isRunning ? delay : null
  );

  return (
    <div>
      <h2>UseInterval hook</h2>
      <div>
        delay: <input value={delay} onChange={event => setDelay(Number(event.target.value))} />
      </div>
      <h4>count: {count}</h4>
      <div>
        <button onClick={toggleIsRunning}>{isRunning ? 'stop' : 'start'}</button>
      </div>
    </div>
  );
}

export function UseDebounceExample() {
  const DEBOUNCED_TIME = 2000;
  const [state, setState] = React.useState('Typing stopped');
  const [val, setVal] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');

  const [isReady, cancel] = useDebounce(
    () => {
      setState('Typing stopped');
      setDebouncedValue(val);
    },
    DEBOUNCED_TIME,
    [val]
  );

  return (
    <div>
      <h2>UseDebounce hook</h2>
      <h3>Debounced miliseconds: {DEBOUNCED_TIME}</h3>
      <h4>IsReady: {isReady() === true ? 'called' : isReady() === false ? 'pending' : 'cancelled'}</h4>

      <input
        type="text"
        value={val}
        placeholder="Debounced input"
        onChange={({ currentTarget }) => {
          setState('Waiting for typing to stop...');
          setVal(currentTarget.value);
        }}
      />
      <div>{state}</div>
      <div>
        Debounced value: {debouncedValue}
      </div>
      <button onClick={cancel}>Cancel debounce</button>
    </div>
  );
};

export default function Page() {
  const states = [
    {
      title: 'UseInterval hook',
      component: <UseIntervalExample />,
    },
    {
      title: 'UseDebouce hook',
      component: <UseDebounceExample />,
    }
  ];

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <header>
      <nav>
        {states.map((state, index) => (
          <button key={state.title} className={selectedIndex === index ? 'selected' : ''} onClick={() => setSelectedIndex(index)}>
            {state.title}
          </button>
        ))}
      </nav>
      <div>{states[selectedIndex].component}</div>
    </header>
  );
}
