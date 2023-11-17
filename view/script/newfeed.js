const settings = {
	async: true,
	crossDomain: true,
	url: 'https://programming-memes-images.p.rapidapi.com/v1/memes',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '35225ca58emsh1a118b3ea58ac07p12937ajsn550c6e164292',
		'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
    
});