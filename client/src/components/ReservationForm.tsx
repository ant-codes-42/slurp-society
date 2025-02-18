import { useState } from 'react';

export default function ReservationForm({slot, incomingPartySize}: {slot: string, incomingPartySize: string}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [partySize, setPartySize] = useState(incomingPartySize);
    const slotId = slot;
    console.log(slotId); //temp logging

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'name') {
            setName(inputValue);
        } else if (inputType === 'email') {
            setEmail(inputValue);
        } else if (inputType === 'phone') {
            setPhone(inputValue);
        } else if (inputType === 'partySize') {
            setPartySize(inputValue);
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !phone || !partySize) {
            alert('Please fill out all fields');
            return;
        }

        //Add API call to create reservation
    };

    return (
        <div>
        <h1>Reservation Form</h1>
        <form onSubmit={handleFormSubmit}>
            <div>
            <label htmlFor="name">Name</label>
            <input type="text" value={name} onChange={handleInputChange} id="name" name="name" />
            <label htmlFor="email">Email</label>
            <input type="email" value={email} onChange={handleInputChange} id="email" name="email" />
            <label htmlFor="phone">Phone</label>
            <input type="phone" value={phone} onChange={handleInputChange} id="phone" name="phone" />
            <label htmlFor="partySize">Party Size</label>
            <input type="number" value={partySize} onChange={handleInputChange} id="partySize" name="partySize" defaultValue={incomingPartySize} />
            </div>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
        </div>
    );
}