import React, { useEffect, useState } from 'react';

import Tmdb from './Tmdb.js'

import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie.js';
import Header from './components/Header';

import './App.css'

export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => { // Pegando as listas
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

  useEffect(() => { // Funcionalidade do scroll do mouse
    const scrollListener = () => {

      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)

    return () => {
    
      window.removeEventListener('scroll', scrollListener)

    }
  }, [])

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists"> 
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
          Feito com <span role="img" aria-label="coração">❤</span> por Rodrigo Polim<br/>
          Direitos de imagem para a Netflix<br/>
          Dados do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_1122,c_limit/Netflix_LoadTime.gif" alt="Carregando" />
        </div>
      }

    </div>
  )
}