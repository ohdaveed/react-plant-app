import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

function PlantList(props) {
  const plants = props.plants.map((plant) => {
    return (
      <Card key={plant.id}>
        <Image src={plant.image} size="small" />
        <Card.Content>
          <Card.Header>{plant.name}</Card.Header>
          <Card.Description>{plant.scientific_name}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button>Delete Plant</Button>
          <Button>Edit Plant</Button>
        </Card.Content>
      </Card>
    );
  });

  return <Card.Group>{plants}</Card.Group>;
}

export default PlantList;
