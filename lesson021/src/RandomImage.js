import React from "react";

class RandomImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesUrl: "https://loremflickr.com/300/300?random=1",
      height: 300,
      weight: 300,
      random: 2,
      interval: 5000
    };
    this.updateImagesUrl = this.updateImagesUrl.bind(this);
  }
  updateImagesUrl() {
    this.setState({
      imagesUrl:
        "https://loremflickr.com/" +
        this.props.height +
        "/" +
        this.props.weight +
        "/?random=" +
        this.state.random,
      random: this.state.random + 1
    });
  }
  componentDidMount() {
    this.intervalId = setInterval(this.updateImagesUrl, this.state.interval);
  }
  componentDidUpdate(prevProps) {
    // Популярный пример (не забудьте сравнить пропсы):
    if (this.props.interval !== prevProps.interval) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.updateImagesUrl, this.props.interval);
    }
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.setState({
      imagesUrl: "https://loremflickr.com/",
      height: "300",
      weight: "300",
      random: 1
    });
  }

  render() {
    return (
      <React.Fragment>
        <img src={this.state.imagesUrl} alt="https://loremflickr.com/" />
        <h5>
          Img size: {this.props.height}X{this.props.weight} <br />
          Random: {this.state.random}
          <br />
          Random: {this.props.interval}
        </h5>
      </React.Fragment>
    );
  }
}

export default RandomImage;
