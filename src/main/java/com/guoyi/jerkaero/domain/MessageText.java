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
@Table(name = "message_text")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "messagetext")
public class MessageText implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

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
	
    @OneToMany(fetch = FetchType.EAGER,cascade =  CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "message_id")
    private Set<Message> receivers;

	public MessageText() {
		
	}
	public MessageText(Long sendID, MessageTypeEnum msgType, MessageTextStatusEnum msgStatus, String title,
			String mcontent) {
		super();
		this.sendID = sendID;
		this.msgType = msgType;
		this.msgStatus = msgStatus;
		this.title = title;
		this.mcontent = mcontent;
	}

	// @Transient
	// private Long[] recIDs;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getSendID() {
		return sendID;
	}

	public MessageText sendID(Long sendID) {
		this.sendID = sendID;
		return this;
	}

	public void setSendID(Long sendID) {
		this.sendID = sendID;
	}

	public MessageTypeEnum getMsgType() {
		return msgType;
	}

	public MessageText msgType(MessageTypeEnum msgType) {
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

	public MessageText title(String title) {
		this.title = title;
		return this;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMcontent() {
		return mcontent;
	}

	public MessageText mcontent(String mcontent) {
		this.mcontent = mcontent;
		return this;
	}

	public void setMcontent(String mcontent) {
		this.mcontent = mcontent;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public MessageText createdDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
		return this;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}
	
	

	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	public Set<Message> getReceivers() {
		return receivers;
	}
	public void setReceivers(Set<Message> receivers) {
		this.receivers = receivers;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		MessageText messageText = (MessageText) o;
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
