package com.guoyi.jerkaero.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.guoyi.jerkaero.domain.Jerk;

import com.guoyi.jerkaero.repository.JerkRepository;
import com.guoyi.jerkaero.repository.search.JerkSearchRepository;
import com.guoyi.jerkaero.web.rest.errors.BadRequestAlertException;
import com.guoyi.jerkaero.web.rest.util.HeaderUtil;
import com.guoyi.jerkaero.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Jerk.
 */
@RestController
@RequestMapping("/api")
public class JerkResource {

    private final Logger log = LoggerFactory.getLogger(JerkResource.class);

    private static final String ENTITY_NAME = "jerk";

    private final JerkRepository jerkRepository;

    private final JerkSearchRepository jerkSearchRepository;

    public JerkResource(JerkRepository jerkRepository, JerkSearchRepository jerkSearchRepository) {
        this.jerkRepository = jerkRepository;
        this.jerkSearchRepository = jerkSearchRepository;
    }

    /**
     * POST  /jerks : Create a new jerk.
     *
     * @param jerk the jerk to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jerk, or with status 400 (Bad Request) if the jerk has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jerks")
    @Timed
    public ResponseEntity<Jerk> createJerk(@Valid @RequestBody Jerk jerk) throws URISyntaxException {
        log.debug("REST request to save Jerk : {}", jerk);
        if (jerk.getId() != null) {
            throw new BadRequestAlertException("A new jerk cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Jerk result = jerkRepository.save(jerk);
        jerkSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/jerks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jerks : Updates an existing jerk.
     *
     * @param jerk the jerk to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jerk,
     * or with status 400 (Bad Request) if the jerk is not valid,
     * or with status 500 (Internal Server Error) if the jerk couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jerks")
    @Timed
    public ResponseEntity<Jerk> updateJerk(@Valid @RequestBody Jerk jerk) throws URISyntaxException {
        log.debug("REST request to update Jerk : {}", jerk);
        if (jerk.getId() == null) {
            return createJerk(jerk);
        }
        Jerk result = jerkRepository.save(jerk);
        jerkSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jerk.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jerks : get all the jerks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of jerks in body
     */
    @GetMapping("/jerks")
    @Timed
    public ResponseEntity<List<Jerk>> getAllJerks(Pageable pageable) {
        log.debug("REST request to get a page of Jerks");
        Page<Jerk> page = jerkRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/jerks");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /jerks/:id : get the "id" jerk.
     *
     * @param id the id of the jerk to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jerk, or with status 404 (Not Found)
     */
    @GetMapping("/jerks/{id}")
    @Timed
    public ResponseEntity<Jerk> getJerk(@PathVariable Long id) {
        log.debug("REST request to get Jerk : {}", id);
        Jerk jerk = jerkRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jerk));
    }

    /**
     * DELETE  /jerks/:id : delete the "id" jerk.
     *
     * @param id the id of the jerk to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jerks/{id}")
    @Timed
    public ResponseEntity<Void> deleteJerk(@PathVariable Long id) {
        log.debug("REST request to delete Jerk : {}", id);
        jerkRepository.delete(id);
        jerkSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/jerks?query=:query : search for the jerk corresponding
     * to the query.
     *
     * @param query the query of the jerk search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/jerks")
    @Timed
    public ResponseEntity<List<Jerk>> searchJerks(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Jerks for query {}", query);
        Page<Jerk> page = jerkSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/jerks");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
