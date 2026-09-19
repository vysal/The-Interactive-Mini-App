import { type ChangeEvent, type FormEvent, useState } from 'react'
import './App.css'

type Product = {
  id: number
  name: string
  price: number
  inStock: boolean
  isOnSale: boolean
}

type ProductFormState = {
  name: string
  price: string
}

const initialProducts: Product[] = [
  { id: 1, name: 'Laptop Pro 14', price: 1299, inStock: true, isOnSale: true },
  { id: 2, name: 'Noise Cancelling Headphones', price: 299, inStock: false, isOnSale: false },
  { id: 3, name: 'Mechanical Keyboard', price: 189, inStock: true, isOnSale: true },
  { id: 4, name: '4K Monitor', price: 429, inStock: true, isOnSale: false },
]

const initialFormState: ProductFormState = {
  name: '',
  price: '',
}

function validateProduct(formData: ProductFormState) {
  const nextErrors: Partial<Record<keyof ProductFormState, string>> = {}

  if (!formData.name.trim()) {
    nextErrors.name = 'Product name is required.'
  }

  if (formData.price.trim() === '') {
    nextErrors.price = 'Price is required.'
  } else if (Number.isNaN(Number(formData.price))) {
    nextErrors.price = 'Price must be a valid number.'
  }

  return nextErrors
}

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [formData, setFormData] = useState<ProductFormState>(initialFormState)
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormState, string>>>({})

  const saleCount = products.filter((product) => product.isOnSale).length
  const visibleProducts = inStockOnly
    ? products.filter((product) => product.inStock)
    : products
  const totalProductsLabel = `${products.length} product${products.length === 1 ? '' : 's'}`

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement & {
      name: keyof ProductFormState
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateProduct(formData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const newProduct: Product = {
      id: Date.now(),
      name: formData.name.trim(),
      price: Number(formData.price),
      inStock: true,
      isOnSale: false,
    }

    setProducts((currentProducts) => [newProduct, ...currentProducts])
    setFormData(initialFormState)
  }

  return (
    <main className="app-shell">
      <section className="inventory-panel">
        <div className="top-bar">
          <div>
            <p className="eyebrow">Inventory</p>
            <h1>Product catalog</h1>
            <p className="product-total">{totalProductsLabel}</p>
          </div>

          <div className="toolbar">
            <label className="stock-toggle">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => setInStockOnly(event.target.checked)}
              />
              In stock only
            </label>

            {saleCount > 0 && <span className="sale-count">{saleCount} on sale</span>}
          </div>
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article key={product.id} className="product-card">
              <div className="card-head">
                <h2>{product.name}</h2>
                <span
                  className={`status-badge ${product.inStock ? 'in-stock' : 'sold-out'}`}
                >
                  {product.inStock ? 'In stock' : 'Sold out'}
                </span>
              </div>

              <div className="card-meta">
                <p className="price">${product.price.toFixed(2)}</p>
                {product.isOnSale && <span className="sale-tag">Sale</span>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="form-panel">
        <h3>Add product</h3>

        <form onSubmit={handleSubmit} className="product-form" noValidate>
          <label htmlFor="name">Product name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            aria-invalid={Boolean(errors.price)}
          />
          {errors.price && <p className="error-message">{errors.price}</p>}

          <button type="submit">Add product</button>
        </form>
      </aside>
    </main>
  )
}

export default App
