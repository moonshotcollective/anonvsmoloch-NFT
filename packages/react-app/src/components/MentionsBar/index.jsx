import React from "react";

import "./MentionsBar.css";

import twitterPlaceholder from "../../assets/twitter-placeholder.svg";

const mentions = [
	{tweet: 'Lorem Ipsum', name: 'Sample 1', username: '@one'},
	{tweet: 'Lorem Ipsum', name: 'Sample 2', username: '@two'},
	{tweet: 'Lorem Ipsum', name: 'Sample 3', username: '@three'},
]

const MentionsBar = () => {
  return (
		<section className="text-gray-600 body-font w-full">
			<h1 className="text-green-teal p-6 text-center text-4xl font-spacemono" >What Are People Saying About Us</h1>
			<div className="container px-5 py-20 mx-auto">
				<div className="flex flex-wrap -m-4 justify-center">
					{
						mentions.map((element, index)=> (
							<div className="p-4 lg:w-1/3 w-3/4">
										<div className="h-full border-4 border-green-teal border-opacity-60 overflow-hidden">

										<div class="flex items-center p-4">
											<img alt="" className="bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={twitterPlaceholder}/>
											<div class="flex-grow">
												<h2 class="twitter-tweeter">{element.name}</h2>
												<p class="twitter-handle">{element.username}</p>
											</div>
										</div>
										<div className="p-6">
											<p className="twitter-tweet">
												<span className="text-4xl font-arial">"</span>
												{element.tweet}
											</p>
										</div>
									</div>
							</div>
						))
					}
				</div>
			</div>
			{/* <img className="inline botfigure float-left invisible lg:visible" src={botFigure} /> */}
		</section>
  );
};

export default MentionsBar;
