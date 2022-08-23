const api={
    nasaPics(){
        const url='https://api.nasa.gov/planetary/apod?api_key=QapuCIPmErucH9N4094iiOMPhUxQt5tLYbNUtVHR'
        return fetch(url).then((res)=>res.json())
   }
 }
 module.exports=api