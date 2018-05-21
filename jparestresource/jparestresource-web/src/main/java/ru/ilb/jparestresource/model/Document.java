/**
 * This file was generated by the JPA Modeler
 */
package ru.ilb.jparestresource.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import ru.ilb.common.jpa.history.AutoHistory;
import javax.xml.bind.annotation.*;
import java.util.ArrayList;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement
@Entity
@Table(indexes = {
    @Index(columnList = "DOCDATE")})
@AutoHistory
public class Document implements Serializable {

    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Document name
     */
    @XmlElement
    @Basic
    @Size(min = 1, max = 255, message = "must be beweeen 1 and 255 chars")
    private String displayName;

    /**
     * Document description
     */
    @Basic
    private String description;

    /**
     * Document date
     */
    @Basic
    private LocalDate docDate;

    @XmlElementRef
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY, targetEntity = Docfile.class, mappedBy = "document")
    private List<Docfile> docfiles;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Document withId(Long id) {
        this.id = id;
        return this;
    }

    /**
     * Get document name
     *
     * @return {@link #displayName}
     */
    public String getDisplayName() {
        return this.displayName;
    }

    /**
     * Set document name
     *
     * @param displayName {@link #displayName}
     */
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public Document withDisplayName(String displayName) {
        this.displayName = displayName;
        return this;
    }

    /**
     * Get document description
     *
     * @return {@link #description}
     */
    public String getDescription() {
        return this.description;
    }

    /**
     * Set document description
     *
     * @param description {@link #description}
     */
    public void setDescription(String description) {
        this.description = description;
    }

    public Document withDescription(String description) {
        this.description = description;
        return this;
    }

    /**
     * Get document date
     *
     * @return {@link #docDate}
     */
    public LocalDate getDocDate() {
        return this.docDate;
    }

    /**
     * Set document date
     *
     * @param docDate {@link #docDate}
     */
    public void setDocDate(LocalDate docDate) {
        this.docDate = docDate;
    }

    public Document withDocDate(LocalDate docDate) {
        this.docDate = docDate;
        return this;
    }

    public List<Docfile> getDocfiles() {
        if (this.docfiles == null) {
            this.docfiles = new ArrayList<>();
        }
        return this.docfiles;
    }

    public void setDocfiles(List<Docfile> docfiles) {
        this.docfiles = docfiles;
    }

    public Document withDocfiles(List<Docfile> docfiles) {
        this.docfiles = docfiles;
        return this;
    }

    public void addDocfiles(Docfile docfile) {
        docfile.setDocument(this);
        getDocfiles().add(docfile);
    }

}