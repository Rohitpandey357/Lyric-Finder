import React from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';

const API_KEY = '3c1cb2c9ccd16d2738231a9ffe697531';

class Lyrics extends React.Component {
	state={
		track: {},
		lyrics: {}
	}

	componentDidMount() {
		axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${API_KEY}`)
			.then(res=> {
			console.log(res.data);
			this.setState({ lyrics : res.data.message.body.lyrics });

			return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${API_KEY}`)
				.then(res => {
					console.log(res.data);
					this.setState({ track: res.data.message.body.track});
				})
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
	}

	render(){
		const { track , lyrics } = this.state;
		if(track===undefined || lyrics === undefined || Object.keys(track).length===0 || Object.keys(lyrics).length===0 ) {
			return <Spinner />
		}
		else {
			return(
				<React.Fragment>
					<Link to="/" className="btn btn-dark btn-sm mb-4">Go Back!!</Link>
					<div className="card">
						<h5 className="card-header">
							{track.track_name} by <span className="text-secondary">{track.artist_name}
							</span>
						</h5>
						<div className="card-body">
							<p className="card-text">{lyrics.lyrics_body}</p>
						</div>
					</div>

					<ul className="list-group mt-3">
						<li className="list-group-item">
							<strong>Album ID : </strong>{track.album_id}
						</li>

						<li className="list-group-item">
							<strong>Genre : </strong>{track.primary_genres.music_genre_list.length? track.primary_genres.music_genre_list[0].music_genre.music_genre_name : "Not Available"}
						</li>

						<li className="list-group-item" >
							<strong>Explicit Words : </strong> {track.explicit===0 ? 'No' : 'Yes'}
						</li>

						<li className="list-group-item" >
							<strong>Rating : </strong> {track.track_rating}
						</li>

					</ul>
				</React.Fragment>
				);
		}
	}
};

export default Lyrics;