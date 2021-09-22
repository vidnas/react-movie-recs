import React, { Component, useState, useEffect } from 'react';
import './Card.css';
import $ from 'jquery';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

function Collection(props){
    
    let collectionId = props.id    
        
        useEffect( () => {
            fetchCollection();             
        }, [] );
    
        const [collection, setCollection] = useState({});
    
        const fetchCollection = async () => {
            const fetchCollection = await fetch(
                `https://api.themoviedb.org/3/collection/${collectionId}?api_key=898c53e4648c8d01605385c636421936&language=en,null`
            ).then((response) => response.json());            
            const collection = fetchCollection;
            setCollection(collection);
            console.log(collection);
        }; 

        const posterURL = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"; 

        const collecIndv = collection.parts;
        

        return (
            <div className="collectionWrapper">
                <h1>{collection.name}</h1>               

                {/* <div className="recsPanel" id="recsPanelFull">                    
                {collecIndv.map((movie, colIndex) => (
                <Link
                    to={`/singlemovie/${collection.parts[colIndex].id}`}
                    key={collection.parts[colIndex].id}>
                    <div className="singleRec" key={collection.parts[colIndex].id}>
                    <img src={ posterURL + collection.parts[colIndex].poster_path} width="200px"/>
                    
                    </div>
                </Link>
                ))}
            </div> */}
          </div>
                      
        );
    
}

export default Collection;