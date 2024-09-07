import { useEffect } from "react"
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { createTodo, updateTodo, deleteTodo } from '../graphql/mutations';


export const AssetComponent = () =>  {
    useEffect(()=>{
        const apiCall= async function apiCall(){
            const client = generateClient();
            const result = await client.graphql({
                query: createTodo,
                variables: {
                    input: {
                        date: "2024-01-01",
                        completeAccess:0,
                        netbank:10,
                        goalsaver:20,
                        investments:30,
                        super:40,
                        assets:50,
                        debt:60
                    }
                }
            });
        }
        apiCall()
    },[])
    return(
        <>   
            
        </>
    )
}