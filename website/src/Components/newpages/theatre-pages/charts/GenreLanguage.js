import React, { useState, useEffect } from "react";
import {  Card, CardBody, CardTitle } from "reactstrap";
import Chart, { Bar } from "react-chartjs-2";
import { OneBar } from "./TwoBar";

const GenreLanguage = () => {
    const [isLoading, setisLoading] = useState(0);
    var [lang_data, setLangData] = useState([]);
    var [genre_data, setGenreData] = useState([]);

    var x_data_lang = [];
    var x_data_genre = [];

    var y_data_lang = [];
    var y_data_genre = [];
    // var yaxis_genre = [10,1,5];
    // var yaxis_lang = [10,1,5];

    // var xaxis_genre  = ["Genre 1", "Genre 2", "Genre 3"];
    // var xaxis_lang  = ["Genre 1", "Genre 2", "Genre 3"];
    useEffect(() => {
        getGenreChoice();
        getLangChoice();
    }, []);
    function getGenreChoice () {
        setisLoading(1);
        fetch("http://localhost:3001/getGenreChoice", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            //body: JSON.stringify({ movie_id }),
        })
        .then((response) => {
            return response.json();
          })
          .then((data) => {
            setGenreData(data);
            setisLoading(2);
          })
          .catch((err) => {
            console.log(err);
          });
    }
    function getLangChoice () {
        setisLoading(1);
        fetch("http://localhost:3001/getLanguageChoice", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            //body: JSON.stringify({ movie_id }),
        })
        .then((response) => {
            return response.json();
          })
          .then((data) => {
            setLangData(data);
            setisLoading(2);
          })
          .catch((err) => {
            console.log(err);
          });
    }
    console.log(genre_data);
    console.log(lang_data);
    genre_data.forEach(element => {
        x_data_genre.push(element.name);
        y_data_genre.push(element.audience);
    });
    lang_data.forEach(element => {
        x_data_lang.push(element.name);
        y_data_lang.push(element.audience);
    });
    var color_genre="#b89a5a";
    var color_lang = "#779dd9";
    var stats_genre = OneBar(x_data_genre, y_data_genre, "Number of Audience for Genres", color_genre);
    var stats_lang = OneBar(x_data_lang, y_data_lang, "Number of Audience for Languages", color_lang);

	return (
		<div className="row container" style={{margin:"20px"}}>
			<Card className="card-chart">
                <CardTitle tag="h5">View Choice of Audience over Genre, Language</CardTitle>
                <CardBody>
                    <div className="row">
                        <div className="col-6">
                            <Bar
                            data={stats_genre.data}
                            options={stats_genre.options}
                            width={1000}
                            height={500}
                            />
                        </div>
                        <div className="col-6">
                            <Bar
                            data={stats_lang.data}
                            options={stats_lang.options}
                            width={1000}
                            height={500}
                            />
                        </div>
                    </div>

                </CardBody>
            </Card>
		</div>
	)
}

export default GenreLanguage
