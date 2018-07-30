package com.guoyi.jerkaero.web.rest.vm;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.guoyi.jerkaero.domain.MessageText;
import com.guoyi.jerkaero.domain.enumeration.MessageTextStatusEnum;
import com.guoyi.jerkaero.domain.enumeration.MessageTypeEnum;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * A MessageText.
 */

public class MessageTextVM implements Serializable {


    private Long id;

    private Long sendID;

    @Enumerated(EnumType.ORDINAL)
    private MessageTypeEnum msgType;

    @Enumerated(EnumType.ORDINAL)
    private MessageTextStatusEnum msgStatus;

    @Size(max = 120)
    private String title;

    @NotNull
    private String mcontent;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdDate;
    
   
    private Long[] recIDs;
    
    private String[] recNames;
    
    public MessageTextVM() {
    	
    }
    
    public MessageTextVM(MessageText message) {
		this.id=message.getId();
		this.sendID = message.getSendID();
		this.msgType = message.getMsgType();
		this.msgStatus = message.getMsgStatus();
		this.title = message.getTitle();
		this.mcontent = message.getMcontent();
		this.createdDate = message.getCreatedDate();
	}

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSendID() {
        return sendID;
    }

    public void setSendID(Long sendID) {
        this.sendID = sendID;
    }

    public MessageTypeEnum getMsgType() {
        return msgType;
    }

    public void setMsgType(MessageTypeEnum msgType) {
        this.msgType = msgType;
    }

    public MessageTextStatusEnum getMsgStatus() {
		return msgStatus;
	}
    
	public void setMsgStatus(MessageTextStatusEnum msgStatus) {
		this.msgStatus = msgStatus;
	}

	public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMcontent() {
        return mcontent;
    }

    public void setMcontent(String mcontent) {
        this.mcontent = mcontent;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
    
    public Long[] getRecIDs() {
		return recIDs;
	}

	public void setRecIDs(Long[] recIDs) {
		this.recIDs = recIDs;
	}

	

    public String[] getRecNames() {
		return recNames;
	}

	public void setRecNames(String[] recNames) {
		this.recNames = recNames;
	}

	@Override
    public String toString() {
        return "MessageText{" +
            "id=" + getId() +
            ", sendID=" + getSendID() +
            ", type=" + getMsgType() +
            ", title='" + getTitle() + "'" +
            ", mcontent='" + getMcontent() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
