import RecipeList from '../../components/RecipeList'
import { useCollection } from '../../hooks/useCollection'

// styles
import './Home.css'

export default function Home() {
  const { documents: recipes } = useCollection('recipes')
 
  return (
    <div className="home">
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  )
}
