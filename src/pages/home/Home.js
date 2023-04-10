import {db} from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import RecipeList from '../../components/RecipeList'
import { useEffect, useState } from 'react'

// styles
import './Home.css'

export default function Home() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)
    
    const ref = collection(db, 'recipes')

    getDocs(ref)
      .then((snapshot) => {
        if (snapshot.empty) {
          setError('No recipes to load')
          setIsPending(false)
        } else{
        let results =[]

        // this is the way we fetch data from firebase
        snapshot.docs.forEach(doc => {
          results.push({id: doc.id, ...doc.data()})
        })
        setData(results)
        setIsPending(false)
        }
      }).catch(err => {
        setError(err.message)
        setIsPending(false)
      })
     
   // db.collection('recipes').get().then((snapshot) => { bu v.8'deki yöntemdi. 9'da değişti. 


    }, [] )

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
