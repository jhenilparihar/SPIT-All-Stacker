import React, {Component} from 'react'
import './Search.css'

export class Search extends Component {
	render() {
		const items = [0, 1, 2, 3, 4];
		const courses = ['Engineering', 'Science and Technology', 'Medical', 'History', 'JEE/NEET'];
		const courses_url = [
			'https://cdn.mos.cms.futurecdn.net/HFUAjfbamNhbM8dsNSQW3D.jpg',
			'https://thumbs.dreamstime.com/b/science-lab-chemicals-14262437.jpg',
			'https://cdn.pixabay.com/photo/2018/07/15/10/44/dna-3539309__480.jpg',
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQapPZKKAScePIpJDrstV18TNjxfr6T2d_sVGObyax15ffiJ2CHIs4qPi8AYk44YIihscs&usqp=CAU',
			'https://www.sentinelassam.com/wp-content/uploads/2018/08/JEE-NEET-sabakuch-eLearning.jpg',];
		const movies = ['Action', 'Romance', 'Drama', 'Animated', 'Anime'];
		const movies_url = [
			'https://s3.amazonaws.com/heights-photos/wp-content/uploads/2017/04/04191317/isabella-column-online.jpg',
			'https://media.proprofs.com/images/QM/user_images/2362275/1557731843.jpg',
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9SQ85e6P_2pSpg_kezkt07LC1CdlRARSk5w&usqp=CAU',
			'https://m.media-amazon.com/images/M/MV5BNWMyMzNjNDgtZDUwYS00OTI4LTg1ZDItYTcwYjE1OGQwN2QzXkEyXkFqcGdeQWxiaWFtb250._V1_.jpg',
			'https://9tailedkitsune.com/wp-content/uploads/2019/11/k1MrUMc.jpg'];
		
		const tvshows = [
			'Action',
			'Romance',
			'Drama',
			'Animated',
			'Anime'];
		const tvshows_url = ['Action', 'Romance', 'Drama', 'Animated', 'Anime'];
		
		const musics = ['POP', 'Romance', 'Lo-Fi', 'Hip-Hop', 'Focus'];
		const musics_url = [
			'https://ichef.bbci.co.uk/news/976/cpsprodpb/E645/production/_113294985_composite.jpg',
			'https://static-koimoi.akamaized.net/wp-content/new-galleries/2013/08/Vaani-Kapoor-And-Sushant-Singh-Rajput-in-Shuddh-Desi-Romance-Music-Review-Pic-1.jpg',
			'https://t4.ftcdn.net/jpg/05/47/71/45/360_F_547714598_Qlic69Z1hg0hFxhRVXB7iABUwcnwnY9T.jpg',
			'https://ychef.files.bbci.co.uk/976x549/p07r368q.jpg',
			'https://m.media-amazon.com/images/I/81vP9AUy1mL.png'];
		
		
		return (
			<div>
				<div className="main-container">
					<div className="s-searchbar">
						
						<input type="text" placeholder="Search"/>
					
					</div>
					
					<div className="s-spotify-playlists">
						<h2>Education</h2>
						
						<div className="list">
							
							{items.map(item => (
								<div className="item">
									<div className={'item-img'}>
										<img width={'300px'}
												 src={courses_url[item]}/></div>
									<div className="play">
										<span className="fa fa-play"></span>
									</div>
									<h4>{courses[item]}</h4>
								</div>
							))}
						
						
						</div>
					</div>
					
					<div className="s-spotify-playlists">
						<h2>Movies</h2>
						<div className="list">
							
							{items.map(item => (
								<div className="item">
									<div className={'item-img'}>
										<img width={'300px'}
												 src={movies_url[item]}/></div>
									<div className="play">
										<span className="fa fa-play"></span>
									</div>
									<h4>{movies[item]}</h4>
								</div>
							))}
						
						
						</div>
					</div>
					
					{/*<div className="s-spotify-playlists">*/}
					{/*	<h2>TV Shows</h2>*/}
					{/*	<div className="list">*/}
					{/*		*/}
					{/*		{items.map(item => (*/}
					{/*			<div className="item">*/}
					{/*				<img*/}
					{/*					src={courses_url[item]}/>*/}
					{/*				<div className="play">*/}
					{/*					<span className="fa fa-play"></span>*/}
					{/*				</div>*/}
					{/*				<h4>{tvshows[item]}</h4>*/}
					{/*			</div>*/}
					{/*		))}*/}
					{/*	</div>*/}
					{/*</div>*/}
					
					<div className="s-spotify-playlists">
						<h2>Musics</h2>
						<div className="list">
							
							{items.map(item => (
								<div className="item">
									<div className={'item-img'}>
										<img width={'300px'}
												 src={musics_url[item]}/></div>
									<div className="play">
										<span className="fa fa-play"></span>
									</div>
									<h4>{musics[item]}</h4>
								</div>
							))}
						
						
						</div>
						
						<hr/>
					</div>
				
				</div>
			</div>
		)
	}
}

export default Search
