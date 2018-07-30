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

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * A Message.
 */
@Entity
@Table(name = "message")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "message")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "rec_id", nullable = false)
    private Long recID;

    @Column(name = "rec_name", nullable = false)
    private String recName;
    
//    @NotNull
//    @Column(name = "message_id", nullable = false)
//    private Long messageID;

    @NotNull
    @Column(name = "statue", nullable = false)
    private Integer statue;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "read_date", nullable = false)
    private LocalDateTime readDate;
     
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="message_id")
    private MessageText messageText;
    
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Message() {
    	
    }
    		
    public Message(Long sendID, Long recID, Long messageID, Integer statue) {
		super();
		this.recID = recID;
		//this.messageID = messageID;
		this.statue = statue;
	}
    
    public Long getId() {
        return id;
    }



	public void setId(Long id) {
        this.id = id;
    }

    public Long getRecID() {
        return recID;
    }

    public Message recID(Long recID) {
        this.recID = recID;
        return this;
    }

    public void setRecID(Long recID) {
        this.recID = recID;
    }

//    public Long getMessageID() {
//        return messageID;
//    }
//
//    public Message messageID(Long messageID) {
//        this.messageID = messageID;
//        return this;
//    }
//
//    public void setMessageID(Long messageID) {
//        this.messageID = messageID;
//    }

    public Integer getStatue() {
        return statue;
    }

    public Message statue(Integer statue) {
        this.statue = statue;
        return this;
    }

    public void setStatue(Integer statue) {
        this.statue = statue;
    }

    public LocalDateTime getReadDate() {
        return readDate;
    }

    public Message readDate(LocalDateTime readDate) {
        this.readDate = readDate;
        return this;
    }

    public void setReadDate(LocalDateTime readDate) {
        this.readDate = readDate;
    }
    
    public String getRecName() {
		return recName;
	}
    
    public Message recName(String recName) {
        this.recName = recName;
        return this;
    }
	
    public void setRecName(String recName) {
		this.recName = recName;
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
        Message message = (Message) o;
        if (message.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), message.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Message{" +
            "id=" + getId() +
            ", recID=" + getRecID() +
            ", recName=" + getRecName() +
            ", statue=" + getStatue() +
            ", readDate='" + getReadDate() + "'" +
            "}";
    }
}
