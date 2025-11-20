package com.luxurywatches.backend.service;

import com.luxurywatches.backend.dto.OrderDTO;
import com.luxurywatches.backend.dto.OrderItemDTO;
import com.luxurywatches.backend.dto.PageResponseDTO; // <-- IMPORT MỚI
import com.luxurywatches.backend.entity.*;
import com.luxurywatches.backend.exception.ResourceNotFoundException;
import com.luxurywatches.backend.repository.CartRepository;
import com.luxurywatches.backend.repository.OrderRepository;
import com.luxurywatches.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page; // <-- IMPORT MỚI
import org.springframework.data.domain.Pageable; // <-- IMPORT MỚI
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartRepository cartRepository;

    @Value("${app.vat-rate}")
    private double vatRate;

    @Transactional
    public OrderDTO createOrder(Long userId, String shippingAddress) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + userId));
        if (cart.getItems().isEmpty()) {
            throw new IllegalStateException("Cannot create order from an empty cart.");
        }
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);
        order.setShippingAddress(shippingAddress);
        double subtotal = 0.0;
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            order.addOrderItem(orderItem);
            subtotal += cartItem.getQuantity() * cartItem.getProduct().getPrice();
        }
        double vatAmount = subtotal * vatRate;
        double finalTotalAmount = subtotal + vatAmount;
        order.setSubtotal(subtotal);
        order.setVatAmount(vatAmount);
        order.setFinalTotalAmount(finalTotalAmount);
        Order savedOrder = orderRepository.save(order);
        cart.getItems().clear();
        cartRepository.save(cart);
        return convertToDTO(savedOrder);
    }

    public List<OrderDTO> getOrdersByUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        return orderRepository.findByUserId(userId).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // === THAY THẾ PHƯƠNG THỨC CŨ BẰNG PHIÊN BẢN MỚI HỖ TRỢ PHÂN TRANG ===
    public PageResponseDTO<OrderDTO> getAllOrders(Pageable pageable) {
        Page<Order> orderPage = orderRepository.findAll(pageable);
        List<OrderDTO> orderDTOs = orderPage.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        PageResponseDTO<OrderDTO> response = new PageResponseDTO<>();
        response.setContent(orderDTOs);
        response.setPageNo(orderPage.getNumber());
        response.setPageSize(orderPage.getSize());
        response.setTotalElements(orderPage.getTotalElements());
        response.setTotalPages(orderPage.getTotalPages());
        response.setLast(orderPage.isLast());

        return response;
    }
    // =================================================================

    public OrderDTO getOrderByIdForAdmin(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        return convertToDTO(order);
    }

    @Transactional
    public OrderDTO updateOrderStatus(Long orderId, String statusString) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        try {
            OrderStatus newStatus = OrderStatus.valueOf(statusString.toUpperCase());
            order.setStatus(newStatus);
            Order updatedOrder = orderRepository.save(order);
            return convertToDTO(updatedOrder);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + statusString
                    + ". Valid values are: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED");
        }
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUser().getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setStatus(order.getStatus());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setOrderItems(order.getOrderItems().stream().map(this::convertItemToDTO).collect(Collectors.toList()));
        dto.setSubtotal(order.getSubtotal());
        dto.setVatAmount(order.getVatAmount());
        dto.setFinalTotalAmount(order.getFinalTotalAmount());
        return dto;
    }

    private OrderItemDTO convertItemToDTO(OrderItem item) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProduct().getName());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        return dto;
    }
}