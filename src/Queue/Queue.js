import React from 'react';
import './Queue.css';

export default class Queue extends React.Component {
  static defaultProps = { people: [] };
  render() {
    return (
      <div className="adoption-queue">
        Current Adoption Queue:
        <div className="queue-people">
          {this.props.people.map((person, index) => {
            return (
              <p key={index}>
                {index + 1} : {person}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}