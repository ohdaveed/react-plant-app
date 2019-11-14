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
			// createdPlantResponse variable will store the response from the express API
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

			// we are emptying all the plants that are living in state into a new array,
			// and then adding the plant we just created to the end of it
			// the new plant which is called parsedResponse.data

			this.setState({
				plants: [...this.state.plants, parsedResponse.data]
			});
		} catch (err) {
			console.log('error');
			console.log(err);
		}
		// request address will start with 'http://localhost:9000'
		// because after we create it, we want to add it to the plants array
	};
	deletePlant = async (id) => {
		console.log(id);

		const deletePlantResponse = await fetch(
			process.env.REACT_APP_API_URL + '/api/v1/plants/' + id,
			{ method: 'DELETE' }
		);

		// This is the parsed response from plant
		const deletePlantParsed = await deletePlantResponse.json();
		console.log(deletePlantParsed);
		// Now that the db has deleted our item, we need to remove it from state
		this.setState({
			plants: this.state.plants.filter((plant) => plant.id !== id)
		});
	};
	render() {
		return (
			<React.Fragment>
				<h2>Plants</h2>
				<PlantList
					plants={this.state.plants}
					deletePlant={this.deletePlant}
				/>
				<CreatePlant addPlant={this.addPlant} />
			</React.Fragment>
		);
	}
}

export default PlantContainer;
