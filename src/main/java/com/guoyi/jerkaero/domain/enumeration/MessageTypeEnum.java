package com.guoyi.jerkaero.domain.enumeration;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * The AgeEnum enumeration.
 */
public enum MessageTypeEnum {
    BROADCAST(0), PRIVATE(1);
    

    private final Integer id;
	
    private MessageTypeEnum(Integer id) {
        this.id = id;
    }

    @JsonValue
	public Integer getId() {
		return id;
	}
    
}
