import './HomeIngredientsStyle.scss'
import {data_ingredients} from '../data/data'


const HomeIngredients = () =>{
    return (
        <div className="home-ingredients">
            <div className='ingredients_left'>
                {
                    data_ingredients.slice(0,data_ingredients.length/2).map((val,idx) =>{
                        return (
                            <div key={val.id} className='ingredients_card'>
                                <div className='card_number'>{`0${val.number}`}</div>
                                <h3>{val.title}</h3>
                                <p>{val.text}</p>
                            </div>

                        )
                    })
                }
            </div>
            <div className='ingredients_right'>
            {
                    data_ingredients.slice(data_ingredients.length/2, data_ingredients.length).map((val,idx) =>{
                        return (
                            <div key={val.id} className='ingredients_card'>
                                <div className='card_number'>{`0${val.number}`}</div>
                                <h3>{val.title}</h3>
                                <p>{val.text}</p>
                            </div>

                        )
                    })
                }

            </div>
        </div>
    )
}


export default HomeIngredients