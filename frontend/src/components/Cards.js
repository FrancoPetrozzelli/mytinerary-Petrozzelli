import {Card} from 'react-bootstrap'


const CardsMain = ({city}) => {
        const {place, image, country} = city
    return ( 
        <Card className='responsiveCards m-3'>
<Card.Img variant="top" src={image} />
<Card.Body>
    <Card.Title>{place}</Card.Title>
    <Card.Text>
    {country}
    </Card.Text>
</Card.Body>
</Card>
    );
}

export default CardsMain ;