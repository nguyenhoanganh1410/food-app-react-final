import { useEffect, useState,useContext } from "react"

import productApi from "../../api/productApi"
import { Paniga } from "./utils";
import Contex from '../../store/Context'



 export const useFeatch = () =>{
    
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(true)
     
     const {state, depatch} = useContext(Contex)
    //detructering...
    const {url} = state


    //call 1 time
    useEffect(()=>{
        const fetchProductList = async () => {
     
            try {
              // const params = { _page: 1, _limit: 10 };
              const response = await productApi.getAll(url);
      
             
        
              setData(Paniga(response));
              
            
              setLoading(false)
            } catch (error) {
          
              console.log('Failed to fetch product list: ', error);
            }
           
       }
       fetchProductList();
    }, [url])
 
   return {data, loading}

}
