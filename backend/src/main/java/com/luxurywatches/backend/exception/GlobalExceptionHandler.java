package com.luxurywatches.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

// Annotation này cho phép class này hoạt động như một trình xử lý lỗi toàn cục
@ControllerAdvice
public class GlobalExceptionHandler {

    // Phương thức này sẽ chỉ bắt lỗi ResourceNotFoundException
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleResourceNotFoundException(ResourceNotFoundException ex,
            WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    // === PHẦN THÊM VÀO ĐỂ XỬ LÝ LỖI 403 ===
    /**
     * Bắt lỗi AccessDeniedException (ném ra bởi @PreAuthorize)
     * 
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorDetails> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(
                new Date(),
                "Access Denied",
                "You do not have permission to perform this action.");
        return new ResponseEntity<>(errorDetails, HttpStatus.FORBIDDEN);
    }
    // =======================================

    // Phương thức này sẽ bắt tất cả các lỗi khác chưa được xử lý cụ thể
    // QUAN TRỌNG: Phương thức này phải được đặt CUỐI CÙNG
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleGlobalException(Exception ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(
                new Date(),
                "An internal error occurred",
                request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}