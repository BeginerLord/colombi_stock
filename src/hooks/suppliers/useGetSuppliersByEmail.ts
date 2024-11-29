import { useQuery } from "@tanstack/react-query"
import { GetSuppliersByEmail } from "../../services/suppliers"

export const UseGetSuppliersByEmail=(email:string)=>{

    const {data :suppliersByEmail, isLoading}=useQuery(
{

    queryKey: ["suppliers", email]
    ,
    queryFn: ()=>GetSuppliersByEmail(email)
}

        
    )


    return{suppliersByEmail,isLoading};
}