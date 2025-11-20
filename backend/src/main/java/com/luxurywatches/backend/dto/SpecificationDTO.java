// File: src/main/java/com/luxurywatches/backend/dto/SpecificationDTO.java

package com.luxurywatches.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpecificationDTO {
    private String label;
    private String value;
}