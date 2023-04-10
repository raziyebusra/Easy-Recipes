import {db} from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useTheme} from '../../hooks/useTheme'
// styles
import './Recipe.css'
import { getRoles } from '@testing-library/react'

export default function Recipe() {
  const { mode } = useTheme()

  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const { id } = useParams()


  useEffect( () => {
    setIsPending(true)
    
    const getRecipe = async () => {
      const recipeRef = doc(db, "recipes", id);
      const rec = await getDoc(recipeRef);
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
      o    <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}