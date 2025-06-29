


import { Form, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";
import Cart from "../cart/Cart";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
 const navigation = useNavigation()
 const isSubmiting = navigation.state === "submitting" 
 const formErrors = useActionData()
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Lets go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p> }
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <button disabled={isSubmiting}>{isSubmiting ? "ordering..." : "Order now"}</button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}){
  const formData = await request.formData();
  const data =  Object.fromEntries(formData)

  const order = {
    ...data , 
    priority: data.priority === "on" ,
    cart: JSON.parse(data.cart)
  }
    const errors = {}
  if(!isValidPhone) errors.phone = "pelase give us a valid phone number"
  if(Object.keys(errors).length > 0) return errors

  // if every inputs are ok then create order into server and redirect to that page
  const newOrder = await createOrder(order)

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
