import User from '../models/User.js';

// Retrieve wishlist of favorite cars for current user
export const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.status(200).json({
      success: true,
      wishlist: user.wishlist || [],
    });
  } catch (error) {
    next(error);
  }
};

// Add or remove vehicle from user wishlist
export const toggleWishlist = async (req, res, next) => {
  try {
    const { carId } = req.params;
    const user = await User.findById(req.user._id);

    const isFav = user.wishlist.some((id) => id.toString() === carId);

    if (isFav) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== carId);
    } else {
      user.wishlist.push(carId);
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('wishlist');

    res.status(200).json({
      success: true,
      isWishlisted: !isFav,
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    next(error);
  }
};
