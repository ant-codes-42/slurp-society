import { useState, useEffect } from 'react';
import { getUserById } from '../api/userAPI';
import type { UserData } from '../interfaces/UserData';
import auth from '../utils/Auth';

export default function ReservationForm({ slot, incomingPartySize }: { slot: string, incomingPartySize: string }) {
    const [userObj, setUserObj] = useState<UserData>({
        id: null,
        email: null,
        name: null,
        phone: null,
        password: null,
    });
    const [specialRequests, setSpecialRequests] = useState('');
    const [partySize, setPartySize] = useState(incomingPartySize);
    const slotId = slot;
    console.log(slotId); //temp logging

    const [loginCheck, setLoginCheck] = useState(false);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if (loginCheck) {
            //Add decode token and API call to get user data
            setUserObj(prevState => ({
                ...prevState,
                id: auth.getProfile().id
            }));
        }
    }, [loginCheck]);

    useEffect(() => {
        if (userObj.id) {
            getUserById(userObj.id)
                .then((user) => {
                    console.log('User:', user);
                })
                .catch((error) => {
                    console.error('Error fetching user:', error);
                });
        }
    }, [userObj.id])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'specialRequests') {
            setSpecialRequests(inputValue);
        } else if (inputType === 'partySize') {
            setPartySize(inputValue);
        }
    };



    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Add API call to create reservation
    };

    return (
        <>
            {!loginCheck ? (
                <div>
                    <h1>Login to make a reservation</h1>
                </div>
            ) : (
                <div>
                    <h1>Reservation Form</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" value={userObj.name ? userObj.name : ''} id="name" name="name" />
                            <label htmlFor="email">Email</label>
                            <input type="email" value={userObj.email ? userObj.email : ''} id="email" name="email" />
                            <label htmlFor="phone">Phone</label>
                            <input type="phone" value={userObj.phone ? userObj.phone : ''} id="phone" name="phone" />
                            <label htmlFor="partySize">Party Size</label>
                            <input type="specialRequests" value={specialRequests} onChange={handleInputChange} id="specialRequests" name="specialRequests" />
                            <input type="number" value={partySize} onChange={handleInputChange} id="partySize" name="partySize" defaultValue={incomingPartySize} min={1} />
                        </div>
                        <div>
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}