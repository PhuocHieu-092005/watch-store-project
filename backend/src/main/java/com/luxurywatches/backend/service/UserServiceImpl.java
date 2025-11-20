package com.luxurywatches.backend.service;

import com.luxurywatches.backend.dto.PageResponseDTO;
import com.luxurywatches.backend.dto.UserDTO;
import com.luxurywatches.backend.entity.Cart;
import com.luxurywatches.backend.entity.Order;
import com.luxurywatches.backend.entity.User;
import com.luxurywatches.backend.exception.ResourceNotFoundException;
import com.luxurywatches.backend.repository.CartRepository;
import com.luxurywatches.backend.repository.OrderRepository;
import com.luxurywatches.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    // === CÁC PHẦN ĐÃ THÊM MỚI ===
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;
    // ============================

    @Override
    public PageResponseDTO<UserDTO> getAllUsers(Pageable pageable) {
        Page<User> userPage = userRepository.findAll(pageable);
        List<UserDTO> userDTOs = userPage.getContent().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        PageResponseDTO<UserDTO> response = new PageResponseDTO<>();
        response.setContent(userDTOs);
        response.setPageNo(userPage.getNumber());
        response.setPageSize(userPage.getSize());
        response.setTotalElements(userPage.getTotalElements());
        response.setTotalPages(userPage.getTotalPages());
        response.setLast(userPage.isLast());

        return response;
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return convertToDto(user);
    }

    // === PHƯƠNG THỨC XÓA ĐÃ ĐƯỢC NÂNG CẤP ===
    @Override
    @Transactional // Đảm bảo tất cả các bước xóa diễn ra cùng nhau hoặc không gì cả
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        // Bước 1: Tìm và xóa Giỏ hàng của user này (nếu có)
        Optional<Cart> cart = cartRepository.findByUserId(userId);
        if (cart.isPresent()) {
            cartRepository.delete(cart.get());
        }

        // Bước 2: Tìm và xóa tất cả Đơn hàng của user này (nếu có)
        List<Order> orders = orderRepository.findByUserId(userId);
        if (!orders.isEmpty()) {
            orderRepository.deleteAll(orders);
        }

        // Bước 3: Cuối cùng mới xóa User
        // Lúc này user không còn dữ liệu ràng buộc nên sẽ xóa thành công
        userRepository.deleteById(userId);
    }
    // ========================================

    private UserDTO convertToDto(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setFullName(user.getFullName());
        userDTO.setRole(user.getRole());
        return userDTO;
    }
}