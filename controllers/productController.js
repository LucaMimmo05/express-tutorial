// Controller per la gestione dei prodotti
export const getAllProducts = (req,res) => {

    const products =[
        {id:1,name:"Laptop", price:1000},
        {id:2,name:"Mobile", price:500}
    ]

    res.status(200).json({products})

}

// Controller per ricerca di singolo prodotto
export const getSingleProduct = (req,res) =>  {

    const products =[
        {id:1,name:"Laptop", price:1000},
        {id:2,name:"Mobile", price:500}
    ]

    const id = Number(req.params.id);

    const product = products.find((p) => p.id === id);

    if(!product) {
        return res.status(404).json({message: "Product Not Found"})
    }

    res.status(200).json({product});

}
// Controller per creazione nuovo prodotto
export const createProduct = (req,res) => {
    const newProduct = req.body;

    newProduct.id = Date.now();

    res.status(201).json(newProduct);

}