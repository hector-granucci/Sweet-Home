import { useParams } from "react-router-dom";
import { getProductDetail,addtoCart, postShoppingCart } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContex"
import axios from "axios";


const Detail = () => {
  const dispatch = useDispatch();
  const allShoppingCart = useSelector((state) => state.shoppingCart);
  const product = useSelector((state) => state.details);
  const { id } = useParams();

  const [cartId, setCartId] = useState(null) 
  // este es el id del producto

  const isProductInCart = allShoppingCart.some((product) => product.id === id);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const navigate = useNavigate();

  const handleShoppingCart = () => {
    dispatch(addtoCart(product));
  };

  const backToHome = () => {
    navigate("/");
  };

  const {user} = useAuth()

  useEffect(()=>{
    if(user && user.email){
      checkUserIdInDatabase(user.email)
    }
  },[user])

  const checkUserIdInDatabase = async(userEmail)=>{
    try {
      const response = await axios(`http://localhost:3001/api/users/v1/${userEmail}`)
     

      if(response && response.data.cart) {
        setCartId(response.data._id);
        }


    } catch (error) {
      console.log(error.message);
    }
  }

  const handleSubmit = async(event) => {
    event.preventDefault()

    if (cartId) {
      const updatedCart = {
        user: cartId,
        products: [
          {
            product: id,
            quantity: 1,
          },
        ],
      };

      dispatch(postShoppingCart(updatedCart));
    } else {
      const newCart = {
        user: user._id,
        products: [
          {
            product: id,
            quantity: 1,
          },
        ],
      };

      dispatch(postShoppingCart(newCart));
    }
  };

  function handleClick(event) {
    handleSubmit(event);
    handleShoppingCart();
  }

  


  
  return (
   
    <section className="py-12 sm:py-16"> 
    <div className="container mx-auto px-4">
      <nav className="flex">
        <ol role="list" className="flex items-center">
          <li className="text-left">
            <div className="-m-1">
              <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> Home </a>
            </div>
          </li>
  
          <li className="text-left">
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <div className="-m-1">
                <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> Products </a>
              </div>
            </div>
          </li>
  
          <li className="text-left">
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <div className="-m-1">
                <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800" aria-current="page">{product.category?.map((el) => el.name)} </a>
              </div>
            </div>
          </li>
        </ol>
      </nav>
  
      <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-3 lg:row-end-1">
          <div className="lg:flex lg:items-start">
            <div className="lg:order-2 lg:ml-5">
              <div className="max-w-xl overflow-hidden rounded-lg">
                <img className="h-full w-full max-w-full object-cover" src={product.image} alt={product.name} />
              </div>
            </div>
  
            <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
  
            </div>
          </div>
        </div>
  
        <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
          <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
  
          <div className="mt-5 flex items-center">
            <div className="flex items-center">
              <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
              </svg>
              <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
              </svg>
              <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
              </svg>
              <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
              </svg>
              <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
              </svg>
            </div>
            <p className="ml-2 text-sm font-medium text-gray-500">1,209 Reviews</p>
          </div>
          <h2 className="mt-8 text-base text-gray-900">Extension your warranty</h2>
          <div className="mt-3 flex select-none flex-wrap items-center gap-1">
            <label className="">
              <input type="radio" name="subscription" value="4 Months" className="peer sr-only" />
              <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">4 Months</p>
              <span className="mt-1 block text-center text-xs">$80/mo</span>
            </label>
            <label className="">
              <input type="radio" name="subscription" value="8 Months" className="peer sr-only" defaultChecked />
              <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">8 Months</p>
              <span className="mt-1 block text-center text-xs">${product.price}</span>
            </label>
            <label className="">
              <input type="radio" name="subscription" value="12 Months" className="peer sr-only" />
              <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">12 Months</p>
              <span className="mt-1 block text-center text-xs">$40/mo</span>
            </label>
          </div>
  
          <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
            <div className="flex items-end">
              <h1 className="text-3xl font-bold">${product.price}</h1>
              
            </div>
   
            <button  onClick={handleClick } type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to cart
            </button>
            
           </div>
  
          <ul className="mt-8 space-y-2">
            <li className="flex items-center text-left text-sm font-medium text-gray-600">
              <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
              </svg>
              Free shipping worldwide
            </li>
  
            <li className="flex items-center text-left text-sm font-medium text-gray-600">
              <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" className=""></path>
              </svg>
              Cancel Anytime
            </li>
          </ul>
        </div>
  
        <div className="lg:col-span-3">
          <div className="border-b border-gray-300">
            <nav className="flex gap-4">
              <a href="#" title="" className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </a>
  
              <a href="#" title="" className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600">
                Reviews
                <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100"> 1,209 </span>
              </a>
            </nav>
          </div>
  
          <div className="mt-8 flow-root sm:mt-12">
            <h1 className="text-3xl font-bold">Produt Description</h1>
            <p className="mt-4">{product.description}.</p>
            <h1 className="mt-8 text-3xl font-bold">Deliver to Your Door</h1>
            <p className="mt-4">Discover the convenience of doorstep delivery with our exceptional ecommerce service.</p>
            
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <button
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          onClick={backToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  </section>
  
  );
};

export default Detail;
