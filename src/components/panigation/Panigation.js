
import './PanigationStyle.scss'


const PanigationButton = ({items, pageNum, handlerChangePage}) =>{


   // //scrool to top
   // const handlOnTop = () =>{
   //    window.scrollTo({
   //       top: 0, 
   //       behavior: 'smooth'
   //       /* you can also use 'auto' behaviour
   //          in place of 'smooth' */
   //    });
   // }
   
    //console.log("panigation" + pageNum);
    const hanldNextClick = (e) =>{
        const activeIdx = document.querySelector('.active-btn').textContent
        //trang cuoi
         if(+activeIdx === items){
            handlerChangePage(0)
         }
         else{
            handlerChangePage(+activeIdx)
         }
         //handlOnTop();
     }
     const hanldPreClick = () =>{
        const activeIdx = document.querySelector('.active-btn').textContent
        //trang cuoi
         if(+activeIdx === 1){
            handlerChangePage(items-1)
         }
         else{
            handlerChangePage(+activeIdx - 2)
         }

     }
     const changePage = (idx) =>{
        handlerChangePage(idx)
       // handlOnTop();
     }
      

     const ButtonGroup = () =>{
        const newArr = Array.from( {length: items}, (val, idx) =>{
           return (
            <button className={`page-btn ${idx === pageNum-1 ? 'active-btn' : null}`}
            onClick={() => changePage(idx)}
        
             >{idx+1}</button>
           )
        } )
        return newArr
     }
    return (
        <div className="pavigation">
            <button className="pre-btn"
                    onClick={(e) => hanldPreClick(e)}
            >prev</button>
            {/* {
                items.forEach( (val, idx)=>{
                    return <button className={`page-btn ${idx === pageNum ? 'active-btn' : null}`}
                                onClick={() => changePage(idx)}
                            
                            >{idx+1}</button>
                })
            } */}
            
            <ButtonGroup />

            <button className="next-btn"
                   onClick={(e) => hanldNextClick(e)}
            >next</button>
    </div>
    )
}

export default PanigationButton