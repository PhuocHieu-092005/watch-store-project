package com.luxurywatches.backend.service;

import com.luxurywatches.backend.dto.PageResponseDTO; // <-- IMPORT MỚI
import com.luxurywatches.backend.dto.UserDTO;
import org.springframework.data.domain.Pageable; // <-- IMPORT MỚI

public interface UserService {

    /**
     * Lấy danh sách tất cả người dùng theo trang.
     * 
     * @param pageable Đối tượng chứa thông tin phân trang (số trang, kích thước
     *                 trang, sắp xếp).
     * @return Một đối tượng PageResponseDTO chứa danh sách UserDTO của trang hiện
     *         tại và thông tin phân trang.
     */
    PageResponseDTO<UserDTO> getAllUsers(Pageable pageable);

    /**
     * Lấy thông tin chi tiết của một người dùng theo ID.
     * 
     * @param userId ID của người dùng cần tìm.
     * @return UserDTO chứa thông tin người dùng.
     */
    UserDTO getUserById(Long userId);

    /**
     * Xóa một người dùng theo ID.
     * 
     * @param userId ID của người dùng cần xóa.
     */
    void deleteUser(Long userId);
}