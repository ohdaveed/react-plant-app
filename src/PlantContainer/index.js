import React from 'react';
import PlantList from '../PlantList';
import CreatePlant from '../CreatePlantForm';

class PlantContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			plants: []
		};
	}
	componentDidMount() {
		this.getPlants();
	}
	getPlants = async () => {
		try {
			const plants = await fetch(
				process.env.REACT_APP_API_URL + '/api/v1/plants/'
			);
			const parsedPlants = await plants.json();
			console.log(parsedPlants);

			this.setState({
				plants: parsedPlants.data
			});
		} catch (err) {
			console.log(err);
		}
	};
	addPlant = async (e, plantFromTheForm) => {
		e.preventDefault();
		console.log(plantFromTheForm);

		// Post Request

		try {
			// We have to send JSON
			// createdDogResponse variable will store the response from the express API
			const createdPlantResponse = await fetch(
				process.env.REACT_APP_API_URL + '/api/v1/plants/',
				{
					method: 'POST',
					body: JSON.stringify(plantFromTheForm),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			// we have to turn the response from flask into
			// an object we can use
			const parsedResponse = await createdPlantResponse.json();
			console.log(parsedResponse, ' this is response');

			// we are emptying all the dogs that are living in state into a new array,
			// and then adding the dog we just created to the end of it
			// the new dog which is called parsedResponse.data

			this.setState({
				plants: [...this.state.plants, parsedResponse.data]
			});
		} catch (err) {
			console.log('error');
			console.log(err);
		}
		// request address will start with 'http://localhost:9000'
		// because after we create it, we want to add it to the dogs array
	};
	render() {
		return (
			<React.Fragment>
				<h2>Plants</h2>
				<PlantList plants={this.state.plants} />
				<CreatePlant addPlant={this.addPlant} />
			</React.Fragment>
		);
	}
}

export default PlantContainer;
