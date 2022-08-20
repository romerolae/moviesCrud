import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const defaultValue = {
	name: '',
	genre: '',
	duration: '',
	release_date: '',
};

const Form = ({ getAllMovies, updateInfo, setUpdateInfo, handleCloseForm }) => {
	useEffect(() => {
		if (updateInfo) {
			reset(updateInfo);
		}
	}, [updateInfo]);

	const createMovie = (data) => {
		const URL = 'https://movies-crud-academlo.herokuapp.com/movies/';
		axios
			.post(URL, data)
			.then((res) => {
				console.log(res.data);
				getAllMovies();
			})
			.catch((err) => console.log(err));
	};

	const updateMovie = (data) => {
		const URL = `https://movies-crud-academlo.herokuapp.com/movies/${updateInfo.id}/`;
		axios
			.patch(URL, data)
			.then((res) => {
				console.log(res.data);
				getAllMovies();
			})
			.catch((err) => console.log(err));
	};

	const { register, reset, handleSubmit } = useForm();

	const submit = (data) => {
		if (updateInfo) {
			//Update Movie
			updateMovie(data); //data es la informacion del formulario
			setUpdateInfo();
		} else {
			//Create New movie
			createMovie(data);
		}
		reset(defaultValue);
		handleCloseForm();
	};

	return (
		<form onSubmit={handleSubmit(submit)} className="form">
			<div onClick={handleCloseForm} className="form__equix">
				x
			</div>
			<h2 className="form__title">
				{updateInfo ? 'Update Movie Information' : 'Create New Movie'}
			</h2>
			<ul className="form__list">
				<li className="form__item">
					<label htmlFor="name">Name: </label>
					<input {...register('name')} type="text" id="name" />
				</li>
				<li className="form__item">
					<label htmlFor="genre">Genre: </label>
					<input {...register('genre')} type="text" id="genre" />
				</li>
				<li className="form__item">
					<label htmlFor="duration">Duration: </label>
					<input {...register('duration')} type="text" id="duration" />
				</li>
				<li className="form__item">
					<label htmlFor="release-date">Release Date: </label>
					<input {...register('release_date')} type="date" id="release-date" />
				</li>
			</ul>
			<button className="form__btn">{updateInfo ? 'Update' : 'Create'}</button>
		</form>
	);
};

export default Form;
