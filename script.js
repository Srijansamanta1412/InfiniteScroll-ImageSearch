let currentPage = 1;
const perPage = 10;
/* ---------------------- Getting the Data and applying pagination From The API ----------------------------*/
async function getData(searchValue) {
    try {
        console.log(searchValue)
        if (searchValue != undefined) {
            searchValue = searchValue.toLowerCase();
            var response = await fetch(`https://api.unsplash.com/search/photos/?client_id=P34opm4wNjVssWPf-j20iCcBMIMF0UCSOwPHu8ibs3s&query=${searchValue}&page=${currentPage}&per_page=${perPage}`);
        }
        else
            var response = await fetch(`https://api.unsplash.com/photos/?client_id=P34opm4wNjVssWPf-j20iCcBMIMF0UCSOwPHu8ibs3s&page=${currentPage}&per_page=${perPage}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        console.log(data);
        if (!data.results) {
            for (let i = 0; i < data.length; i++) {
                let imageDiv = document.createElement('div');
                let image = document.createElement('img');
                image.setAttribute('src', data[i].urls.small);
                image.setAttribute('height', '300px');
                image.setAttribute('width', '90%');
                //image.removeAttribute('height'); // Remove height attribute to maintain aspect ratio

                imageDiv.append(image);
                imageDiv.classList.add('col-sm-6', 'mb-3')
                console.log(imageDiv.style.textAlign)
                imageDiv.style.textAlign='center';
                document.getElementById('imageContainer').append(imageDiv)
            }
        }
        else {
            if (data.results.length != 0)
                document.getElementById('imageContainer').innerHTML = ''
            for (let i = 0; i < data.results.length; i++) {
                console.log("TESTEST")
                let imageDiv = document.createElement('div');

                let image = document.createElement('img');
                image.setAttribute('src', data.results[i].urls.small);
                image.setAttribute('height', '300px');
                image.setAttribute('width', '90%');
                imageDiv.append(image);
                imageDiv.classList.add('col-sm-6', 'mb-3')
                document.getElementById('imageContainer').append(imageDiv)
            }
        }
    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }
}
/* ------------------------- Get The Additional Data For a Searched Field ----------------------*/
async function getModifiedData(searchValue){
    searchValue = searchValue.toLowerCase();
    var response = await fetch(`https://api.unsplash.com/search/photos/?client_id=P34opm4wNjVssWPf-j20iCcBMIMF0UCSOwPHu8ibs3s&query=${searchValue}&page=${currentPage}&per_page=${perPage}`);
    let data = await response.json();
    for (let i = 0; i < data.results.length; i++) {
        console.log("TESTEST")
        let imageDiv = document.createElement('div');
        imageDiv.style.textAlign = 'center';
        let image = document.createElement('img');
        image.setAttribute('src', data.results[i].urls.small);
        image.setAttribute('height', '300px');
        image.setAttribute('width', '90%');
        imageDiv.append(image);
        imageDiv.classList.add('col-sm-6', 'mb-3')
        document.getElementById('imageContainer').append(imageDiv)
    }
}
/* ------------------------ Adding the Search Event -------------------------------*/
document.getElementById('searchImageInput').addEventListener("keyup", () => {
    let searchValue = document.getElementById('searchImageInput').value
    currentPage=1;
    getData(searchValue)
});
getData();

/*-------------------------- Adding the Event For Infinite Scroll --------------------------*/
const divElement = document.getElementById('whole-image-container');
divElement.addEventListener('scroll', function () {
    if (divElement.scrollTop + divElement.clientHeight >= divElement.scrollHeight-100) {
        console.log('Reached the bottom of the div!');
        currentPage++;
        let searchValue = document.getElementById('searchImageInput').value
        if(searchValue.length==0)
        getData();
        else
        getModifiedData(searchValue)
    }
});

