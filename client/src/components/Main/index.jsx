import styles from "./styles.module.css";
import React, { useState, useEffect } from 'react';

const Main = () => {
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [count, setCount] = useState(0);

	const [ticket, setTicket] = useState(0);
	const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
	const [ticketPrice, setTicketPrice] = useState(220);
	const [movies, setMovies] = useState([
		{ title: 'Godzilla vs Kong', price: 220 },
		{ title: 'Radhe', price: 320 },
		{ title: 'RRR', price: 250 },
		{ title: 'F9', price: 260 },
	]);

	useEffect(() => {
			const storedSelectedArrays = localStorage.getItem('selectedSeatsArray');
			if(storedSelectedArrays){
			populateUI();
		}
		const storedSelectedMovieIndex = localStorage.getItem('selectedMovieIndex');
		if (storedSelectedMovieIndex) {
			setSelectedMovieIndex(parseInt(storedSelectedMovieIndex, 10));
		}
	}, []);


	useEffect(() => {
		const storedSelectedArrays = localStorage.getItem('selectedSeatsArray');
		if (storedSelectedArrays) {
			populateUI();
		}

	}, [selectedSeats])

	const populateUI = () => {
		debugger
		const selectedSeatsArrayString = localStorage.getItem('selectedSeatsArray');
		const selectedSeatsArray = JSON.parse(selectedSeatsArrayString)
		console.log(selectedSeatsArray);

		selectedSeatsArray.forEach((seatIndex) => {
				const rowElement = document.querySelector(`.seat:nth-child(${seatIndex + 1})`);
				if (rowElement) {
				  rowElement.classList.add(styles.sold);
				}
		});

	}

	const setMovieData = (movieIndex, moviePrice) => {
		localStorage.setItem('selectedMovieIndex', movieIndex);
		localStorage.setItem('selectedMoviePrice', moviePrice);
	};

	const updateSelectedCount = () => {
		debugger

		const selectedSeatsCount = selectedSeats.length;

		const totalPrice = selectedSeatsCount * ticketPrice;

		setMovieData(selectedMovieIndex, ticketPrice);

		localStorage.setItem('selectedSeats', selectedSeatsCount);

	};

	const handleMovieChange = (e) => {
		debugger
		setTicketPrice(+e.target.value);
		setSelectedMovieIndex(e.target.selectedIndex);
		setMovieData(e.target.selectedIndex, e.target.value);
updateSelectedCount()		
};

	const handleSeatClick = (e, index) => {
		debugger
		console.log(e.target)
		if (e.target.classList.contains('seat') && !e.target.classList.contains('sold')) {
			const updatedSelectedSeats = [...selectedSeats];
			const seatIndex = updatedSelectedSeats.indexOf(index);

			if (seatIndex > -1) {
				updatedSelectedSeats.splice(seatIndex, 1);
			} else {
				updatedSelectedSeats.push(index);
			}

			setSelectedSeats(updatedSelectedSeats);
			updateSelectedCount();
		}
	};

	const handleBookButtonClick = () => {
		debugger
		console.log(selectedSeats)

		let seatsarray = [];
		selectedSeats.forEach((seatIndex) => {
			seatsarray.push(seatIndex)
		});

		console.log(seatsarray)
		setSelectedSeats([]);
		localStorage.setItem('selectedSeatsArray', JSON.stringify(seatsarray));
		updateSelectedCount();
		console.log(localStorage.getItem('selectedSeatsArray'))

	};


	return (
		<div>
			<div className={styles.moviecontainer}>
				<label> Select a movie:</label>
				<select value={movies[selectedMovieIndex].price} onChange={handleMovieChange}>
					{movies.map((movie, index) => (
						<option key={index} value={movie.price}>
							{movie.title} (RS.{movie.price})
						</option>
					))}
				</select>
			</div>

			<ul className={styles.showcase}>
				<li>
					<div className={styles.seat}></div>
					<small>Available</small>
				</li>
				<li>
					<div className={styles.selected}></div>
					<small>Selected</small>
				</li>
				<li>
					<div className={styles.sold}></div>
					<small>Sold</small>
				</li>
			</ul>
			<div className={styles.container}>
				<div className={styles.screen}></div>

				{Array.from({ length: 6 }, (_, rowIndex) => (
					<div key={rowIndex} className={styles.row}>
						{Array.from({ length: 8 }, (_, seatIndex) => (
							<div
								key={seatIndex}
								className={`seat ${selectedSeats.includes(seatIndex + rowIndex * 8) ? `${styles.selected}` : `${styles.seat}`} `}
								onClick={(e) => handleSeatClick(e, seatIndex + rowIndex * 8)}
							></div>
						))}
					</div>
				))}
			</div>
			<p className={styles.text}>
				You have selected <span id="count">{selectedSeats.length !== 0 ? selectedSeats.length : count}</span> seat for a price of RS.
				<span id="total">{selectedSeats.length !== 0 ? selectedSeats.length * ticketPrice : ticket}</span>
			</p>
			<button onClick={handleBookButtonClick}>Book</button>
		</div>
	);
};

export default Main;
