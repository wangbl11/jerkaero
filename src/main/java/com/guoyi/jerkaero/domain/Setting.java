package com.guoyi.jerkaero.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.guoyi.jerkaero.domain.enumeration.SettingTypeEnum;

/**
 * A Setting.
 */
@Entity
@Table(name = "setting")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "setting")
public class Setting implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Size(max = 100)
	@Column(name = "name", length = 100, nullable = false)
	private String name;

	@NotNull
	@Enumerated(EnumType.ORDINAL)
	@Column(name = "jhi_type", nullable = false)
	private SettingTypeEnum type;

	@NotNull
	@Size(max = 200)
	@Column(name = "jhi_value", length = 200, nullable = false)
	private String value;

	@NotNull
	@Size(max = 200)
	@Column(name = "defvalue", length = 200, nullable = false)
	private String defvalue;

	@Column(name = "created_date", insertable = false, updatable = false)
	private LocalDate createdDate;

	@Column(name = "modified_date", insertable = false, updatable = false)
	private LocalDate modifiedDate;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public Setting name(String name) {
		this.name = name;
		return this;
	}

	public void setName(String name) {
		this.name = name;
	}

	public SettingTypeEnum getType() {
		return type;
	}

	public Setting type(SettingTypeEnum type) {
		this.type = type;
		return this;
	}

	public void setType(SettingTypeEnum type) {
		this.type = type;
	}

	public String getValue() {
		return value;
	}

	public Setting value(String value) {
		this.value = value;
		return this;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDefvalue() {
		return defvalue;
	}

	public Setting defvalue(String defvalue) {
		this.defvalue = defvalue;
		return this;
	}

	public void setDefvalue(String defvalue) {
		this.defvalue = defvalue;
	}

	public LocalDate getCreatedDate() {
		return createdDate;
	}

	public Setting createdDate(LocalDate createdDate) {
		this.createdDate = createdDate;
		return this;
	}

	public void setCreatedDate(LocalDate createdDate) {
		this.createdDate = createdDate;
	}

	public LocalDate getModifiedDate() {
		return modifiedDate;
	}

	public Setting modifiedDate(LocalDate modifiedDate) {
		this.modifiedDate = modifiedDate;
		return this;
	}

	public void setModifiedDate(LocalDate modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Setting setting = (Setting) o;
		if (setting.getId() == null || getId() == null) {
			return false;
		}
		return Objects.equals(getId(), setting.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(getId());
	}

	@Override
	public String toString() {
		return "Setting{" + "id=" + getId() + ", name='" + getName() + "'" + ", type='" + getType() + "'" + ", value='"
				+ getValue() + "'" + ", defvalue='" + getDefvalue() + "'" + ", createdDate='" + getCreatedDate() + "'"
				+ ", modifiedDate='" + getModifiedDate() + "'" + "}";
	}
}
