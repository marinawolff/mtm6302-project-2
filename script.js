const $body = document.body
const $form = document.getElementById('form')
const $apod = document.getElementById('apod')
const $date = document.getElementById('date')
const $overlay = document.getElementById('overlay')
const $favorites = document.getElementById('favorites')


let data = {}

//array of objetcs/ each object is a saved search
const favorites = []

function nasaRequest(){
    //submit the form
    $form.addEventListener('submit', async function(e){
        e.preventDefault()

        //takes information from API
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=xHJD9wnMBmusn5f6EhzKzT7PWs3Rf3gHayCndq4E&date=${$date.value}`)
        const json = await response.json()

        //displasys APOD information/ checking if the json is valid - future dates are undefined from APOD
        if (!json.code){
            $apod.innerHTML = `
                <img class="imgbig rounded-3" id="imgbig" data-hd="${json.hdurl}" src="${json.url}">
                <div class="ms-4">
                    <h3>${json.title}</h3>
                    <h5 class="date"><em>${json.date}</em></h5>
                    <p class="description">${json.explanation}</p>
                    <button type="button" class="btn btn-primary save" id="save">Save to Favorites</button>
                </div>`
        } else {
            $apod.textContent = `Sorry! No images for future dates`
        }
            

        //adds click event to the image and displaying big version of the image
        $body.addEventListener('click', function(e){
            if (e.target.classList.contains('imgbig')){
                const hd = e.target.dataset.hd
                $overlay.innerHTML = `<div class="imgOverlay"><img src=${hd}></div>`
                $overlay.style.display = 'block'
            }
        })


        $overlay.addEventListener('click', function(){
            $overlay.style.display = 'none'
          })


        //APOD data
        data = {
            url: json.url,
            title: json.title,
            date: json.date,
            explanation: json.explanation
        }

    })
}

nasaRequest()


//add click event to Save to Favorite button
$apod.addEventListener('click', function(e){
    if (e.target.classList.contains('save')){
        
        //push APOD data to the array
        favorites.push (data)
    }

    //stores data in localStorage
    function saveFavorites(){
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }

    saveFavorites()

    function buildFavorites(){
        const html = []

        for (let i = 0; i < favorites.length; i++){
            html.push(`
                <div class="fav-info border d-flex flex-wrap p-3 mt-3">
                    <img class="img-small rounded-3" src="${favorites[i].url}">
                    <div class="ms-4">
                        <h4> ${favorites[i].title}</h4>
                        <h5> ${favorites[i].date}</h5>
                        <button type="button" data-index="${i}" class="btn btn-danger delete">Delete</button>
                    </div>
                </div>`)
        }
        $favorites.innerHTML = html.join('')  
    }

    buildFavorites()

    $favorites.addEventListener('click', function(e){
        if(e.target.classList.contains('delete')){
            const index = e.target.dataset.index
    
            favorites.splice(index, 1)

            saveFavorites()
        
            buildFavorites()
        }
    })
})
    
