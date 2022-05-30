import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ProductList from "../components/ProductList";
import { getCategoryById } from "../services/categoryService"

export default function CategoryView() {
  const [ category, setCategory ] = useState([])

  const {catId} = useParams()

  useEffect(() => {
    const getCategory = async () => {
      try {
        const categoryData = await getCategoryById(catId)
        setCategory([...category, categoryData])
      } catch (error) {
        throw error
      }
    }
    getCategory()
  }, [catId])

  if(category.length === 0) {
    return <h4 className="text-center">Hold on... I'm thinking :p</h4>
  }

  return (
    <div className="row">
      <h1 className="mb-4 text-center">{category[0].cat_name}</h1>
        <div className="col-12 col-md-4">
            {/* <CategoriesMenu /> */}
        </div>
        <ProductList categories={category}/>
    </div>
  )
}
