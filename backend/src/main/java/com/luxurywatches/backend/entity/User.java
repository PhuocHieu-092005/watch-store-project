package com.luxurywatches.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections; // <-- IMPORT MỚI
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password; // Mật khẩu này sẽ được mã hóa

    @Column(nullable = false, unique = true)
    private String email;

    private String fullName;

    @Enumerated(EnumType.STRING) // Lưu role dưới dạng chuỗi (USER, ADMIN)
    private Role role;

    // Các phương thức của UserDetails mà Spring Security yêu cầu
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // === ĐÃ SỬA LỖI Ở ĐÂY ===
        // Kiểm tra nếu role là null thì trả về một danh sách quyền rỗng
        // để tránh lỗi NullPointerException.
        if (role == null) {
            return Collections.emptyList();
        }
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}