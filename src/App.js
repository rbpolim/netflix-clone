import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb.js'

import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie.js';

import './App.css'

export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(() => {
    const loadAll = async () => {

      // Pegando a lista total
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      // Pegando o Featured (Filme em destaque)
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')

      setFeaturedData(chosenInfo)
    }

    loadAll()
  }, [])

  return (
    <div className="page">

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists"> 
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  )
}