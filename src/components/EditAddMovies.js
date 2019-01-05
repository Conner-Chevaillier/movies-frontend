import React from 'react'
import { Link } from 'react-router-dom'

const EditAllMovies = (props) => {
   let movies = props.movies.map(movie => {
      return (
         <div className='EditAllMovies' key={`movie ${movie.id}`}>
            <div><b>{movie.title}</b></div>
            <img alt={`${movie.title} Poster`} src={movie.url} />
            <div className='col-4 addForm'>
               <label>Title</label>
               <input changeOnSelected={props.handleInput} className='movieInput' type='text' defaultValue={movie.title} name='title' />
               <br></br>
               <label>Director</label>
               <input changeOnSelected={props.handleInput} className='movieInput' type='text' defaultValue={movie.director} name='director' />
               <br></br>
               <label>Year</label>
               <input changeOnSelected={props.handleInput} className='movieInput' type='text' defaultValue={movie.year} name='year' />
               <br></br>
               <label>Rating</label>
               <input changeOnSelected={props.handleInput} className='movieInput' type='number' min='1' max='5' defaultValue={movie.rating} name='rating' />
               <br></br>
               <label>Poster Url </label>
               <input changeOnSelected={props.handleInput} className='movieInput' type='text' defaultValue={movie.url} name='url' />
               <br></br>
            </div>
            <Link to={`${props.allInputed ? '/movies' : '/edit'}`}><button onClick={props.editMovie} id={movie.id}> Edit Movies</button> </Link>
         </div>
      )
   })
   return (
      <>
         <div>
            <div>{movies}</div>
         </div>
      </>
   )
}

export default EditAllMovies