import {db} from '../../firebase/config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useTheme} from '../../hooks/useTheme'
// styles
import './Recipe.css'
//import { getRoles } from '@testing-library/react'

export default function Recipe() {
  const { mode } = useTheme()

  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const { id } = useParams()

  useEffect( () => {
    setIsPending(true)
    
    let ref = collection(db, id)

    const unsub = onSnapshot(ref, (snapshot) => {

    })


    const getRecipe = () => {
      const ref = doc(db, "recipes", id);
      const rec = await getDoc(ref);
      if (rec.empty) {
        setError("Could not find that recipe");
        setIsPending(false);
      } else {
        setRecipe(rec.data());
        setIsPending(false);
      }
    }
    getRecipe()
  }, [id])
  return{ documents }

  //updating document-- aşağısı olmadı :/

  const handleClick = () => {
    const docRef = doc(db, 'recipes', id)
    
    updateDoc(docRef, {
      title: 'Something completely different'
    })
    .then(docRef => {
      console.log("title has changed")
    })
    .catch(error => {
      console.log(error)
    })
  }
      

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update</button>
        </>
      )}
    </div>
  )
}