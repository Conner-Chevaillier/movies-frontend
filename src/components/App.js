import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import EditAddMovie from './EditAddMovies';
import AllMovie from './AllMovie';
import SelectMovie from './SelectMovie';
import '../style/App.css';

class CRUDApp extends Component {
    constructor() {
        super();
        this.state = {
            title: ' ',
            director: ' ',
            year: undefined,
            rating: undefined,
            url: ' ',
            movieList: [],
            allSelectedInputs: false,
            buttonID: 2,
            searchedMovie: [],
            movie: []
        }
    }
    componentDidMount() {
        this.loadMovies()
    }
    InputStateDataHandler = (event) => {
        const { value, name } = event.target
        this.setState({
            [name]: value
        })
        if (this.state.title.length > 0 && this.state.director.length > 0 && this.state.url.length > 0 && this.state.year.length > 0 && this.state.rating > 0) {
            this.setState({
                allInputStateData: true,
            })
        }
    }
    editMovieButton = (event) => {
        fetch(`https://backendmove.herokuapp.com/movies${event.target.id}`)
            .then(result => result.json())
            .then((response) => {
                this.setState({
                    movie: [response],
                    rating: response.rating,
                    title: response.title,
                    director: response.director,
                    url: response.url,
                    year: response.year,
                    allInputted: true
                })
            })
    }
    SelectMovieClick = (event) => {
        fetch(`https://backendmove.herokuapp.com/movies${event.target.id}`)
            .then(result => result.json())
            .then((response) => {
                this.setState({
                    movie: [response]
                })
            })
    }
    editMovie = (event) => {
        if (this.state.allInputStateData === false) {
        }
        else {
            var updatedMovie = {
                title: this.state.title,
                director: this.state.director,
                rating: this.state.rating,
                url: this.state.url,
                year: this.state.year
            }
            fetch(`https://backendmove.herokuapp.com/movies/${event.target.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovie)
            }).then(response => response.json())
                .then(() => this.loadMovies()).then(() => {
                    this.setState({
                        reviewInputted: false,
                        rating: 0,
                        title: '',
                        director: '',
                        movie: [],
                        year: 0,
                        url: ''
                    })
                })
        }
    }
    addMovies = (event) => {
        if (this.state.rating > 5 || this.state.rating < 0) {
            alert("Please Rate")
        } else if (this.state.allInputted === true) {
            var addNewMovie = {
                title: this.state.title,
                director: this.state.director,
                year: this.state.year,
                rating: this.state.rating,
                url: this.state.url,
            }
            fetch('https://backendmove.herokuapp.com/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify('newMovie')
            })
                .then(response => response.json())
                .then(() => this.loadMovies())
                .then((response) => {
                    this.setState({
                        allInputted: false,
                        title: '',
                        director: '',
                        year: undefined,
                        rating: undefined,
                        url: '',
                    })
                })
        }
    }
    deleteMovie = (event) => {
        fetch(`https://backendmove.herokuapp.com/movies/${event.target.id}`, {
            method: 'DELETE',
        }).then(() => this.loadMovies())
    }
    loadMovies = () => {
        fetch('https://backendmove.herokuapp.com/movies')
            .then(result => result.json())
            .then((response) => {
                this.setState({
                    movieList: response.movies
                })
            })
    }

    render() {
        return (
            <>
                <div className='header'>
                    <div><b>Movie Ratings</b></div>
                    <div className='mainCont'>
                        <Route path='/AllMovie' render={props => <AllMovie AllMovie={this.state.movieList} handleInput={this.handleInput} {...props} />} />
                        <Route path='/Movie' render={() => (<SelectMovie oneMovieClick={this.oneMovieClick} loadMovies={this.loadMovies} deleteMovie={this.deleteMovie} editMovieButton={this.editMovieButton} newMovieButton={this.newMovieButton}{...this.state} />)} />
                        <Route path='/EditAddMovies' render={() => (<EditAddMovie handleInput={this.handleInput} editMovie={this.editMovie}{...this.state} />)} />
                        <Route path='/movieInfo' render={() => (<SelectMovie {...this.state} />)} />

                    </div>
                </div>
            </>
        )
    }
}

export default CRUDApp
