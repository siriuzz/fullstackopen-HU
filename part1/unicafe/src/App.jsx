import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
        <StatisticLine text="average" value={props.average()} />
        <StatisticLine text="positive" value={`${props.positive()}%`} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getAverage = () => {
    if(good+neutral+bad == 0) return 0;
    const average = ((good)+(bad*(-1)))/(good+neutral+bad);
    return average;
  }

  const getPositiveFeedbackPercentage = () =>{
    if(good == 0) return 0;
    return (good/(good+neutral+bad))*100
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button text="good" onClick={()=>setGood(good+1)}/>
      <Button text="neutral" onClick={()=>setNeutral(neutral+1)}/>
      <Button text="bad" onClick={()=>setBad(bad+1)}/>

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} average={getAverage} positive={getPositiveFeedbackPercentage}/>
      
    </div>
  )
}

export default App