package com.guoyi.jerkaero.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.guoyi.jerkaero.domain.Footprint;

import com.guoyi.jerkaero.repository.FootprintRepository;
import com.guoyi.jerkaero.repository.search.FootprintSearchRepository;
import com.guoyi.jerkaero.web.rest.errors.BadRequestAlertException;
import com.guoyi.jerkaero.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing Footprint.
 */
@RestController
@RequestMapping("/api")
public class FootprintResource {

    private final Logger log = LoggerFactory.getLogger(FootprintResource.class);

    private static final String ENTITY_NAME = "footprint";

    private final FootprintRepository footprintRepository;

    private final FootprintSearchRepository footprintSearchRepository;

    public FootprintResource(FootprintRepository footprintRepository, FootprintSearchRepository footprintSearchRepository) {
        this.footprintRepository = footprintRepository;
        this.footprintSearchRepository = footprintSearchRepository;
    }

    /**
     * POST  /footprints : Create a new footprint.
     *
     * @param footprint the footprint to create
     * @return the ResponseEntity with status 201 (Created) and with body the new footprint, or with status 400 (Bad Request) if the footprint has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/footprints")
    @Timed
    public ResponseEntity<Footprint> createFootprint(@Valid @RequestBody Footprint footprint) throws URISyntaxException {
        log.debug("REST request to save Footprint : {}", footprint);
        if (footprint.getId() != null) {
            throw new BadRequestAlertException("A new footprint cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Footprint result = footprintRepository.save(footprint);
        footprintSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/footprints/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /footprints : Updates an existing footprint.
     *
     * @param footprint the footprint to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated footprint,
     * or with status 400 (Bad Request) if the footprint is not valid,
     * or with status 500 (Internal Server Error) if the footprint couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/footprints")
    @Timed
    public ResponseEntity<Footprint> updateFootprint(@Valid @RequestBody Footprint footprint) throws URISyntaxException {
        log.debug("REST request to update Footprint : {}", footprint);
        if (footprint.getId() == null) {
            return createFootprint(footprint);
        }
        Footprint result = footprintRepository.save(footprint);
        footprintSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, footprint.getId().toString()))
            .body(result);
    }

    /**
     * GET  /footprints : get all the footprints.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of footprints in body
     */
    @GetMapping("/footprints")
    @Timed
    public List<Footprint> getAllFootprints() {
        log.debug("REST request to get all Footprints");
        return footprintRepository.findAll();
        }

    /**
     * GET  /footprints/:id : get the "id" footprint.
     *
     * @param id the id of the footprint to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the footprint, or with status 404 (Not Found)
     */
    @GetMapping("/footprints/{id}")
    @Timed
    public ResponseEntity<Footprint> getFootprint(@PathVariable Long id) {
        log.debug("REST request to get Footprint : {}", id);
        Footprint footprint = footprintRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(footprint));
    }

    /**
     * DELETE  /footprints/:id : delete the "id" footprint.
     *
     * @param id the id of the footprint to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/footprints/{id}")
    @Timed
    public ResponseEntity<Void> deleteFootprint(@PathVariable Long id) {
        log.debug("REST request to delete Footprint : {}", id);
        footprintRepository.delete(id);
        footprintSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/footprints?query=:query : search for the footprint corresponding
     * to the query.
     *
     * @param query the query of the footprint search
     * @return the result of the search
     */
    @GetMapping("/_search/footprints")
    @Timed
    public List<Footprint> searchFootprints(@RequestParam String query) {
        log.debug("REST request to search Footprints for query {}", query);
        return StreamSupport
            .stream(footprintSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
