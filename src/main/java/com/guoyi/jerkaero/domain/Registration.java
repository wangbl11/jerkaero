package com.guoyi.jerkaero.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import com.guoyi.jerkaero.domain.enumeration.Decision;

import com.guoyi.jerkaero.domain.enumeration.HxjslyEnum;

import com.guoyi.jerkaero.domain.enumeration.KjcgzhEnum;
import com.guoyi.jerkaero.domain.enumeration.RegisterEnum;
import com.guoyi.jerkaero.domain.enumeration.JmlyqkEnum;

import com.guoyi.jerkaero.domain.enumeration.XbEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.guoyi.jerkaero.domain.enumeration.AgeEnum;

import com.guoyi.jerkaero.domain.enumeration.RzjhgkfwEnum;

import com.guoyi.jerkaero.domain.enumeration.RzmbEnum;
import com.guoyi.jerkaero.domain.enumeration.SslyEnum;
import com.guoyi.jerkaero.domain.enumeration.SzqylxEnum;

/**
 * A Registration.
 */
@Entity
@Table(name = "registration")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "registration")
public class Registration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY,mappedBy = "jerkInfo")
    private Jerk jerk;

    @NotNull
    @Column(name = "regist_type", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private RegisterEnum registType;

    @NotNull
    @Size(max = 60)
    @Column(name = "dwqc", length = 60, nullable = false)
    private String dwqc;

    @NotNull
    @Size(max = 120)
    @Column(name = "hxcpmc", length = 120, nullable = false)
    private String hxcpmc;

    @Column(name = "zztjdw")
    private String zztjdw;

    @NotNull
    @Size(max = 100)
    @Column(name = "dwhgrdz", length = 100, nullable = false)
    private String dwhgrdz;

    @NotNull
    @Column(name = "szqylx", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private SzqylxEnum szqylx;

    //所属领域
    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "ssly", nullable = false)
    private SslyEnum ssly;

    @NotNull
    @Size(max = 360)
    @Column(name = "gscpjj", length = 360, nullable = false)
    private String gscpjj;

    @NotNull
    @Column(name = "mbkhsc", nullable = false)
    private String mbkhsc;

    //当前主要客户
    @Column(name = "dqzykh")
    private String dqzykh;

    //国内外获奖奖项
    @Size(max = 500)
    @Column(name = "gnwhjjx", length = 500)
    private String gnwhjjx;

    //专利技术
    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "zljs", nullable = false)
    private Decision zljs;
    
  //专利技术數量
    @Column(name = "zljs_1")
    private Integer zljs1;

    //核心技术来源
    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "hxjsly", nullable = false)
    private HxjslyEnum hxjsly;
    
    //科技成果转化
    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "kjcgzh", nullable = false)
    private KjcgzhEnum kjcgzh;

    //军民两用情况
    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "jmlyqk", nullable = false)
    private JmlyqkEnum jmlyqk;

    //技术（项目）成熟度
    @Size(max = 120)
    @Column(name = "jscsd", length = 120)
    private String jscsd;

    //盈利模式及目前盈利情况，创业专用
    @Size(max = 500)
    @Column(name = "jzmsylqk", length = 500)
    private String jzmsylqk;

    //竞争优势介绍
    @NotNull
    @Size(max = 500)
    @Column(name = "jzysjs", length = 500, nullable = false)
    private String jzysjs;

    //CEO或创始人或项目负责人姓名
    @NotNull
    @Size(max = 20)
    @Column(name = "fzrdh", length = 20, nullable = false)
    private String fzrdh;

    //性别
    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "xb", nullable = false)
    private XbEnum xb;

    //联系方式
    @NotNull
    @Size(max = 36)
    @Column(name = "lxfs", length = 36, nullable = false)
    private String lxfs;

    @NotNull
    @Size(max = 36)
    @Column(name = "email", length = 36, nullable = false)
    private String email;

    //创始人或项目负责人年龄
    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "fzrnl", nullable = false)
    private AgeEnum fzrnl;

    //团队平均年龄
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "tdpjnl")
    private AgeEnum tdpjnl;

    //高级人才数
    @NotNull
    @Column(name = "gjrcs", nullable = false)
    private Integer gjrcs;

    //是否国家认证高新技术企业
    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "sfgjrzgxjsqy", nullable = false)
    private Decision sfgjrzgxjsqy;

    //团队优势介绍
    @NotNull
    @Size(max = 500)
    @Column(name = "tdysjs", length = 500, nullable = false)
    private String tdysjs;

    //现有产值
    @NotNull
    @Size(max = 24)
    @Column(name = "xycz", length = 24, nullable = false)
    private String xycz;

    //未来希望获得支持类型，多选，逗号分割
    @NotNull
    @Size(max = 36)
    @Column(name = "wlxwhdzclx", length = 36, nullable = false)
    private String wlxwhdzclx;

    @Size(max = 100)
    @Column(name = "wlxwhdzclx_1", length = 100)
    private String wlxwhdzclx1;

    //您是否需要大赛组委会协助您进行媒体宣传
    @Size(max = 100)
    @Column(name = "sfxyxc", length = 100)
    private String sfxyxc;

    //融资计划公开范围
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "rzjhgkfw")
    private RzjhgkfwEnum rzjhgkfw;

    //融资目标
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "rzmb")
    private RzmbEnum rzmb;

    //联系人职位
    @NotNull
    @Size(max = 100)
    @Column(name = "lxrzw", length = 100, nullable = false)
    private String lxrzw;

    //联系电话
    @NotNull
    @Column(name = "lxdh", nullable = false)
    private String lxdh;

    //联系邮箱
    @NotNull
    @Size(max = 60)
    @Column(name = "lxyx", length = 60, nullable = false)
    private String lxyx;

    //联系地址
    @NotNull
    @Size(max = 120)
    @Column(name = "lxdz", length = 120, nullable = false)
    private String lxdz;

    @Size(max = 60)
    @Column(name = "ssly_1", length = 60)
    private String ssly1;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;
    
    @Column(name="fbzt")
    private Integer fbzt;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RegisterEnum getRegistType() {
        return registType;
    }

    public Registration registType(RegisterEnum registType) {
        this.registType = registType;
        return this;
    }

    public void setRegistType(RegisterEnum registType) {
        this.registType = registType;
    }

    public String getDwqc() {
        return dwqc;
    }

    public Registration dwqc(String dwqc) {
        this.dwqc = dwqc;
        return this;
    }

    public void setDwqc(String dwqc) {
        this.dwqc = dwqc;
    }

    public String getHxcpmc() {
        return hxcpmc;
    }

    public Registration hxcpmc(String hxcpmc) {
        this.hxcpmc = hxcpmc;
        return this;
    }

    public void setHxcpmc(String hxcpmc) {
        this.hxcpmc = hxcpmc;
    }

    public String getZztjdw() {
        return zztjdw;
    }

    public Registration zztjdw(String zztjdw) {
        this.zztjdw = zztjdw;
        return this;
    }

    public void setZztjdw(String zztjdw) {
        this.zztjdw = zztjdw;
    }

    public String getDwhgrdz() {
        return dwhgrdz;
    }

    public Registration dwhgrdz(String dwhgrdz) {
        this.dwhgrdz = dwhgrdz;
        return this;
    }

    public void setDwhgrdz(String dwhgrdz) {
        this.dwhgrdz = dwhgrdz;
    }

    public SzqylxEnum getSzqylx() {
        return szqylx;
    }

    public Registration szqylx(SzqylxEnum szqylx) {
        this.szqylx = szqylx;
        return this;
    }

    public void setSzqylx(SzqylxEnum szqylx) {
        this.szqylx = szqylx;
    }

    public SslyEnum getSsly() {
        return ssly;
    }

    public Registration ssly(SslyEnum ssly) {
        this.ssly = ssly;
        return this;
    }

    public void setSsly(SslyEnum ssly) {
        this.ssly = ssly;
    }

    public String getGscpjj() {
        return gscpjj;
    }

    public Registration gscpjj(String gscpjj) {
        this.gscpjj = gscpjj;
        return this;
    }

    public void setGscpjj(String gscpjj) {
        this.gscpjj = gscpjj;
    }

    public String getMbkhsc() {
        return mbkhsc;
    }

    public Registration mbkhsc(String mbkhsc) {
        this.mbkhsc = mbkhsc;
        return this;
    }

    public void setMbkhsc(String mbkhsc) {
        this.mbkhsc = mbkhsc;
    }

    public String getDqzykh() {
        return dqzykh;
    }

    public Registration dqzykh(String dqzykh) {
        this.dqzykh = dqzykh;
        return this;
    }

    public void setDqzykh(String dqzykh) {
        this.dqzykh = dqzykh;
    }

    public String getGnwhjjx() {
        return gnwhjjx;
    }

    public Registration gnwhjjx(String gnwhjjx) {
        this.gnwhjjx = gnwhjjx;
        return this;
    }

    public void setGnwhjjx(String gnwhjjx) {
        this.gnwhjjx = gnwhjjx;
    }

    
    public Decision getZljs() {
        return zljs;
    }

    public Registration zljs(Decision zljs) {
        this.zljs = zljs;
        return this;
    }

    public void setZljs(Decision zljs) {
        this.zljs = zljs;
    }
    
    public Integer getZljs1() {
        return zljs1;
    }

    public Registration zljs1(Integer zljs1) {
        this.zljs1 = zljs1;
        return this;
    }

    public void setZljs1(Integer zljs1) {
        this.zljs1 = zljs1;
    }

    public HxjslyEnum getHxjsly() {
        return hxjsly;
    }

    public Registration hxjsly(HxjslyEnum hxjsly) {
        this.hxjsly = hxjsly;
        return this;
    }

    public void setHxjsly(HxjslyEnum hxjsly) {
        this.hxjsly = hxjsly;
    }

    public KjcgzhEnum getKjcgzh() {
        return kjcgzh;
    }

    public Registration kjcgzh(KjcgzhEnum kjcgzh) {
        this.kjcgzh = kjcgzh;
        return this;
    }

    public void setKjcgzh(KjcgzhEnum kjcgzh) {
        this.kjcgzh = kjcgzh;
    }

    public JmlyqkEnum getJmlyqk() {
        return jmlyqk;
    }

    public Registration jmlyqk(JmlyqkEnum jmlyqk) {
        this.jmlyqk = jmlyqk;
        return this;
    }

    public void setJmlyqk(JmlyqkEnum jmlyqk) {
        this.jmlyqk = jmlyqk;
    }

    public String getJscsd() {
        return jscsd;
    }

    public Registration jscsd(String jscsd) {
        this.jscsd = jscsd;
        return this;
    }

    public void setJscsd(String jscsd) {
        this.jscsd = jscsd;
    }

    public String getJzmsylqk() {
        return jzmsylqk;
    }

    public Registration jzmsylqk(String jzmsylqk) {
        this.jzmsylqk = jzmsylqk;
        return this;
    }

    public void setJzmsylqk(String jzmsylqk) {
        this.jzmsylqk = jzmsylqk;
    }

    public String getJzysjs() {
        return jzysjs;
    }

    public Registration jzysjs(String jzysjs) {
        this.jzysjs = jzysjs;
        return this;
    }

    public void setJzysjs(String jzysjs) {
        this.jzysjs = jzysjs;
    }

    public String getFzrdh() {
        return fzrdh;
    }

    public Registration fzrdh(String fzrdh) {
        this.fzrdh = fzrdh;
        return this;
    }

    public void setFzrdh(String fzrdh) {
        this.fzrdh = fzrdh;
    }

    public XbEnum getXb() {
        return xb;
    }

    public Registration xb(XbEnum xb) {
        this.xb = xb;
        return this;
    }

    public void setXb(XbEnum xb) {
        this.xb = xb;
    }

    public String getLxfs() {
        return lxfs;
    }

    public Registration lxfs(String lxfs) {
        this.lxfs = lxfs;
        return this;
    }

    public void setLxfs(String lxfs) {
        this.lxfs = lxfs;
    }

    public String getEmail() {
        return email;
    }

    public Registration email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public AgeEnum getFzrnl() {
        return fzrnl;
    }

    public Registration fzrnl(AgeEnum fzrnl) {
        this.fzrnl = fzrnl;
        return this;
    }

    public void setFzrnl(AgeEnum fzrnl) {
        this.fzrnl = fzrnl;
    }

    public AgeEnum getTdpjnl() {
        return tdpjnl;
    }

    public Registration tdpjnl(AgeEnum tdpjnl) {
        this.tdpjnl = tdpjnl;
        return this;
    }

    public void setTdpjnl(AgeEnum tdpjnl) {
        this.tdpjnl = tdpjnl;
    }

    public Integer getGjrcs() {
        return gjrcs;
    }

    public Registration gjrcs(Integer gjrcs) {
        this.gjrcs = gjrcs;
        return this;
    }

    public void setGjrcs(Integer gjrcs) {
        this.gjrcs = gjrcs;
    }

    public Decision getSfgjrzgxjsqy() {
        return sfgjrzgxjsqy;
    }

    public Registration sfgjrzgxjsqy(Decision sfgjrzgxjsqy) {
        this.sfgjrzgxjsqy = sfgjrzgxjsqy;
        return this;
    }

    public void setSfgjrzgxjsqy(Decision sfgjrzgxjsqy) {
        this.sfgjrzgxjsqy = sfgjrzgxjsqy;
    }

    public String getTdysjs() {
        return tdysjs;
    }

    public Registration tdysjs(String tdysjs) {
        this.tdysjs = tdysjs;
        return this;
    }

    public void setTdysjs(String tdysjs) {
        this.tdysjs = tdysjs;
    }

    public String getXycz() {
        return xycz;
    }

    public Registration xycz(String xycz) {
        this.xycz = xycz;
        return this;
    }

    public void setXycz(String xycz) {
        this.xycz = xycz;
    }

    public String getWlxwhdzclx() {
        return wlxwhdzclx;
    }

    public Registration wlxwhdzclx(String wlxwhdzclx) {
        this.wlxwhdzclx = wlxwhdzclx;
        return this;
    }

    public void setWlxwhdzclx(String wlxwhdzclx) {
        this.wlxwhdzclx = wlxwhdzclx;
    }

    public String getWlxwhdzclx1() {
        return wlxwhdzclx1;
    }

    public Registration wlxwhdzclx1(String wlxwhdzclx1) {
        this.wlxwhdzclx1 = wlxwhdzclx1;
        return this;
    }

    public void setWlxwhdzclx1(String wlxwhdzclx1) {
        this.wlxwhdzclx1 = wlxwhdzclx1;
    }

    public String getSfxyxc() {
        return sfxyxc;
    }

    public Registration sfxyxc(String sfxyxc) {
        this.sfxyxc = sfxyxc;
        return this;
    }

    public void setSfxyxc(String sfxyxc) {
        this.sfxyxc = sfxyxc;
    }

    public RzjhgkfwEnum getRzjhgkfw() {
        return rzjhgkfw;
    }

    public Registration rzjhgkfw(RzjhgkfwEnum rzjhgkfw) {
        this.rzjhgkfw = rzjhgkfw;
        return this;
    }

    public void setRzjhgkfw(RzjhgkfwEnum rzjhgkfw) {
        this.rzjhgkfw = rzjhgkfw;
    }

    public RzmbEnum getRzmb() {
        return rzmb;
    }

    public Registration rzmb(RzmbEnum rzmb) {
        this.rzmb = rzmb;
        return this;
    }

    public void setRzmb(RzmbEnum rzmb) {
        this.rzmb = rzmb;
    }

    public String getLxrzw() {
        return lxrzw;
    }

    public Registration lxrzw(String lxrzw) {
        this.lxrzw = lxrzw;
        return this;
    }

    public void setLxrzw(String lxrzw) {
        this.lxrzw = lxrzw;
    }

    public String getLxdh() {
        return lxdh;
    }

    public Registration lxdh(String lxdh) {
        this.lxdh = lxdh;
        return this;
    }

    public void setLxdh(String lxdh) {
        this.lxdh = lxdh;
    }

    public String getLxyx() {
        return lxyx;
    }

    public Registration lxyx(String lxyx) {
        this.lxyx = lxyx;
        return this;
    }

    public void setLxyx(String lxyx) {
        this.lxyx = lxyx;
    }

    public String getLxdz() {
        return lxdz;
    }

    public Registration lxdz(String lxdz) {
        this.lxdz = lxdz;
        return this;
    }

    public void setLxdz(String lxdz) {
        this.lxdz = lxdz;
    }

    public String getSsly1() {
        return ssly1;
    }

    public Registration ssly1(String ssly1) {
        this.ssly1 = ssly1;
        return this;
    }

    public void setSsly1(String ssly1) {
        this.ssly1 = ssly1;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public Registration createdDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public Registration modifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
    
    
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    public Integer getFbzt() {
		return fbzt;
	}
    
    public Registration fbzt(Integer fbzt) {
    	this.fbzt=fbzt;
    	return this;
    }

	public void setFbzt(Integer fbzt) {
		this.fbzt = fbzt;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Registration registration = (Registration) o;
        if (registration.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), registration.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Registration{" +
            "id=" + getId() +
            ", registType=" + getRegistType() +
            ", dwqc='" + getDwqc() + "'" +
            ", hxcpmc='" + getHxcpmc() + "'" +
            ", zztjdw='" + getZztjdw() + "'" +
            ", dwhgrdz='" + getDwhgrdz() + "'" +
            ", szqylx='" + getSzqylx() + "'" +
            ", ssly='" + getSsly() + "'" +
            ", gscpjj='" + getGscpjj() + "'" +
            ", mbkhsc='" + getMbkhsc() + "'" +
            ", dqzykh='" + getDqzykh() + "'" +
            ", gnwhjjx='" + getGnwhjjx() + "'" +
            ", zljs='" + getZljs() + "'" +
            ", hxjsly='" + getHxjsly() + "'" +
            ", kjcgzh='" + getKjcgzh() + "'" +
            ", jmlyqk='" + getJmlyqk() + "'" +
            ", jscsd='" + getJscsd() + "'" +
            ", jzmsylqk='" + getJzmsylqk() + "'" +
            ", jzysjs='" + getJzysjs() + "'" +
            ", fzrdh='" + getFzrdh() + "'" +
            ", xb='" + getXb() + "'" +
            ", lxfs='" + getLxfs() + "'" +
            ", email='" + getEmail() + "'" +
            ", fzrnl='" + getFzrnl() + "'" +
            ", tdpjnl='" + getTdpjnl() + "'" +
            ", gjrcs=" + getGjrcs() +
            ", sfgjrzgxjsqy='" + getSfgjrzgxjsqy() + "'" +
            ", tdysjs='" + getTdysjs() + "'" +
            ", xycz='" + getXycz() + "'" +
            ", wlxwhdzclx='" + getWlxwhdzclx() + "'" +
            ", wlxwhdzclx1='" + getWlxwhdzclx1() + "'" +
            ", sfxyxc='" + getSfxyxc() + "'" +
            ", rzjhgkfw='" + getRzjhgkfw() + "'" +
            ", rzmb='" + getRzmb() + "'" +
            ", lxrzw='" + getLxrzw() + "'" +
            ", lxdh='" + getLxdh() + "'" +
            ", lxyx='" + getLxyx() + "'" +
            ", lxdz='" + getLxdz() + "'" +
            ", ssly1='" + getSsly1() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", fbzt='" + getFbzt() + "'" +
            "}";
    }
}
