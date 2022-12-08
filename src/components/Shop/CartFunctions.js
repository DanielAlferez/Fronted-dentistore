export const addProduct = (data) => {
    let datos_existentes = localStorage.getItem('car');
    datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);
    let existe = false
    if(datos_existentes.length > 0){
        datos_existentes.forEach(function(i){
            if(i.id === data.id){
                i.count ++
                existe = true
            }
        })
        if(!existe){
            datos_existentes.push(data)
        }
    }
    else{
        datos_existentes.push(data)
    }

    localStorage.setItem('car',JSON.stringify(datos_existentes))
}

export const reduceProduct = (data) => {
    let datos_existentes = localStorage.getItem('car');
    datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);
    datos_existentes.forEach(function(i){
        if(i.id === data.id){
            i.count --
        }
    })
    localStorage.setItem('car',JSON.stringify(datos_existentes))
}

export const deleteProduct = (id) =>{
    let datos_existentes = localStorage.getItem('car');
    datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);
    datos_existentes = datos_existentes.filter((dato)=>dato.id !== id);
    localStorage.setItem('car',JSON.stringify(datos_existentes))
}