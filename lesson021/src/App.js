import React from "react";
import RandomImage from "./RandomImage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 300,
      weight: 300,
      interval: 5000,
      data: { height: 300, weight: 300, interval: 5000 }
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeInterval = this.changeInterval.bind(this);
    this.updateData = this.updateData.bind(this);
  }
  handleChange(e) {
    this.setState({
      height: e.target.value,
      weight: e.target.value
    });
  }
  changeInterval(e) {
    this.setState({
      interval: e.target.value
    });
  }
  updateData() {
    this.setState({
      data: {
        height: this.state.height,
        weight: this.state.weight,
        interval: this.state.interval
      }
    });
  }
  render() {
    return (
      <div
        style={{
          margin: "0 auto",
          marginTop: "25px",
          width: "600px",
          border: "1px solid black",
          padding: "25px",
          textAlign: "center"
        }}
      >
        <h1>Images from the site https://loremflickr.com/</h1>
        <RandomImage
          height={this.state.data.height}
          weight={this.state.data.weight}
          interval={this.state.data.interval}
        />
        <select onChange={this.handleChange}>
          <option value="300">300x300 </option>
          <option value="400">400x400</option>
          <option value="600">600x600</option>
        </select>
        <input onChange={this.changeInterval} value={this.state.interval} />
        <button onClick={this.updateData}>update</button>
      </div>
    );
  }
}

export default App;
