package com.luxurywatches.backend.service;

import com.luxurywatches.backend.dto.AddItemToCartRequest;
import com.luxurywatches.backend.dto.CartDTO;
import com.luxurywatches.backend.dto.CartItemDTO;
import com.luxurywatches.backend.entity.Cart;
import com.luxurywatches.backend.entity.CartItem;
import com.luxurywatches.backend.entity.Product;
import com.luxurywatches.backend.entity.User;
import com.luxurywatches.backend.exception.ResourceNotFoundException;
import com.luxurywatches.backend.repository.CartItemRepository;
import com.luxurywatches.backend.repository.CartRepository;
import com.luxurywatches.backend.repository.ProductRepository;
import com.luxurywatches.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value; // <-- IMPORT MỚI
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    // === PHẦN MỚI: ĐỌC MỨC THUẾ ===
    @Value("${app.vat-rate}")
    private double vatRate;
    // =============================

    @Override
    @Transactional
    public CartDTO addItemToCart(Long userId, AddItemToCartRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Product not found with id: " + request.getProductId()));
        Cart cart = getOrCreateCartForUser(userId);
        Optional<CartItem> existingCartItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(request.getProductId()))
                .findFirst();
        if (existingCartItem.isPresent()) {
            CartItem item = existingCartItem.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            cartItemRepository.save(item);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(request.getQuantity());
            cart.getItems().add(newItem);
        }
        updateCartTotalPrice(cart);
        Cart savedCart = cartRepository.save(cart);
        return mapCartToCartDTO(savedCart);
    }

    @Override
    public CartDTO getCartByUserId(Long userId) {
        Cart cart = getOrCreateCartForUser(userId);
        return mapCartToCartDTO(cart);
    }

    @Override
    @Transactional
    public CartDTO removeItemFromCart(Long userId, Long cartItemId) {
        Cart cart = getOrCreateCartForUser(userId);
        CartItem itemToRemove = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found with id: " + cartItemId));
        if (!itemToRemove.getCart().getId().equals(cart.getId())) {
            throw new SecurityException("User does not have permission to remove this item.");
        }
        cart.getItems().remove(itemToRemove);
        updateCartTotalPrice(cart);
        Cart savedCart = cartRepository.save(cart);
        return mapCartToCartDTO(savedCart);
    }

    private Cart getOrCreateCartForUser(Long userId) {
        return cartRepository.findByUserId(userId).orElseGet(() -> {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });
    }

    // === THAY THẾ PHƯƠNG THỨC CŨ ===
    private void updateCartTotalPrice(Cart cart) {
        double subtotal = cart.getItems().stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();

        double vatAmount = subtotal * vatRate;
        double finalTotalPrice = subtotal + vatAmount;

        cart.setSubtotal(subtotal);
        cart.setVatAmount(vatAmount);
        cart.setFinalTotalPrice(finalTotalPrice);
    }
    // =============================

    // === THAY THẾ PHƯƠNG THỨC CŨ ===
    private CartDTO mapCartToCartDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        List<CartItemDTO> itemDTOs = cart.getItems().stream().map(cartItem -> {
            CartItemDTO itemDTO = new CartItemDTO();
            Product product = cartItem.getProduct();
            itemDTO.setId(cartItem.getId());
            itemDTO.setProductId(product.getId());
            itemDTO.setProductName(product.getName());
            itemDTO.setPrice(product.getPrice());
            itemDTO.setImageUrl(product.getImageUrl());
            itemDTO.setQuantity(cartItem.getQuantity());
            return itemDTO;
        }).collect(Collectors.toList());

        cartDTO.setItems(itemDTOs);
        cartDTO.setSubtotal(cart.getSubtotal());
        cartDTO.setVatAmount(cart.getVatAmount());
        cartDTO.setFinalTotalPrice(cart.getFinalTotalPrice());

        return cartDTO;
    }
    // =============================
}