import { createContext, useReducer} from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
  const initialState = {
      users: [],
      user: {},
      loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer,initialState)
    
    

    //get single user 
     const getUser = async (login) => {
        
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers : {
            Authorization :`token ${GITHUB_TOKEN}`,
            },
        })

        if(response.status === 404){
            window.location = '/notfound'
        } else{
            const data = await response.json()
    
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }    
    }


    //Set Loading

    return <GithubContext.Provider 
    value={{
       ...state,
       dispatch,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext