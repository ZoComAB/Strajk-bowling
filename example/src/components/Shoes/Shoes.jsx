import './Shoes.scss';
import { useState } from 'react';

import Input from '../Input/Input';

function Shoes({ updateShoes }) {
    const [shoeInputs, setShoeInputs] = useState([]);

    function handleClick() {
        const label = `Shoe size / person ${shoeInputs.length + 1}`;
        const shoeInput = <Input label={ label } type='text'
            customClass='shoes__input'
            key={ `shoe-${shoeInputs.length + 1}` }
            handleChange={ updateShoes } />

        setShoeInputs((prevState) => [...prevState, shoeInput]);
    }

    return (
        <section className="shoes">
            <header>
                <h2 className="shoes__heading">Shoes</h2>
            </header>
            { shoeInputs }
            <button className="shoes__button" onClick={ handleClick }>+</button>
        </section>
    )
}

export default Shoes;