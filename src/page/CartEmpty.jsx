
import EmptyCart from '../assets/img/emptycart.png';
const CartEmpty = () => {
    return (
        <div className="bg-gray-50 min-h-full p-6 flex items-center justify-center rounded-lg">
            <div>
                <img src={EmptyCart} alt="" />
            </div>

        </div>
    );
};

export default CartEmpty;