export const Paniga = (data) =>{
    const itemsPerPage = 20;//1 page co 10 items
    const numOfPage = Math.ceil(data.length/itemsPerPage)

    const newArr = Array.from( {length: numOfPage}, (val, idx) =>{
        const start = idx * itemsPerPage
        return data.slice(start, start + itemsPerPage)
    } )


    return newArr
}
