import { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios';
import CardMovies from './components/CardMovies';
import Form from './components/Form';

function App() {
	const [movies, setMovies] = useState();
	const [updateInfo, setUpdateInfo] = useState();
	const [isFormOpen, setIsFormOpen] = useState(false);

	const getAllMovies = () => {
		const URL = 'https://movies-crud-academlo.herokuapp.com/movies/';
		axios
			.get(URL)
			.then((res) => setMovies(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getAllMovies();
	}, []);

	const handleOpenForm = () => setIsFormOpen(true);
	const handleCloseForm = () => setIsFormOpen(false);

	return (
		<div className="App">
			<h1>Movies Crud</h1>
			<button onClick={handleOpenForm}>Open Form</button>
			<div className={isFormOpen ? 'form-container' : 'form-none'}>
				<Form
					getAllMovies={getAllMovies}
					updateInfo={updateInfo}
					setUpdateInfo={setUpdateInfo}
					handleCloseForm={handleCloseForm}
				/>
			</div>
			<div className="card-container">
				{movies?.map((movie) => (
					<CardMovies
						key={movie.id}
						movie={movie}
						getAllMovies={getAllMovies}
						setUpdateInfo={setUpdateInfo}
						handleOpenForm={handleOpenForm}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
