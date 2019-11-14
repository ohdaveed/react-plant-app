import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';

class CreatePlant extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      owner: '',
      breed: ''
    };
  }
  handleChange = (e) => {
    // es6 computed properties
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  render() {
    return (
      <Segment>
        <h4>Create Plant</h4>
        <Form onSubmit={(e) => this.props.addPlant(e, this.state)}>
          <Label>Plant:</Label>
          <Form.Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Label>Scientific Name:</Label>
          <Form.Input
            type="text"
            name="scientific_name"
            value={this.state.scientific_name}
            onChange={this.handleChange}
          />
          <Label>Order:</Label>
          <Form.Input
            type="text"
            name="ordr"
            value={this.state.ordr}
            onChange={this.handleChange}
          />
          <Label>Image</Label>
          <Form.Input
            type="text"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
          />
          <Button type="Submit">Create Plant</Button>
        </Form>
      </Segment>
    );
  }
}

export default CreatePlant;
