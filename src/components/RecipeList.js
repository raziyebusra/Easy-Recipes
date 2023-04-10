import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'
import trashcan from '../assets/trashcan.svg'

// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
  const { mode } = useTheme()

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>
  }

  const handleClick = (id) => {
    const db = getFirestore();
    const ref = doc(db, "recipes", id);
    
    deleteDoc(ref)
    .then(() => {
        console.log("Entire Document has been deleted successfully.")
    })
    .catch(error => {
        console.log(error);
    })
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            className='delete'
            src={trashcan}
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  )
}
