import supabase from '../../assets/config/SupabaseClient'

function createProd() {
  const [name, setName]  =useState('')
  const [price, setPrice]  =useState('')
  const [category, setCategory]  =useState('')
  const [description, setDescription]  =useState('')
  const [status, setStatus] =useState('')
  const [image, setImage]  =useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!name || !price || !category || !description || !status || !image) {
      setFormError('Please fill in all fields')
      return
    }
    
    const { data, error } = await supabase
      .from('DisplayProducts')
      .insert([
        { name, price, category, description, status, image }
      ])
    if (error) {
      console.log('There was an issue with your submission!', error)
      setFormError(error.message)
    } 
    if(data){
      console.log('Your submission was successfully submitted!')
      setFormError(null)
    }
  }


  

  return (
    <Box>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
        <label htmlFor="price">Price</label>
        <input type="text" id="price" onChange={(e) => setPrice(e.target.value)} />
        <label htmlFor="category">Category</label>
        <input type="text" id="category" onChange={(e) => setCategory(e.target.value)} />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="status">Status</label>
        <input type="text" id="status" onChange={(e) => setStatus(e.target.value)} />
        <label htmlFor="image">Image</label>
        <input type="text" id="image" onChange={(e) => setImage(e.target.value)} />
        <button type="submit" onClick={handleSubmit}>Submit</button>
        {formError && <p>{formError}</p>}
      </form>
    </Box>
  )
}

export default createProd;