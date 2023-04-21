import { Component } from "react";
import { Container } from './Container/Container';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
  good: 0,
  neutral: 0,
  bad: 0,
  }

  updateState = (feedbackName) => {
    this.setState(prevState => {
      let newState = { ...prevState }
      
      newState[feedbackName] = prevState[feedbackName] + 1

      return newState
    })
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    return Math.floor((good / (this.countTotalFeedback()) * 100)) || 0;
  };
  
  render() {
    const keys = Object.keys(this.state);
    const total = this.countTotalFeedback();

    return (
      <Container>
        <Section title='Please leave feedback'>
          <FeedbackOptions options={keys} updateState={this.updateState} />
      </Section>
        <Section title='Statistics'>
          {total === 0 ?
            <Notification message="There is no feedback" /> :
            <Statistics
            options={keys}
            statistic={this.state}
            total={total}
            positiveFeedback={this.countPositiveFeedbackPercentage} />}
      </Section>
      </Container>
    )
  }
};