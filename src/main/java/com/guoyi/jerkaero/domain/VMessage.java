package com.guoyi.jerkaero.domain;

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
import com.guoyi.jerkaero.domain.enumeration.MessageTextStatusEnum;
import com.guoyi.jerkaero.domain.enumeration.MessageTypeEnum;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * A MessageText.
 */
@Entity
@Table(name = "v_message")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "vmessage")
public class VMessage implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    @NotNull
    @Column(name = "message_id", nullable = false)
    private Long messageID;
	
	@NotNull
	@Column(name = "send_id", nullable = false)
	private Long sendID;

	@NotNull
	@Enumerated(EnumType.ORDINAL)
	@Column(name = "msg_type", nullable = false)
	private MessageTypeEnum msgType;

	@NotNull
	@Enumerated(EnumType.ORDINAL)
	@Column(name = "msg_status", nullable = false)
	private MessageTextStatusEnum msgStatus;

	@NotNull
	@Size(max = 120)
	@Column(name = "title", length = 120, nullable = false)
	private String title;

	@NotNull
	@Column(name = "mcontent", nullable = false)
	private String mcontent;

	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "created_date", nullable = false)
	private LocalDateTime createdDate;
	
    @NotNull
    @Column(name = "rec_id", nullable = false)
    private Long recID;
    
    @Column(name = "rec_name", nullable = false)
    private String recName;
    
    @NotNull
    @Column(name = "statue", nullable = false)
    private Integer statue;
    
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "read_date", nullable = false)
    private LocalDateTime readDate;

	public VMessage() {
		
	}
	public VMessage(Long sendID, MessageTypeEnum msgType, MessageTextStatusEnum msgStatus, String title,
			String mcontent) {
		super();
		this.sendID = sendID;
		this.msgType = msgType;
		this.msgStatus = msgStatus;
		this.title = title;
		this.mcontent = mcontent;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getSendID() {
		return sendID;
	}

	public VMessage sendID(Long sendID) {
		this.sendID = sendID;
		return this;
	}

	public void setSendID(Long sendID) {
		this.sendID = sendID;
	}

	public MessageTypeEnum getMsgType() {
		return msgType;
	}

	public VMessage msgType(MessageTypeEnum msgType) {
		this.msgType = msgType;
		return this;
	}

	public void setMsgType(MessageTypeEnum msgType) {
		this.msgType = msgType;
	}

	public MessageTextStatusEnum getMsgStatus() {
		return msgStatus;
	}

	public MessageTextStatusEnum msgStatus() {
		return msgStatus;
	}

	public void setMsgStatus(MessageTextStatusEnum msgStatus) {
		this.msgStatus = msgStatus;
	}

	public String getTitle() {
		return title;
	}

	public VMessage title(String title) {
		this.title = title;
		return this;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMcontent() {
		return mcontent;
	}

	public VMessage mcontent(String mcontent) {
		this.mcontent = mcontent;
		return this;
	}

	public void setMcontent(String mcontent) {
		this.mcontent = mcontent;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public VMessage createdDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
		return this;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}
	
	public Long getRecID() {
	        return recID;
	}

	public VMessage recID(Long recID) {
	      this.recID = recID;
	        return this;
	}

	public void setRecID(Long recID) {
	        this.recID = recID;
	}
	    
	public String getRecName() {
		return recName;
	}
	public void setRecName(String recName) {
		this.recName = recName;
	}
	public Integer getStatue() {
		return statue;
	}
	public void setStatue(Integer statue) {
		this.statue = statue;
	}
	public LocalDateTime getReadDate() {
		return readDate;
	}
	public void setReadDate(LocalDateTime readDate) {
		this.readDate = readDate;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		VMessage messageText = (VMessage) o;
		if (messageText.getId() == null || getId() == null) {
			return false;
		}
		return Objects.equals(getId(), messageText.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(getId());
	}

	@Override
	public String toString() {
		return "MessageText{" + "id=" + getId() + ", sendID=" + getSendID() + ", type=" + getMsgType() + ", title='"
				+ getTitle() + "'" + ", mcontent='" + getMcontent() + "'" + ", createdDate='" + getCreatedDate() + "'"
				+ "}";
	}
}
