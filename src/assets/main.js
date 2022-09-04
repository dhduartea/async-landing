// import fetch from "node-fetch";
const API = "https://spotify23.p.rapidapi.com/playlist_tracks/?id=3Mx6OruTOsyFk9SlznI0sI&offset=0&limit=12";

const content = null || document.getElementById('content');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '1ae0ece6eemsh21516ebeee05606p1bed1fjsn9a832fc2ce43',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
};


//Lógica de async: ir por los datos, luego esperar por ellos y finalmente retornarlos hacia el usuario
async function fetchData(urlApi) { //siempre async antes de function
    const response = await fetch(urlApi, options); //hacemos uso del fetch() y solo por esta vez le pasamos la opciones 
    const data = await response.json(); //estructura de los datos transformandolos en json
    return data; //retorna la información de la API que estamos solicitando
}

(async () => {
    //Dentro implementamos la lógica necesaria para hacer el llamado a la API, obtener los elementos y mostrarlos en html
    //Se implementa try y catch
    try {
        const songs = await fetchData(API);
        let view = `
        ${songs.items.map(song => `
            <div class="group relative">
            <a href="${song.track.external_urls.spotify}"  target="_blank">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    
                    <img src="${song.track.album.images[0].url}" alt="${song.track.album.name}" class="w-full">
            
                    
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700" style="color:white;">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${song.track.name}
                    </h3>
                </div>
                </a>
            </div>
        `).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
        alert(error);
    }
})();