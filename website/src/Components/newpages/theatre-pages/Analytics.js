import React, {useState} from "react"
import { Button } from "reactstrap"
import TheatreRatings from "./charts/TheatreRatings"
import MovieRatings from "./charts/MovieRatings"
import LiveOnline from "./charts/LiveOnline"
import GenreLanguage from "./charts/GenreLanguage"

const Analytics = () => {
	var [showRatings, setShowRatings] = useState(1);
	var [showAudience, setShowAudience] = useState(0);
	var [liveOnline, setLiveOnline] = useState(0);
	var [genreLanguage, setGenreLanguage] = useState(0);


	function ratingsHandler(){
		if(!showRatings) 
			setShowRatings(!showRatings);
        if (showAudience) setShowAudience(!showAudience);
        if (liveOnline) setLiveOnline(!liveOnline);
        if (genreLanguage) setGenreLanguage(!genreLanguage);
	}

	function liveOnlineHandler(){
		if(!liveOnline) setLiveOnline(!liveOnline);
        if (showAudience) setShowAudience(!showAudience);
        if (showRatings) setShowRatings(!showRatings);
        if (genreLanguage) setGenreLanguage(!genreLanguage);
	}

	function audienceHandler(){
		if(!showAudience)setShowAudience(!showAudience);
        if (showRatings) setShowRatings(!showRatings);
        if (liveOnline) setLiveOnline(!liveOnline);
        if (genreLanguage) setGenreLanguage(!genreLanguage);
	}

	function genreLanguageHandler(){
		if(!genreLanguage)setGenreLanguage(!genreLanguage);
        if (showAudience) setShowAudience(!showAudience);
        if (liveOnline) setLiveOnline(!liveOnline);
        if (showRatings) setShowRatings(!showRatings);
	}

	function showAllHandler(){
		if(!genreLanguage) setGenreLanguage(!genreLanguage);
        if (!showAudience) setShowAudience(!showAudience);
        if (!liveOnline) setLiveOnline(!liveOnline);
        if (!showRatings) setShowRatings(!showRatings);
	}

	return (

		<div className="row container">
			<div className="col-2"><Button onClick={ratingsHandler} >Movie Ratings</Button></div>
			<div className="col-2"><Button onClick={liveOnlineHandler}>Live VS Online</Button></div>
			<div className="col-2"><Button onClick={audienceHandler}>Ratings of Audience</Button></div> 
			{/* Theatre Ratings */}
			<div className="col-2"><Button onClick={genreLanguageHandler}>Choice of Audience</Button></div>
			{/* Genre Language Choices */}
			<div className="col-2"><Button onClick={showAllHandler}>Show All</Button></div>
			

		{showRatings ? <MovieRatings></MovieRatings> : <></>}
		{liveOnline ? <LiveOnline></LiveOnline> : <></>}
		{showAudience ? <TheatreRatings></TheatreRatings> : <></>}
		{genreLanguage ? <GenreLanguage></GenreLanguage> : <></>}

		</div>
	)
}

export default Analytics
