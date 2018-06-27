package com.guoyi.jerkaero.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Footprint.
 */
@Entity
@Table(name = "footprint")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "footprint")
public class Footprint implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "source_id", nullable = false)
    private Long sourceId;

    @NotNull
    @Column(name = "source_type", nullable = false)
    private Integer sourceType;

    @NotNull
    @Column(name = "reader_id", nullable = false)
    private Long readerId;

    @NotNull
    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate;

    @ManyToOne
    private Jerk jerk;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSourceId() {
        return sourceId;
    }

    public Footprint sourceId(Long sourceId) {
        this.sourceId = sourceId;
        return this;
    }

    public void setSourceId(Long sourceId) {
        this.sourceId = sourceId;
    }

    public Integer getSourceType() {
        return sourceType;
    }

    public Footprint sourceType(Integer sourceType) {
        this.sourceType = sourceType;
        return this;
    }

    public void setSourceType(Integer sourceType) {
        this.sourceType = sourceType;
    }

    public Long getReaderId() {
        return readerId;
    }

    public Footprint readerId(Long readerId) {
        this.readerId = readerId;
        return this;
    }

    public void setReaderId(Long readerId) {
        this.readerId = readerId;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public Footprint createdDate(LocalDate createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public Jerk getJerk() {
        return jerk;
    }

    public Footprint jerk(Jerk jerk) {
        this.jerk = jerk;
        return this;
    }

    public void setJerk(Jerk jerk) {
        this.jerk = jerk;
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
        Footprint footprint = (Footprint) o;
        if (footprint.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), footprint.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Footprint{" +
            "id=" + getId() +
            ", sourceId=" + getSourceId() +
            ", sourceType=" + getSourceType() +
            ", readerId=" + getReaderId() +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
