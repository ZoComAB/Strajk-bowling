import './Booking.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Top from '../components/Top/Top';
import Navigation from '../components/Navigation/Navigation';
import BookingInfo from "../components/BookingInfo/BookingInfo";
import Shoes from "../components/Shoes/Shoes";
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

function Booking() {
    const [booking, setBooking] = useState({
        when: "",
        time: '',
        lanes: 0,
        people: 0,
        shoes: []
    });
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function updateBookingDetails(event) {
        const { name, value } = event.target;

        setBooking(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function updateShoes(event) {
        const { value } = event.target;

        if (value.length === 2) {
            setBooking(prevState => ({
                ...prevState,
                ['shoes']: [...prevState.shoes, value]
            }));
        }
    }

    async function sendBooking(bookingInfo) {
        const response = await fetch('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', {
            method: 'POST',
            headers: {
                'x-api-key': '738c6b9d-24cf-47c3-b688-f4f4c5747662'
            },
            body: JSON.stringify(bookingInfo)
        });
        const data = await response.json();

        return data;
    }

    function comparePeopleAndShoes() {
        return parseInt(booking.people) === booking.shoes.length;
    }

    async function book() {
        setError(!error);

        if (booking.when && booking.lanes 
            && booking.time && comparePeopleAndShoes()) {
                const bookingInfo = {
                    when: `${booking.when}T${booking.time}`,
                    lanes: booking.lanes,
                    people: booking.people,
                    shoes: booking.shoes
                }
        
                const confirmation = await sendBooking(bookingInfo);
                navigate('/confirmation', { state: { confirmationDetails: confirmation }});
        } else {
            setError(!error);
        }
    }

    return (
        <section className='booking'>
            <Navigation />
            <Top title="Booking" />
            <BookingInfo updateBookingDetails={ updateBookingDetails } />
            <Shoes updateShoes={ updateShoes } />
            <button className="button booking__button" onClick={ book }>strIIIIIike!</button>
            { error ? <ErrorMessage /> : '' }
        </section>
    )
}

export default Booking;