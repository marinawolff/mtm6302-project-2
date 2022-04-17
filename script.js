const $form = document.getElementById('form')
const $apod = document.getElementById('apod')
const $date = document.getElementById('date')
const $body = document.body
const $overlay = document.getElementById('overlay')
const $imgOverlay = document.getElementById('imgOverlay')


//array of objetcs/ each object is a saved search
const favorites = []


function nasaRequest(){
    //submit the form
    $form.addEventListener('submit', async function(e){
        e.preventDefault()

        //takes information from API
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=xHJD9wnMBmusn5f6EhzKzT7PWs3Rf3gHayCndq4E&date=${$date.value}`)
        const json = await response.json()

        //displasys APOD information
        $apod.innerHTML = `
                <img class="imgbig" id="imgbig" dataset=${json.hdurl} src="${json.url}">
                <div class="ms-4">
                    <h3>${json.title}</h3>
                    <h5 class="date">${json.date}</h5>
                    <p class="description">${json.explanation}</p>
                    <button type="button" class="btn btn-primary" id="save">Save to Favorites</button>
                </div>`

        //adds click event to the image and displaying big version of the image
        $body.addEventListener('click', function(e){
            if (e.target.classList.contains('imgbig')){
                const hd = e.target.dataset.hd
                $overlay.innerHTML = `<div class="imgOverlay"><img src=${json.hdurl}></div>`
                $overlay.style.display = 'block'
            }
        })
    })
}

nasaRequest()