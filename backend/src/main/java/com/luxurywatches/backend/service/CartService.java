package com.luxurywatches.backend.service;

import com.luxurywatches.backend.dto.AddItemToCartRequest;
import com.luxurywatches.backend.dto.CartDTO;

public interface CartService {

    CartDTO addItemToCart(Long userId, AddItemToCartRequest request);

    CartDTO getCartByUserId(Long userId);

    // === CHỨC NĂNG MỚI ===
    /**
     * Chức năng xóa một item khỏi giỏ hàng của người dùng.
     * 
     * @param userId     ID của người dùng đang thực hiện (để bảo mật)
     * @param cartItemId ID của dòng item trong giỏ hàng cần xóa
     * @return Trả về thông tin giỏ hàng sau khi đã xóa
     */
    CartDTO removeItemFromCart(Long userId, Long cartItemId);
    // ======================
}