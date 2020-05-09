import React from "react";
import Form from "./components/Form";

const App = () => {
  let x = msg => {
    console.log(msg);
  }

  return (
    <div>
    <Form onSubmit={x}></Form>
    <div>
      data goes here...
    </div>
  </div>
  );
};

export default App;
