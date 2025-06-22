
export default function AddToCartButton({
  hasSizesOrExtras, onClick, basePrice, image
}) {
  if (!hasSizesOrExtras) {
    return (
          <button 
          type="button"
          onClick={onClick}
          className="mt-4 bg-primary text-white rounded-full px-8 py-2"
          >
            Add to cart ${basePrice}
          </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      <span>Add to cart (from ${basePrice})</span>
    </button>
  );
}