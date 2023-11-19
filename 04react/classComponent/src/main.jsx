import React from "react";
import ReactDOM from "react-dom/client";

class SayHello extends React.Component {
  constructor(props) {
    super(props);
    console.log("Componet created");
  }
  render() {
    console.log(this);
    return <p> Hello {this.props.name} </p>;
  }
}

function CounterDisplay({ count }) {
  if (count === 0) {
    return <p>{count}</p>;
  }
  if (count % 5 === 0 && count % 7 === 0) {
    return <p>FizzBuzz</p>;
  }

  if (count % 5 === 0) {
    return <p>Fizz</p>;
  }

  if (count % 7 === 0) {
    return <p>Buzz</p>;
  }

  return <p>{count}</p>;
}

function IncreaseButton({ increase }) {
  return (
    <div>
      <button onClick={increase}>+ increase</button>
    </div>
  );
}

function ResetButton({ reset }) {
  return (
    <div>
      <button onClick={reset}> reset </button>
    </div>
  );
}

class CounterApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };

    this.onIncrease = this.onIncrease.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  onIncrease() {
    this.setState((prev) => {
      return {
        count: prev.count + 1,
      };
    });
  }
  onReset() {
    this.setState(() => {
      return {
        count: 0,
      };
    });
  }
  render() {
    return (
      <div>
        <IncreaseButton increase={this.onIncrease} />
        <CounterDisplay count={this.state.count} />
        <ResetButton reset={this.onReset} />
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <SayHello name="Faqih" />
    <CounterApp />
  </div>
);
