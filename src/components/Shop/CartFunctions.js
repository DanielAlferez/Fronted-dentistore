export const addProduct = (data) => {
    if(data.color === undefined){
        data.color = "No aplica"
    }

    let datos_existentes = localStorage.getItem('car');
    datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);
    let existe = false
    if(datos_existentes.length > 0){
        datos_existentes.forEach(function(i){
            if(i.id === data.id && i.color === data.color ){
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
    const resultado = datos_existentes.map((dato) => {
        if (dato.id === data.id && dato.color === data.color) {
          return { ...dato, count: dato.count - 1 };
        }
        return dato;
    });
    localStorage.setItem('car',JSON.stringify(resultado))
}

export const deleteProduct = (id,color) =>{
    let datos_existentes = localStorage.getItem('car');
    datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);
    console.log(JSON.stringify(datos_existentes))
    console.log(color)
    datos_existentes = datos_existentes.filter((dato)=>dato.id !== id || dato.color !== color);
    console.log(datos_existentes)
    localStorage.setItem('car',JSON.stringify(datos_existentes))
}