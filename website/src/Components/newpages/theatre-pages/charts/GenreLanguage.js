import React from "react"
import {  Card, CardBody, CardTitle } from "reactstrap";
import Chart, { Bar } from "react-chartjs-2";
import { OneBar } from "./TwoBar";

const GenreLanguage = () => {
    var yaxis_genre = [10,1,5];
    var yaxis_lang = [10,1,5];

    var xaxis_genre  = ["Genre 1", "Genre 2", "Genre 3"];
    var xaxis_lang  = ["Genre 1", "Genre 2", "Genre 3"];

    var color_genre="#b89a5a";
    var color_lang = "#779dd9";
    var stats_genre = OneBar(xaxis_genre, yaxis_genre, "Number of Audience for Genres", color_genre);
    var stats_lang = OneBar(xaxis_lang, yaxis_lang, "Number of Audience for Languages", color_lang);

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
