package com.guoyi.jerkaero.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.guoyi.jerkaero.domain.enumeration.AuthStatusEnum;

/**
 * A Jerk.
 */
@Entity
@Table(name = "jerk")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "jerk")
public class Jerk implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "username", length = 100, nullable = false)
    private String username;

    @NotNull
    @Size(max = 60)
    @Column(name = "passwd", length = 60, nullable = false)
    private String passwd;

    @NotNull
    @Size(max = 100)
    @Column(name = "displayname", length = 100, nullable = false)
    private String displayname;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "auth_status", nullable = false)
    private AuthStatusEnum authStatus;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "created_date",  insertable = false,updatable=false)
    private LocalDateTime createdDate;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "modified_date", insertable = false,updatable=false)
    private LocalDateTime modifiedDate;

    @OneToOne(fetch = FetchType.EAGER,cascade =  CascadeType.ALL)
    @JoinColumn(name="registration_id",unique = true)
    private Registration jerkInfo;


    @OneToOne(fetch = FetchType.EAGER,cascade =  CascadeType.ALL)
    @JoinColumn(name="preference_id")
    private Preference preference;

    @OneToMany
    @JoinColumn(name="receiver_id", insertable = false,updatable=false)
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Mailbox> inboxes = new HashSet<>();

    @OneToMany
    @JoinColumn(name="send_id", insertable = false,updatable=false)
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Mailbox> outboxes = new HashSet<>();

    @OneToMany(mappedBy = "jerk")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Footprint> favorites = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public Jerk username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswd() {
        return passwd;
    }

    public Jerk passwd(String passwd) {
        this.passwd = passwd;
        return this;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getDisplayname() {
        return displayname;
    }

    public Jerk displayname(String displayname) {
        this.displayname = displayname;
        return this;
    }

    public void setDisplayname(String displayname) {
        this.displayname = displayname;
    }

    public AuthStatusEnum getAuthStatus() {
        return authStatus;
    }

    public Jerk authStatus(AuthStatusEnum authStatus) {
        this.authStatus = authStatus;
        return this;
    }

    public void setAuthStatus(AuthStatusEnum authStatus) {
        this.authStatus = authStatus;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public Jerk createdDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public Jerk modifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
    
    public Registration getJerkInfo() {
        return jerkInfo;
    }

    public Jerk jerkInfo(Registration preference) {
        this.jerkInfo = preference;
        return this;
    }

    public void setJerkInfo(Registration jerkInfo) {
        this.jerkInfo = jerkInfo;
    }

    public Preference getPreference() {
        return preference;
    }

    public Jerk preference(Preference preference) {
        this.preference = preference;
        return this;
    }

    public void setPreference(Preference preference) {
        this.preference = preference;
    }

    public Set<Mailbox> getInboxes() {
        return inboxes;
    }

    public Jerk inboxes(Set<Mailbox> mailboxes) {
        this.inboxes = mailboxes;
        return this;
    }

    public Jerk addInbox(Mailbox mailbox) {
        this.inboxes.add(mailbox);
        return this;
    }

    public Jerk removeInbox(Mailbox mailbox) {
        this.inboxes.remove(mailbox);
        return this;
    }

    public void setInboxes(Set<Mailbox> mailboxes) {
        this.inboxes = mailboxes;
    }

    public Set<Mailbox> getOutboxes() {
        return outboxes;
    }

    public Jerk outboxes(Set<Mailbox> mailboxes) {
        this.outboxes = mailboxes;
        return this;
    }

    public Jerk addOutbox(Mailbox mailbox) {
        this.outboxes.add(mailbox);
        return this;
    }

    public Jerk removeOutbox(Mailbox mailbox) {
        this.outboxes.remove(mailbox);
        return this;
    }

    public void setOutboxes(Set<Mailbox> mailboxes) {
        this.outboxes = mailboxes;
    }

    public Set<Footprint> getFavorites() {
        return favorites;
    }

    public Jerk favorites(Set<Footprint> footprints) {
        this.favorites = footprints;
        return this;
    }

    public Jerk addFavorites(Footprint footprint) {
        this.favorites.add(footprint);
        footprint.setJerk(this);
        return this;
    }

    public Jerk removeFavorites(Footprint footprint) {
        this.favorites.remove(footprint);
        footprint.setJerk(null);
        return this;
    }

    public void setFavorites(Set<Footprint> footprints) {
        this.favorites = footprints;
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
        Jerk jerk = (Jerk) o;
        if (jerk.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jerk.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Jerk{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", passwd='" + getPasswd() + "'" +
            ", displayname='" + getDisplayname() + "'" +
            ", authStatus='" + getAuthStatus() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            "}";
    }
}
