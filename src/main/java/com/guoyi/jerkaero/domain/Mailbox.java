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
import com.guoyi.jerkaero.domain.enumeration.MessageTypeEnum;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * A Mailbox.
 */
@Entity
@Table(name = "mailbox")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "mailbox")
public class Mailbox implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "send_id", nullable = false)
    private Long sendId;

    @NotNull
    @Column(name = "receiver_id", nullable = false)
    private Long receiverId;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "msg_type", nullable = false)
    private MessageTypeEnum msgType;

    @NotNull
    @Size(max = 200)
    @Column(name = "title", length = 200, nullable = false)
    private String title;

    @NotNull
    @Column(name = "mcontent", nullable = false)
    private String mcontent;

    @Column(name = "source_id", nullable = false)
    private Long sourceId;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "read_date", nullable = false)
    private LocalDateTime readDate;

    @NotNull
    @Column(name = "anonymous", nullable = false)
    private Integer anonymous;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSendId() {
        return sendId;
    }

    public Mailbox sendId(Long sendId) {
        this.sendId = sendId;
        return this;
    }

    public void setSendId(Long sendId) {
        this.sendId = sendId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public Mailbox receiverId(Long receiverId) {
        this.receiverId = receiverId;
        return this;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public MessageTypeEnum getMsgType() {
        return msgType;
    }

    @Enumerated(EnumType.ORDINAL)
    public Mailbox msgType(MessageTypeEnum msgType) {
        this.msgType = msgType;
        return this;
    }

    public void setMsgType(MessageTypeEnum msgType) {
        this.msgType = msgType;
    }

    public String getTitle() {
        return title;
    }

    public Mailbox title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMcontent() {
        return mcontent;
    }

    public Mailbox mcontent(String mcontent) {
        this.mcontent = mcontent;
        return this;
    }

    public void setMcontent(String mcontent) {
        this.mcontent = mcontent;
    }

    public Long getSourceId() {
        return sourceId;
    }

    public Mailbox sourceId(Long sourceId) {
        this.sourceId = sourceId;
        return this;
    }

    public void setSourceId(Long sourceId) {
        this.sourceId = sourceId;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public Mailbox createdDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getReadDate() {
        return readDate;
    }

    public Mailbox readDate(LocalDateTime readDate) {
        this.readDate = readDate;
        return this;
    }

    public void setReadDate(LocalDateTime readDate) {
        this.readDate = readDate;
    }

    public Integer getAnonymous() {
        return anonymous;
    }

    public Mailbox anonymous(Integer anonymous) {
        this.anonymous = anonymous;
        return this;
    }

    public void setAnonymous(Integer anonymous) {
        this.anonymous = anonymous;
    }


    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Mailbox mailbox = (Mailbox) o;
        if (mailbox.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mailbox.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mailbox{" +
            "id=" + getId() +
            ", sendId=" + getSendId() +
            ", receiverId=" + getReceiverId() +
            ", msgType=" + getMsgType() +
            ", title='" + getTitle() + "'" +
            ", mcontent='" + getMcontent() + "'" +
            ", sourceId=" + getSourceId() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", readDate='" + getReadDate() + "'" +
            ", anonymous=" + getAnonymous() +
            "}";
    }
}
