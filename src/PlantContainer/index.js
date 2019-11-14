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
	render() {
		return (
			<React.Fragment>
				<h2>Plants</h2>
				<PlantList plants={this.state.plants} />
				<CreatePlant />
			</React.Fragment>
		);
	}
}

export default PlantContainer;
