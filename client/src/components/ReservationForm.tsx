import { useState, useEffect, useLayoutEffect } from 'react';
import { getUserById } from '../api/userAPI';
import type { UserData } from '../interfaces/UserData';
import { createReservation } from '../api/reservationAPI';
import { updateUser } from '../api/userAPI';
import { useNavigate } from 'react-router';
import auth from '../utils/Auth';

export default function ReservationForm({ slot, incomingPartySize }: { slot: string, incomingPartySize: string }) {
    const [userObj, setUserObj] = useState<UserData>({
        id: null,
        email: null,
        name: null,
        phone: null,
    });
    const [specialRequests, setSpecialRequests] = useState('');
    const partySize = incomingPartySize;
    const slotId = slot;
    console.log(slotId); //temp logging
    const navigate = useNavigate();

    const [loginCheck, setLoginCheck] = useState(false);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if (loginCheck) {
            //Add decode token and API call to get user data
            setUserObj(prevState => ({
                ...prevState,
                id: auth.getProfile().id,
                email: auth.getProfile().email
            }));
        }
    }, [loginCheck]);

    useEffect(() => {
        if (userObj.id) {
            getUserById(userObj.id)
                .then((user) => {
                    setUserObj(prevState => ({
                        ...prevState,
                        email: user.email,
                        name: user.name,
                        phone: user.phone
                    }));
                })
                .catch((error) => {
                    console.error('Error fetching user:', error);
                });
        }
    }, [userObj.id])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'specialRequests') {
            setSpecialRequests(inputValue);
        } else if (inputType === 'name') {
            setUserObj(prevState => ({
                ...prevState,
                name: inputValue
            }));
        } else if (inputType === 'email') {
            setUserObj(prevState => ({
                ...prevState,
                email: inputValue
            }));
        } else if (inputType === 'phone') {
            setUserObj(prevState => ({
                ...prevState,
                phone: inputValue
            }));
        }
    };



    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userObj.email) {
            alert('Please enter an email address');
            return;
        };

        updateUser(userObj)
            .then((response) => {
                console.log('User updated:', response);
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
        //Add API call to create reservation
        if (!userObj.id || !slotId) {
            console.error('User ID not found');
            return;
        } else if (userObj.id) {}
        createReservation(userObj.id, slotId, partySize, specialRequests)
            .then((response) => {
                console.log('Reservation created:', response);
                navigate('/reservation/confirmation');
            })
            .catch((error) => {
                console.error('Error creating reservation:', error);
            });
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
                            <input type="text" value={userObj.name ? userObj.name : ''} onChange={handleInputChange} id="name" name="name" />
                            <label htmlFor="email">Email</label>
                            <input type="email" value={userObj.email ? userObj.email : ''} onChange={handleInputChange} id="email" name="email" />
                            <label htmlFor="phone">Phone</label>
                            <input type="phone" value={userObj.phone ? userObj.phone : ''} onChange={handleInputChange} id="phone" name="phone" />
                            <label htmlFor="specialRequests">Special Requests</label>
                            <textarea value={specialRequests} onChange={handleInputChange} id="specialRequests" name="specialRequests" />
                            <label htmlFor="partySize">Party Size</label>
                            <input type="number" value={incomingPartySize} onChange={handleInputChange} id="partySize" name="partySize" />
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