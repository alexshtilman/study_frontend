This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

1. Write component Images and use them in the App component
   - In the classwork #24 we wrote component Clock allowing us to show h3 header with the current date and time. In this homework you should write component Images allowing us to show `<img>` with source containing URL of random picture
     - Attribute src in the element `<img>` should contain expression inside curly brackets, `<img src={this.state.imagesUrl}/>`
     - Initial state of the component Images should be as follows (https://loremflickr.com/ - site for getting random images, 300/300 is width=300, height=300, random=1 – for getting each time different images, 1 will be replace with 2, 2 with 3, and so on)
       `this.sate = {imagesUrl: “https://loremflickr.com/300/300?random=1”}`
     - Method updateImagesUrl should contain code for updating the state such way that each time the method is called the this.state.imagesUrl will contain `https://loremflickr.com/300/300?random=<new value>` , where new value is the updated number. First call random=2, second call random=3, etc. Note: the state update must be done only through method this.setState (see the classwork)
       - For updating the number you may define in constructor the field number `(this.number = 2)` and each time the number should be updated you may do this.number++
     - Method componentDidMount will contain code for setting interval in 5 seconds of the updateImagesUrl calls
     - Method componentWillUnmount will contain code for clearing the interval that is set in the method componentDidMount
   - Component App will contain code for incorporating the component Images such way that under header : “Images from the site https://loremflickr.com/” the random images will appear each 5 seconds
   - After writing code and getting the random images of the size 300x300 being updated in interval 5 seconds, try update code of both components App and Images such way that the width, height and interval are defined and properties in the App components. See classwork #24 where App passes user name as the property.
