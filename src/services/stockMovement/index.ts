import { scheduleApi } from "../../api";
import { StockMovement } from "../../models/stockMovement";


export const UpdateStockMovement = async ( stockMovement : StockMovement  , code : string)=>{


    const {data}= await scheduleApi.put (`/stock_movement/update-stock/${code}`, stockMovement) ;

    return data as StockMovement;


}

export const SaveOutStockMovement = async ( stockMovement : StockMovement  )=>{


    const {data}= await scheduleApi.put (`/stock_movement/stock-out`, stockMovement) ;

    return data as StockMovement;


}


export const SaveInStockMovement = async ( stockMovement : StockMovement  )=>{


    const {data}= await scheduleApi.put (`/stock_movement/stock-in`, stockMovement) ;

    return data as StockMovement;


}